import axios from "axios";

import { HOST_URL } from "../utils/constants";

const axiosConfig = (req) => {
  const config =
    process.env.IS_PRODUCTION !== "false" ? HOST_URL.PROD : HOST_URL.DEV;

  if (typeof window === "undefined")
    return { baseURL: config.SERVER_URL, headers: req.headers };
  return { baseURL: config.BROWSER_URL };
};

const client = ({ req }) => {
  if (process.env.IS_PRODUCTION === "false") {
    delete req?.headers?.host;
  }
  return axios.create(axiosConfig(req));
};

export default client;
