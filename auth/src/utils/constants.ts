export const REFRESH_TOKEN_TIME = "30d";
export const ACCESS_TOKEN_TIME = "15m";
export const COOKIE_DELETE_CONFIG = {
  httpOnly: true,
  //   sameSite: "none",
  //   secure: true,
};
export const COOKIE_CREATE_CONFIG = {
  ...COOKIE_DELETE_CONFIG,
  maxAge: 24 * 60 * 60 * 1000,
};
