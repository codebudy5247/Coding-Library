import { Router } from "express";
import { catchAsync } from "../../modules/utils";
import { login,refreshToken,me } from "../../modules/auth/auth.controller";
import authMiddleware from "../../modules/middlewares/auth";

const authRoutes: Router = Router();

authRoutes.post("/login", catchAsync(login));
authRoutes.post("/refresh", catchAsync(refreshToken));
authRoutes.get("/me", [authMiddleware], catchAsync(me));

export default authRoutes;
