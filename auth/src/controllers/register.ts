import { Request, Response } from "express";
import { BadRequestError } from "@ostoica/common";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { logger } from "../utils/logger";

export const registerController = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  logger.info(`registerController - existingUser ${existingUser}`);

  if (existingUser) {
    logger.error(`registerController - Email in use`);
    throw new BadRequestError("Email in use");
  }

  const user = User.build({ email, password, role });
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

  //  Store it on session object
  req.session = { jwt: userJwt };

  res.status(201).send(user);
};
