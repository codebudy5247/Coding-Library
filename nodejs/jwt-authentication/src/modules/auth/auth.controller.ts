import { Request, Response } from "express";
import { db } from "../../database";
import { compareSync } from "bcrypt";
import { BadRequestException } from "../exceptions/bad-requests";
import { ErrorCodes } from "../exceptions/root";
import { LoginSchema } from "./auth.schema";
import { NotFoundException } from "../exceptions/not-found";
import { signJwt } from "../utils";

let accessTokenExpiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN!;

export const login = async (req: Request, res: Response) => {
  LoginSchema.parse(req.body);
  const { email, password } = req.body;

  let user = await db.user.findFirst({ where: { email: email } });
  if (!user)
    throw new NotFoundException("User not found", ErrorCodes.USER_NOT_FOUND);

  if (!compareSync(password, user.password))
    throw new BadRequestException(
      "Incorrect password",
      ErrorCodes.INCORRECT_PASSWORD
    );

  // Sign the access token
  const access_token = signJwt({ sub: user.id }, "accessTokenPrivateKey", {
    expiresIn: `${accessTokenExpiresIn}m`,
  });

  res.json({ access_token });
};

export const refreshToken = async (req: Request, res: Response) => {

}