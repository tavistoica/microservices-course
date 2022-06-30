import styles from "./Login.module.css";
import { LOGIN_PAGE } from "../../../utils/constants";
import Router from "next/router";

import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";

export const Login = ({
  onSubmit,
  errors,
  email,
  password,
  setEmail,
  setPassword,
}) => {
  return (
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
};
