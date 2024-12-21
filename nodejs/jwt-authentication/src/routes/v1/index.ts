import { Router } from "express";
import healthCheckRoutes from "./healthCheck.route";
import authRoutes from "./auth";
import userRoutes from "./user";
const rootRouter: Router = Router();

rootRouter.use("/health", healthCheckRoutes);
rootRouter.use('/auth',authRoutes)
rootRouter.use('/user',userRoutes)

export default rootRouter;
