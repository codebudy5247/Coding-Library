import { Router } from "express";
import { catchAsync } from "../../modules/utils";
import { register } from "../../modules/user/user.controller";
const userRoutes: Router = Router();

userRoutes.post("/register", catchAsync(register));

export default userRoutes;
