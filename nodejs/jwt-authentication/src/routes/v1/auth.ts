import { Router } from "express";
import { catchAsync } from "../../modules/utils";
import { login } from "../../modules/auth/auth.controller";

const authRoutes: Router = Router();

authRoutes.post("/login", catchAsync(login));

export default authRoutes;
