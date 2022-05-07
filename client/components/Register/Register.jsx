import { REGISTER_PAGE } from "../../utils/constants";

import { Button } from "../Button/Button";

import styles from "./Register.module.css";

export const Register = ({
  onSubmit,
  email,
  password,
  errors,
  setEmail,
  setPassword,
}) => {
  return (
    <div className={`${styles.margintop} d-flex justify-content-center`}>
      <form className={styles.registerform} onSubmit={onSubmit}>
        <h1>{REGISTER_PAGE.REGISTER_MESSAGE}</h1>
        {errors}
        <div className={styles.margintop}>
          <input
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder={REGISTER_PAGE.EMAIL_PLACEHOLDER}
          />
        </div>
        <div className={styles.margintop}>
          <input
            className="form-control"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeHolder={REGISTER_PAGE.PASSWORD_PLACEHOLDER}
          />
        </div>
        <Button
          stylesProp={styles.margintop}
          message={REGISTER_PAGE.REGISTER_MESSAGE}
        />
      </form>
    </div>
  );
};
