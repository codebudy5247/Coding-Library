import express, { Request, Response } from "express";
import User from "../model/user.model";

const router = express.Router();

// List users
router.get("/", async (req: Request, res: Response) => {
  try {
    const skip = parseInt(req.query.skip as string) || 0;
    const limit = parseInt(req.query.limit as string) || 10;
    const users = await User.find().skip(skip).limit(limit);
    const totalUsers = await User.countDocuments();
    res.status(200).json({
      data: users,
      totalUsers,
      skip,
      limit,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Something went wrong!!!" });
  }
});

// How many users are active?
// $match,$count
router.get("/active-users", async (req: Request, res: Response) => {
  try {
    const activeUsers = await User.aggregate([
      {
        $match: { isActive: true },
      },
      {
        $count: "activeUsers", // pass any string
      },
    ]);
    res.status(200).json(activeUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Something went wrong!!!" });
  }
});

// What is the average age of all users?
// $group,$avg
router.get("/avg-age", async (req: Request, res: Response) => {
  try {
    const averageAge = await User.aggregate([
      {
        $group: {
          _id: null, // Instead of making different document it just make whole thing as a one document
          averageAge: {
            $avg: "$age",
          },
        },
      },
    ]);
    res.status(200).json(averageAge);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Something went wrong!!!" });
  }
});

// List the top 5 most common favorite fruits among users.
// $group,$sum,$sort,$limit
router.get("/fav-fruits", async (req: Request, res: Response) => {
  try {
    const favoriteFruits = await User.aggregate([
      {
        $group: {
          _id: "$favoriteFruit",
          count: {
            $sum: 1, // Increment value by 1
          },
        },
      },
      {
        $sort: {
          count: -1, // In decreasing order
        },
      },
      {
        $limit: 5, // Limit the document
      },
    ]);
    res.status(200).json(favoriteFruits);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Something went wrong!!!" });
  }
});

// Find the total number of males and females.
// $group,$sum
router.get("/gender-count", async (req: Request, res: Response) => {
  try {
    const genderCount = await User.aggregate([
      {
        $group: {
          _id: "$gender",
          genderCount: {
            $sum: 1,
          },
        },
      },
    ]);
    res.status(200).json(genderCount);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Something went wrong!!!" });
  }
});

// Which country has the highest number of registered users?



export default router;
