import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

import { Register } from "../../components/Register/Register";

const register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/register",
    method: "post",
    body: { email, password, role },
    onSuccess: () => {
      Router.push("/");
      setEmail("");
      setPassword("");
      setRole("");
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <Register
      onSubmit={onSubmit}
      errors={errors}
      email={email}
      role={role}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setRole={setRole}
    />
  );
};

export default register;
