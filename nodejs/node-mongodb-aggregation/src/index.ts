require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/connectDB";
import UserRouter from "./routes/user.route";

const app = express();

const port = process.env.PORT || 4000;
app.use(express.json({ limit: "10kb" }));
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

app.use(morgan("dev"));

// Routes
app.use("/api/users", UserRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
  connectDB();
});
