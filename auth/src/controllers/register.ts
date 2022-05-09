import { Request, Response } from "express";
import { BadRequestError, validateRequest } from "@ostoica/common";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError("Email in use");
  }

  const user = User.build({ email, password, role: "User" });
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

  //  Store it on session object
  req.session = { jwt: userJwt };

  res.status(201).send(user);
};
