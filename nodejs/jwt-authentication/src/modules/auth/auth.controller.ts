import { Request, Response } from "express";
import { db } from "../../database";
import { compareSync } from "bcrypt";
import { BadRequestException } from "../exceptions/bad-requests";
import { ErrorCodes } from "../exceptions/root";
import { LoginSchema } from "./auth.schema";
import { NotFoundException } from "../exceptions/not-found";
import { signJwt, verifyJwt } from "../utils";

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
  const { refresh_token } = req.body;

  try {
    // Verify the refresh token
    const payload = verifyJwt<{ sub: string }>(
      refresh_token,
      "refreshTokenPublicKey"
    );
    // {
    //   sub: '2f16847b-c9cc-41d1-8ee9-52123cfcf907',
    //   iat: 1735747948,
    //   exp: 1735749748
    // }

    if (!payload) {
      return res.status(401).json({
        error: ErrorCodes.INVALID_REFRESH_TOKEN,
      });
    }

    // Find the user by ID
    const user = await db.user.findFirst({ where: { id: payload.sub } });
    if (!user) {
      return res.status(404).json({
        error: ErrorCodes.USER_NOT_FOUND,
      });
    }

    // Sign the access token
    const access_token = signJwt({ sub: user.id }, "accessTokenPrivateKey", {
      expiresIn: `${accessTokenExpiresIn}m`,
    });

    res.json({ access_token });
  } catch (error) {
    res.status(500).json({
      error: ErrorCodes.INTERNAL_EXCEPTION,
    });
  }
};

export const me = async (req: Request, res: Response) => {
  const user = res.locals.user;
  res.json(user);
};

