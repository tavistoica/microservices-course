import axios from "axios";

export default ({ req }) => {
  if (typeof window === "undefined") {
    delete req.headers.host;
    //  we are on the server
    return axios.create({
      baseURL: "http://www.tavistoica.xyz",
      headers: req.headers,
    });
  } else {
    //  we are on the browser
    return axios.create({
      baseURL: "/",
    });
  }
};
