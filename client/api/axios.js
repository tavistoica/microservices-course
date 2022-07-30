import axios from "axios";
import { HOST_URL } from "../utils/constants";

const config =
  process?.env?.IS_PRODUCTION !== "false" ? HOST_URL.PROD : HOST_URL.DEV;

export default axios.create({
  baseURL: "https://www.tavistoica.xyz",
});

export const axiosPrivate = axios.create({
  baseURL: "https://www.tavistoica.xyz",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
