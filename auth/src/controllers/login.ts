import { CookieOptions, Request, Response } from "express";
import { BadRequestError } from "@ostoica/common";
import { User } from "../models/user.model";
import { Password } from "../services/password";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken";
import { COOKIE_CREATE_CONFIG, COOKIE_DELETE_CONFIG } from "../utils/constants";

export const loginController = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  const { email, password } = req.body;
  const lowerCaseEmail = email.toLowerCase();

  const existingUser = await User.findOne({ email: lowerCaseEmail });
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

  // @ts-ignore
  const accessToken = generateAccessToken(existingUser);
  // @ts-ignore
  const refreshToken = generateRefreshToken(existingUser);

  let newRefreshTokenArray = !cookies?.refreshToken
    ? existingUser.refreshToken
    : existingUser.refreshToken?.filter(
        (item) => item !== cookies.refreshToken
      );

  if (cookies?.refreshToken) {
    const foundToken = await User.findOne({
      refreshToken: cookies.refreshToken,
    }).exec();
    if (!foundToken) {
      newRefreshTokenArray = [];
    }

    res.clearCookie("refreshToken", COOKIE_DELETE_CONFIG);
  }

  if (!existingUser.refreshToken) existingUser.refreshToken = [];
  existingUser.refreshToken = [...(newRefreshTokenArray || []), refreshToken];
  existingUser.save();

  res.cookie(
    "refreshToken",
    refreshToken,
    COOKIE_CREATE_CONFIG as CookieOptions
  );
  res.status(200).send({ accessToken });
};
