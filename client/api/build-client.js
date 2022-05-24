import axios from "axios";

import { HOST_URL } from "../utils/constants";

const axiosConfig = (req) => {
  if (typeof window === "undefined")
    return { baseURL: config.SERVER_URL, headers: req.headers };
  return { baseURL: config.BROWSER_URL };
};
const config =
  process?.env?.IS_PRODUCTION !== "false" ? HOST_URL.PROD : HOST_URL.DEV;

const client = ({ req }) => {
  return axios.create({ baseURL: config.SERVER_URL });
};

export default client;
