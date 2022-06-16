import { HOST_URL } from "./constants";

export const baseURL =
  process.env.IS_PRODUCTION === "false"
    ? HOST_URL.DEV.BROWSER_URL
    : HOST_URL.PROD.BROWSER_URL;

export const calculateTime = (date) => {
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();

  if (minutes === 0 && hours === 0) {
    return `${seconds} secounds`;
  }

  return `${hours} hour${
    hours < 2 && "s"
  } ${minutes} minutes ${seconds} seconds`;
};
