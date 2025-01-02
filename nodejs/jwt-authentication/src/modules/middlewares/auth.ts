import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";
import { db } from "../../database";
import { verifyJwt } from "../utils";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let accessToken;

    // Extract token from the authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      accessToken = req.headers.authorization.split(" ")[1];
    }

    if (!accessToken) {
      return next(
        new UnauthorizedException(
          "Unauthorized: Token missing",
          ErrorCodes.UNAUTHORIZED
        )
      );
    }

    // Verify the JWT token
    const payload = verifyJwt<{ sub: string }>(
      accessToken,
      "accessTokenPublicKey"
    );

    if (!payload) {
      return next(
        new UnauthorizedException(
          "Unauthorized: Invalid token",
          ErrorCodes.UNAUTHORIZED
        )
      );
    }

    // Find the user by the payload `sub`
    const user = await db.user.findFirst({ where: { id: payload.sub } });
    if (!user) {
      return next(
        new UnauthorizedException(
          "Unauthorized: User not found",
          ErrorCodes.UNAUTHORIZED
        )
      );
    }
    res.locals.user = user;
    return next();
  } catch (error) {
    return next(
      new UnauthorizedException(
        "Unauthorized: Authentication failed",
        ErrorCodes.UNAUTHORIZED
      )
    );
  }
};

export default authMiddleware;
