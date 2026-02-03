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
