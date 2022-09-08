import React, { useEffect } from "react";
import Router from "next/router";
import { decode } from "jsonwebtoken";

import useAuth from "../../hooks/use-auth";
import { PersistLogin } from "../../components/atoms/PersistLogin/PersistLogin";

import styles from "./profile.module.css";

const oauth = ({ accessToken }) => {
  const { setAuth } = useAuth();

  useEffect(() => {
    if (accessToken) {
      const user = decode(accessToken);
      setAuth({
        accessToken,
        role: user.role,
        email: user.email,
      });
      Router.push("/");
    } else {
      Router.push("/auth/login");
    }
  }, []);

  return (
    <PersistLogin>
      <div className={styles.container}>Loading...</div>
    </PersistLogin>
  );
};

export default oauth;
