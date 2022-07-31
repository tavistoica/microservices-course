import { useState } from "react";
import Router from "next/router";
import useAuth from "../../hooks/use-auth";
import useRequest from "../../hooks/use-request";

import { Login } from "../../components/organisms/Login/Login";

const login = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/login",
    method: "post",
    body: { email, password },
    onSuccess: (response) => {
      setAuth({
        role: response?.data?.role,
        accessToken: response?.data?.accessToken,
      });
      setEmail("");
      setPassword("");
      Router.push("/");
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest();
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <Login
      onSubmit={onSubmit}
      errors={errors}
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      togglePersist={togglePersist}
    />
  );
};

export default login;
