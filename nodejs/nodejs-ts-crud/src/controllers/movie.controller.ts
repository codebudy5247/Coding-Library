import { Request, Response, NextFunction } from "express";
import Movie from "../models/movie.model";
import logger from "../utils/logger";

export const getMovies = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const cursor = req.query.cursor as string;

    const query: any = {};
    if (cursor) {
      query._id = { $gt: cursor };
    }

    // Fetch limit + 1 to check if there's a next page
    const movies = await Movie.find(query)
      .sort({ _id: 1 }) // Ensure consistent ordering
      .limit(limit + 1)
      .lean();

    let nextCursor = null;
    if (movies.length > limit) {
      movies.pop(); // Remove the extra item
      if (movies.length > 0) {
        nextCursor = movies[movies.length - 1]._id;
      }
    }

    res.status(200).json({
      status: "success",
      results: movies.length,
      data: movies,
      pagination: {
        next_cursor: nextCursor,
      },
    });
  } catch (error) {
    logger.error("Error fetching movies:", error);
    next(error);
  }
};

export const getMovieById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id).lean();

    if (!movie) {
      res.status(404).json({
        status: "error",
        message: "Movie not found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      data: movie,
    });
  } catch (error) {
    logger.error("Error fetching movie by id:", error);
    next(error);
  }
};

export const searchMovies = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const q = req.query.q as string;
    const cursor = req.query.cursor as string;

    if (!q) {
      res.status(400).json({
        status: "error",
        message: 'Query parameter "q" is required',
      });
      return;
    }

    const pipeline: any[] = [
      { $match: { $text: { $search: q } } },
      { $addFields: { score: { $meta: "textScore" } } },
    ];

    if (cursor) {
      const decodedCursor = Buffer.from(cursor, "base64").toString("utf-8");
      const [cursorScoreStr, cursorId] = decodedCursor.split("_");
      const cursorScore = parseFloat(cursorScoreStr);

      pipeline.push({
        $match: {
          $or: [
            { score: { $lt: cursorScore } },
            {
              score: { $eq: cursorScore },
              _id: { $gt: cursorId },
            },
          ],
        },
      });
    }

    pipeline.push({ $sort: { score: -1, _id: 1 } }, { $limit: limit + 1 });

    const movies = await Movie.aggregate(pipeline);

    let nextCursor = null;
    if (movies.length > limit) {
      movies.pop();
      const lastMovie = movies[movies.length - 1];
      nextCursor = Buffer.from(`${lastMovie.score}_${lastMovie._id}`).toString(
        "base64",
      );
    }

    res.status(200).json({
      status: "success",
      results: movies.length,
      data: movies,
      pagination: {
        next_cursor: nextCursor,
      },
    });
  } catch (error) {
    logger.error("Error searching movies:", error);
    next(error);
  }
};
