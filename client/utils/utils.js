import { HOST_URL } from "./constants";

export const baseURL =
  process.env.IS_PRODUCTION === "false"
    ? HOST_URL.DEV.BROWSER_URL
    : HOST_URL.PROD.BROWSER_URL;

export const calculateTime = (time) => {
  const hours = time / 60 / 60;
  const minutes = (time - hours) / 60;
  const seconds = time - hours - minutes;

  return { hours, minutes, seconds };
};
