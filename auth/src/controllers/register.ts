import { Request, Response, CookieOptions } from "express";
import { BadRequestError } from "@ostoica/common";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { logger } from "../utils/logger";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken";
import { COOKIE_CREATE_CONFIG, COOKIE_DELETE_CONFIG } from "../utils/constants";

export const registerController = async (req: Request, res: Response) => {
  logger.info(
    `registerController - existingUser - body: ${JSON.stringify(req.body)}`
  );

  const cookies = req.cookies;

  req.body.email = req.body.email.toLowerCase();

  const existingUser = await User.findOne({ email: req.body.email });
  logger.info(`registerController - existingUser ${existingUser}`);

  if (existingUser) {
    logger.error(`registerController - Email in use`);
    throw new BadRequestError("Email in use");
  }

  const user = User.build(req.body);

  let newRefreshTokenArray = !cookies?.refreshToken
    ? user.refreshToken
    : user.refreshToken?.filter((item) => item !== cookies.refreshToken);

  if (cookies?.refreshToken) {
    const foundToken = await User.findOne({
      refreshToken: cookies.refreshToken,
    }).exec();
    if (!foundToken) {
      newRefreshTokenArray = [];
    }

    res.clearCookie("refreshToken", COOKIE_DELETE_CONFIG);
  }

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

  if (!user.refreshToken) user.refreshToken = [];
  user.refreshToken = [...(newRefreshTokenArray || []), refreshToken];

  await user.save();

  // //  Store it on session object
  // req.session = { jwt: userJwt };

  res.cookie(
    "refreshToken",
    refreshToken,
    COOKIE_CREATE_CONFIG as CookieOptions
  );
  res.status(201).send({ accessToken, refreshToken });
};
