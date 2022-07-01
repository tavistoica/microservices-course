import { useState, useEffect } from "react";
import { REGISTER_PAGE } from "../../../utils/constants";

import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";

import styles from "./Register.module.css";

export const Register = ({
  onSubmit,
  email,
  password,
  role,
  errors,
  setEmail,
  setPassword,
  setRole,
}) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmEqual, setIsConfirmEqual] = useState(true);
  const [isSubmittable, setIsSubmittable] = useState(false);

  useEffect(() => {
    if (password !== confirmPassword) {
      setIsConfirmEqual(false);
      setIsSubmittable(false);
    } else setIsConfirmEqual(true);
  }, [confirmPassword]);

  useEffect(() => {
    if (!password || !confirmPassword || !email || !isConfirmEqual) {
      setIsSubmittable(false);
    } else {
      setIsSubmittable(true);
    }
  }, [password, confirmPassword, email]);

  return (
    <div className={`${styles.margintop} d-flex justify-content-center`}>
      <form className={styles.registerform} onSubmit={onSubmit}>
        <h1>{REGISTER_PAGE.REGISTER_MESSAGE}</h1>
        {errors}
        <div className={styles.margintop}>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder={REGISTER_PAGE.EMAIL_PLACEHOLDER}
          />
        </div>
        <div className={styles.margintop}>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder={REGISTER_PAGE.PASSWORD_PLACEHOLDER}
          />
        </div>
        <div className={styles.margintop}>
          <Input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            placeholder={REGISTER_PAGE.CONFIRM_PASSWORD_PLACEHOLDER}
            error={!isConfirmEqual ? REGISTER_PAGE.CONFIRM_PASSWORD_ERROR : ""}
          />
        </div>
        <div className={styles.margintop}>
          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
          >
            <option value="User">User</option>
            <option value="Resturant">Resturant</option>
          </select>
        </div>
        <Button
          stylesProp={styles.margintop}
          message={REGISTER_PAGE.REGISTER_MESSAGE}
          disable={isSubmittable}
        />
      </form>
    </div>
  );
};
