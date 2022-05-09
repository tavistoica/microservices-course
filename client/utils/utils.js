import { HOST_URL } from "./constants";

export const baseURL =
  process.env.IS_PRODUCTION === "false"
    ? HOST_URL.DEV.BROWSER_URL
    : HOST_URL.PROD.BROWSER_URL;
