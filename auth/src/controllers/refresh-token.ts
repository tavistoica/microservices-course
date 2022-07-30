import { CookieOptions, Request, Response } from "express";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken";
import { COOKIE_DELETE_CONFIG, COOKIE_CREATE_CONFIG } from "../utils/constants";

export const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) return res.sendStatus(401);
  const refreshToken = cookies.refreshToken;
  res.clearCookie("refreshToken", COOKIE_DELETE_CONFIG);

  const foundUser = await User.findOne({ refreshToken }).exec();

  // detected refresh token reuse
  if (!foundUser) {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_PRIVATE_KEY!
      );
      // @ts-ignore
      const hackedUser = await User.findOne({ email: decoded.email }).exec();
      if (!hackedUser) return res.sendStatus(403);
      hackedUser.refreshToken = [];
      hackedUser.save();
    } catch (err) {
      return res.sendStatus(403);
    }
  }

  const newRefreshTokenArray = foundUser?.refreshToken?.filter(
    (rt) => rt !== refreshToken
  );

  // evaluate jwt
  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_PRIVATE_KEY!);
    // @ts-ignore
    if (foundUser) {
      const accessToken = generateAccessToken(foundUser);
      const newRefreshToken = generateRefreshToken(foundUser);

      foundUser.refreshToken = [
        ...(newRefreshTokenArray || []),
        newRefreshToken,
      ];
      await foundUser.save();

      res.cookie(
        "refreshToken",
        newRefreshToken,
        COOKIE_CREATE_CONFIG as CookieOptions
      );
      return res.json({
        role: foundUser.role,
        accessToken,
      });
    }
    return res.sendStatus(403);
  } catch (err) {
    if (foundUser) {
      foundUser.refreshToken = newRefreshTokenArray;
      await foundUser?.save();
    }
    return res.sendStatus(403);
  }
};
