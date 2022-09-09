import { CookieOptions } from "express";

export const REFRESH_TOKEN_TIME = "30d";
export const ACCESS_TOKEN_TIME = "15m";
export const COOKIE_DELETE_CONFIG: CookieOptions = {
  httpOnly: true,
  //   sameSite: "none",
  //   secure: true,
};
export const COOKIE_CREATE_CONFIG: CookieOptions = {
  ...COOKIE_DELETE_CONFIG,
  secure: true,
  httpOnly: true,
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

export const CURRENT_PROD_URL = "https://www.tavistoica.xyz";
