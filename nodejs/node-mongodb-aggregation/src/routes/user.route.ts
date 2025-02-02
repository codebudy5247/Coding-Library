import express, { Request, Response } from "express";
import User from "../model/user.model";

const router = express.Router();

// [
// {
//   "company": {
//       "location": {
//           "country": "USA",
//           "address": "694 Hewes Street"
//       },
//       "title": "YURTURE",
//       "email": "aureliagonzales@yurture.com",
//       "phone": "+1 (940) 501-3963"
//   },
//   "_id": "67979841190164d2f0c11b93",
//   "index": 0,
//   "name": "Aurelia Gonzales",
//   "isActive": false,
//   "registered": "2015-02-11T04:22:39.000Z",
//   "age": 20,
//   "gender": "female",
//   "eyeColor": "green",
//   "favoriteFruit": "banana",
//   "tags": [
//       "enim",
//       "id",
//       "velit",
//       "ad",
//       "consequat"
//   ]
// }
// ]

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
// $match:
// $count:
router.get("/active-users", async (req: Request, res: Response) => {
  try {
    const activeUsers = await User.aggregate([
      // STAGE 1
      {
        $match: { isActive: true },
      },
      // STAGE 2
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
// $group
// $avg
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
// $sum
// $sort
// $limit
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
router.get("/user-country-count", async (req: Request, res: Response) => {
  try {
    const userCountryCount = await User.aggregate([
      {
        $group: {
          _id: "$company.location.country",
          userCount: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          userCount: -1,
        },
      },
      {
        $limit: 2,
      },
    ]);
    res.status(200).json(userCountryCount);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Something went wrong!!!" });
  }
});

// List all unique eye colors present in the collection.
router.get("/unique-eye-colors", async (req: Request, res: Response) => {
  try {
    const uniqueEyeColors = await User.aggregate([
      {
        $group: {
          _id: "$eyeColor",
          eyeColorCount: {
            $sum: 1,
          },
        },
      },
    ]);
    res.status(200).json(uniqueEyeColors);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Something went wrong!!!" });
  }
});

// What is the average number of tags per user?
// $unwind
// $addFields
// $size
// $ifNull
// $cond
router.get("/avg-tags-count", async (req: Request, res: Response) => {
  try {
    const tagsAvgCount = await User.aggregate([
      // 1st method
      // {
      //   $unwind: {
      //     path: "$tags",
      //   },
      // },
      // {
      //   $group: {
      //     _id: "$_id",
      //     numberOfTags: {
      //       $sum: 1,
      //     },
      //   },
      // },
      // {
      //   $group: {
      //     _id: null,
      //     averageNumberOfTags: {
      //       $avg: "$numberOfTags",
      //     },
      //   },
      // },

      // 2nd method
      {
        $addFields: {
          numberOfTags: {
            $size: {
              $ifNull: [
                { $cond: [{ $isArray: "$tags" }, "$tags", []] }, // Ensure `tags` is an array
                [],
              ],
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          averageNumberOfTags: {
            $avg: "$numberOfTags",
          },
        },
      },
    ]);
    res.status(200).json(tagsAvgCount);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Something went wrong!!!" });
  }
});

// How many users have 'enim' as one of their tags?
router.get("/user-with-enim-tag", async (req: Request, res: Response) => {
  try {
    const similarTagUserCount = await User.aggregate([
      {
        $match: {
          tags: "enim",
        },
      },
      {
        $count: "userWithEnimTag",
      },
    ]);
    res.status(200).json(similarTagUserCount);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Something went wrong!!!" });
  }
});

// What are names and age of users who are inactive and have 'velit' as a tag?
// $project:Passes along the documents with the requested fields to the next stage in the pipeline.
router.get(
  "/inactive-user-with-velit-tag",
  async (req: Request, res: Response) => {
    try {
      const inactiveUserWithVelitTag = await User.aggregate([
        {
          $match: {
            isActive: false,
            tags: "velit",
          },
        },
        {
          $project: {
            name: 1,
            age: 1,
          },
        },
      ]);
      res.status(200).json(inactiveUserWithVelitTag);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Something went wrong!!!" });
    }
  }
);

// How many users have a phone number starting with '+1 (940)'?
router.get(
  "/user-with-phone-number-count",
  async (req: Request, res: Response) => {
    try {
      const userWithSpecifiedPhoneNumber = await User.aggregate([
        {
          $match: {
            "company.phone": /^\+1 \(940\)/,
          },
        },
        {
          $count: "userWithSpecialPhoneNumber",
        },
      ]);
      res.status(200).json(userWithSpecifiedPhoneNumber);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Something went wrong!!!" });
    }
  }
);

// Who has registered the most recently?
router.get("/recent-registered-user", async (req: Request, res: Response) => {
  try {
    const recentRegisteredUser = await User.aggregate([
      {
        $sort: {
          registered: -1,
        },
      },
      {
        $limit: 4,
      },
      {
        $project: {
          name: 1,
          gender: 1,
          registered: 1,
        },
      },
    ]);
    res.status(200).json(recentRegisteredUser);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Something went wrong!!!" });
  }
});

// Categorize users by their favorite fruit.
// $push:
router.get("/user-fav-fruit", async (req: Request, res: Response) => {
  try {
    const userFavoriteFruit = await User.aggregate([
      {
        $group: {
          _id: "$favoriteFruit",
          users: {
            $push: "$name",
          },
        },
      },
    ]);
    res.status(200).json(userFavoriteFruit);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Something went wrong!!!" });
  }
});

// How many users have "ad" as the second tag in their list of tags?
router.get("/user-have-ad-tag", async (req: Request, res: Response) => {
  try {
    const usersHavingAdTag = await User.aggregate([
      {
        $match: {
          "tags.1": "ad",
        },
      },
      {
        $count: "secondTagAd",
      },
    ]);
    res.status(200).json(usersHavingAdTag);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Something went wrong!!!" });
  }
});

// Find users who have both 'enim' and 'id' as their tags.
// $all
router.get("/users-have-enim-id-tag", async (req: Request, res: Response) => {
  try {
    const usersHavingEnimIdTag = await User.aggregate([
      {
        $match: {
          tags: {
            $all: ["enim", "id"],
          },
        },
      },
      // {
      //   $count:"result"
      // }
    ]);
    res.status(200).json(usersHavingEnimIdTag);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Something went wrong!!!" });
  }
});

// List all companies located in the USA with their corresponding user count.
router.get("/companies-in-usa", async (req: Request, res: Response) => {
  try {
    const companiesInUsa = await User.aggregate([
      {
        $match: {
          "company.location.country": "USA",
        },
      },
      {
        $group: {
          _id: "$company.title",
          userCount: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(companiesInUsa);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Something went wrong!!!" });
  }
});



export default router;
