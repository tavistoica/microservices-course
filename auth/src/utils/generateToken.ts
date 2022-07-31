import jwt from "jsonwebtoken";

import { ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME } from "../utils/constants";

export const generateAccessToken = (user: {
  email: string;
  role: string;
}): string => {
  try {
    const payload = { email: user.email, roles: user.role };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY!,
      { expiresIn: ACCESS_TOKEN_TIME }
    );

    return accessToken;
  } catch (err) {
    return "Something went wrong";
  }
};

export const generateRefreshToken = (user: {
  email: string;
  role: string;
}): string => {
  try {
    const payload = { email: user.email, roles: user.role };

    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY!,
      { expiresIn: REFRESH_TOKEN_TIME }
    );

    return refreshToken;
  } catch (err) {
    return "Something went wrong";
  }
};
