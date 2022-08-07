import axios from "../api/axios";
import { useState } from "react";

import { HOST_URL } from "../utils/constants";

const useRequest = ({ url, method, body, onSuccess, headers }) => {
  const [errors, setErrors] = useState(null);
  const config =
    process?.env?.IS_PRODUCTION !== "false" ? HOST_URL.PROD : HOST_URL.DEV;

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      if (method === "get") {
        const response = await axios[method](`${config.SERVER_URL}${url}`, {
          withCredentials: true,
          headers,
          ...props,
        });
        if (onSuccess) {
          onSuccess(response.data);
        }
        return response.data;
      }
      const response = await axios[method](
        `${config.SERVER_URL}${url}`,
        {
          ...body,
          headers
        },
        { withCredentials: true, ...props }
      );
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <ul className="my-0">
            {err.response?.data?.errors?.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};

export default useRequest;
