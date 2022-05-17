import { Request, Response } from "express";
import { BadRequestError, validateRequest } from "@ostoica/common";
import { User } from "../models/user.model";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new BadRequestError("Invalid credentials");
  }

  const passwordsMatch = await Password.compare(
    existingUser.password!,
    password
  );
  if (!passwordsMatch) {
    throw new BadRequestError("Invalid Credentials");
  }

  //  Generate JWT
  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    },
    process.env.JWT_KEY!
  );

  //  Store it on session object
  req.session = { jwt: userJwt };

  res.status(200).send(existingUser);
};
