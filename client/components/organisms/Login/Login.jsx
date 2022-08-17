import React from "react";
import Router from "next/router";

import styles from "./Login.module.css";
import { LOGIN_PAGE } from "../../../utils/constants";

import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";

export const Login = ({
  onSubmit,
  errors,
  email,
  password,
  persist,
  setEmail,
  setPassword,
  togglePersist,
}) => (
  <>
    <div className={`${styles.margintop} d-flex justify-content-center`}>
      <form className={styles.signform} onSubmit={onSubmit}>
        <h1>{LOGIN_PAGE.LOGIN_MESSAGE}</h1>
        {errors}
        <div className={styles.margintop}>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder={LOGIN_PAGE.EMAIL_PLACEHOLDER}
          />
        </div>
        <div className={styles.margintop}>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder={LOGIN_PAGE.PASSWORD_PLACEHOLDER}
          />
        </div>
        <Button
          stylesProp={styles.margintop}
          message={LOGIN_PAGE.LOGIN_MESSAGE}
        />
        <div className="persistCheck">
          <input
            type="checkbox"
            id="persist"
            onChange={togglePersist}
            checked={persist}
          />
          <label htmlFor="persist">Trust This Device</label>
        </div>
      </form>
    </div>
    <div className={`${styles.margintop} d-flex justify-content-center`}>
      <Button
        message="Facebook"
        onClick={() => Router.push("/api/users/facebook")}
      />
    </div>
  </>
);
