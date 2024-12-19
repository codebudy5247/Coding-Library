import { Router } from "express";
import healthCheckRoutes from "./healthCheck.route";
const rootRouter: Router = Router();

rootRouter.use("/health", healthCheckRoutes);

export default rootRouter;
