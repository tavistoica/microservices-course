import { Request, Response } from "express";
import { BadRequestError } from "@ostoica/common";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { logger } from "../utils/logger";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken";

export const registerController = async (req: Request, res: Response) => {
  logger.info(
    `registerController - existingUser - body: ${JSON.stringify(req.body)}`
  );

  if (!req?.body?.role) throw new BadRequestError("Role was not provided");

  req.body.email = req.body.email.toLowerCase();

  const existingUser = await User.findOne({ email: req.body.email });
  logger.info(`registerController - existingUser ${existingUser}`);

  if (existingUser) {
    logger.error(`registerController - Email in use`);
    throw new BadRequestError("Email in use");
  }

  const user = User.build(req.body);
  await user.save();

  //  Generate JWT
  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_KEY!
  );
  logger.info(`registerController - userJWT - ${userJwt}`);

  //  @ts-ignore
  const accessToken = generateAccessToken(user);
  // @ts-ignore
  const refreshToken = generateRefreshToken(user);

  // //  Store it on session object
  // req.session = { jwt: userJwt };

  res.status(201).send({ accessToken, refreshToken });
};
