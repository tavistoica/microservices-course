import { useState, useEffect } from "react";
import Router from "next/router";
import { decode } from "jsonwebtoken";
import useAuth from "../../hooks/use-auth";
import useRequest from "../../hooks/use-request";
import { PersistLogin } from "../../components/atoms/PersistLogin/PersistLogin";

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
      console.log("wtf", response, response?.accessToken);
      if (response.accessToken) {
        const user = decode(response.accessToken);
        setAuth({
          accessToken: response.accessToken,
          role: user.role,
          email: user.email,
        });
      }
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
    <PersistLogin>
      <Login
        onSubmit={onSubmit}
        errors={errors}
        email={email}
        password={password}
        persist={persist}
        setEmail={setEmail}
        setPassword={setPassword}
        togglePersist={togglePersist}
      />
    </PersistLogin>
  );
};

export default login;
