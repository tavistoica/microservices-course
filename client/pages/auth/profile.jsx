import React, { useEffect } from "react";
import Router from "next/router";
import { decode } from "jsonwebtoken";

import useAuth from "../../hooks/use-auth";
import { PersistLogin } from "../../components/atoms/PersistLogin/PersistLogin";

import styles from "./profile.module.css";

const profile = () => {
  const { auth } = useAuth();
  const userData = decode(auth.accessToken);

  useEffect(() => {
    if (!userData?.email) {
      Router.push("/");
    }
  }, [userData]);

  return (
    <PersistLogin>
      <div className={styles.container}>
        <div className={styles.row}>{`Email: ${userData?.email}`}</div>
        <div className={styles.row}>{`Role: ${userData?.role}`}</div>
      </div>
    </PersistLogin>
  );
};

export default profile;
