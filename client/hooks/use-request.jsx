import React, { useState } from "react";

import axios from "../api/axios";

import { HOST_URL } from "../utils/constants";

const useRequest = ({ url, method, body, onSuccess, headers }) => {
  const [errors, setErrors] = useState(null);
  const config =
    process?.env?.IS_PRODUCTION !== "false" ? HOST_URL.PROD : HOST_URL.DEV;

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      if (method === "get") {
        const response = await axios[method](
          `${config.SERVER_URL}${url}`,
          {
            withCredentials: true,
            ...props,
          },
          { withCredentials: true, headers }
        );
        if (onSuccess) {
          onSuccess(response.data);
        }
        return response.data;
      }
      const response = await axios[method](
        `${config.SERVER_URL}${url}`,
        {
          ...body,
        },
        { withCredentials: true, ...props, headers }
      );
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <ul className="my-0">
            {err.response?.data?.errors?.map((error) => (
              <li key={error.message}>{error.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};

export default useRequest;
