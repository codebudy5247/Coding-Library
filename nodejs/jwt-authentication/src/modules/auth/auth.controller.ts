import { NextFunction, Request, Response } from "express";
import { db } from "../../database";
import { compareSync } from "bcrypt";
import { BadRequestException } from "../exceptions/bad-requests";
import { ErrorCodes } from "../exceptions/root";
import { LoginSchema } from "./auth.schema";
import { NotFoundException } from "../exceptions/not-found";
import { signJwt, verifyJwt } from "../utils";
import { UnauthorizedException } from "../exceptions/unauthorized";

// let accessTokenExpiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN || 15
let refreshTokenExpiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN || 60
let accessTokenExpiresIn = 2

export const login = async (req: Request, res: Response) => {
  LoginSchema.parse(req.body);
  const { email, password } = req.body;

  let user = await db.user.findFirst({ where: { email: email } });
  if (!user)
    throw new NotFoundException("User not found", ErrorCodes.USER_NOT_FOUND);

  if (!compareSync(password, user.password))
  //compareSync(password, user.password) uses synchronous bcrypt comparison which can block the event loop. Consider using the 
  //asynchronous version compare instead.

    throw new BadRequestException(
      "Incorrect password",
      ErrorCodes.INCORRECT_PASSWORD
    );

  // Sign the access token
  const access_token = signJwt({ sub: user.id }, "accessTokenPrivateKey", {
    expiresIn: `${accessTokenExpiresIn}m`,
  });

  // Sign the refresh token
  const refresh_token = signJwt({ sub: user.id }, 'refreshTokenPrivateKey', {
    expiresIn: `${refreshTokenExpiresIn}d`,
  });

  res.json({ access_token,refresh_token });
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
      return next(
        new UnauthorizedException(
          "Unauthorized: Invalid token",
          ErrorCodes.UNAUTHORIZED
        )
      );
    }

    // Find the user by ID
    const user = await db.user.findFirst({ where: { id: payload.sub } });
    if (!user) {
      return next(
        new UnauthorizedException(
          "Unauthorized: User not found",
          ErrorCodes.UNAUTHORIZED
        )
      );
    }

    // Sign the access token
    const access_token = signJwt({ sub: user.id }, "accessTokenPrivateKey", {
      expiresIn: `${accessTokenExpiresIn}m`,
    });

    res.json({ access_token });
  } catch (error) {
    console.log(error);
    return next(
      new UnauthorizedException(
        "Unauthorized: Authentication failed",
        ErrorCodes.UNAUTHORIZED
      )
    );
  }
};

export const me = async (req: Request, res: Response) => {
  const user = res.locals.user;
  if (!user)
    throw new NotFoundException("User not found", ErrorCodes.USER_NOT_FOUND);
  res.json(user);
};
