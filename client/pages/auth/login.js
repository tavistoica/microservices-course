import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

import { Login } from "../../components/organisms/Login/Login";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/login",
    method: "post",
    body: { email, password },
    onSuccess: () => {
      Router.push("/");
      setEmail("");
      setPassword("");
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <Login
      onSubmit={onSubmit}
      errors={errors}
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
    />
  );
};

export default login;
