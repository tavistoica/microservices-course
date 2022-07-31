import { Request, Response } from "express";
import { User } from "../models/user.model";
import { COOKIE_DELETE_CONFIG } from "../utils/constants";

export const logoutController = async (req: Request, res: Response) => {
  // On client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.refreshToken) return res.sendStatus(204); //No content
  const refreshToken = cookies.refreshToken;

  // Is refreshToken in db?
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("refreshToken", COOKIE_DELETE_CONFIG);
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  foundUser.refreshToken = foundUser?.refreshToken?.filter(
    (rt) => rt !== refreshToken
  );
  await foundUser.save();

  res.clearCookie("refreshToken", COOKIE_DELETE_CONFIG);
  res.sendStatus(204);
};
