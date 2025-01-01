import { Router } from "express";
import { catchAsync } from "../../modules/utils";
import { login,refreshToken } from "../../modules/auth/auth.controller";

const authRoutes: Router = Router();

authRoutes.post("/login", catchAsync(login));
authRoutes.post("/refresh", catchAsync(refreshToken));

export default authRoutes;
