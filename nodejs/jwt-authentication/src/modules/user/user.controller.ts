import { Request, Response } from "express";
import { db } from "../../database";
import { hashSync } from "bcrypt";
import { BadRequestException } from "../exceptions/bad-requests";
import { ErrorCodes } from "../exceptions/root";
import { RegisterSchema } from "./user.schema";

export const register = async (req: Request, res: Response) => {
  RegisterSchema.parse(req.body);
  const { email, password, name } = req.body;
  let user = await db.user.findFirst({ where: { email: email } });
  if (user)
    throw new BadRequestException(
      "User already exists",
      ErrorCodes.USER_ALREADY_EXIST
    );

  user = await db.user.create({
    data: {
      name: name,
      email: email,
      password: hashSync(password, 10),
    },
  });

  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
};
