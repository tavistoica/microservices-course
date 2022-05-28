import { useEffect } from "react";
import Router from "next/router";

import styles from "./profile.module.css";

const profile = ({ currentUser }) => {
  useEffect(() => {
    console.log("currentUser", currentUser);
    if (!currentUser?.email) {
      Router.push("/");
    }
  }, [currentUser]);

  return (
    <div className={styles["container"]}>
      <div className={styles["row"]}>{`Email: ${currentUser?.email}`}</div>
      <div className={styles["row"]}>{`Role: ${currentUser?.role}`}</div>
    </div>
  );
};

export default profile;
