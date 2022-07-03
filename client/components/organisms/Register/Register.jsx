import { useState, useEffect } from "react";

import { UserEnum } from "@ostoica/common/build/types/user.types";
import { REGISTER_PAGE } from "../../../utils/constants";
import {
  emailValidation,
  passwordValidation,
  confirmPasswordValidation,
} from "../../../utils/input-validation";

import { Button } from "../../atoms/Button/Button";
import { FormField } from "../../molecules/FormField/FormField";

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
    } else setIsConfirmEqual(true);
  }, [confirmPassword]);

  useEffect(() => {
    if (
      !password ||
      !confirmPassword ||
      !email ||
      !isConfirmEqual ||
      password !== confirmPassword
    ) {
      setIsSubmittable(false);
    } else {
      setIsSubmittable(true);
    }
  }, [password, confirmPassword, email, isConfirmEqual]);

  return (
    <div className={`${styles.margintop} d-flex justify-content-center`}>
      <form className={styles.registerform} onSubmit={onSubmit}>
        <h1>{REGISTER_PAGE.REGISTER_MESSAGE}</h1>
        {errors}
        <div className={styles.margintop}>
          <FormField
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder={REGISTER_PAGE.EMAIL_PLACEHOLDER}
            getError={emailValidation}
            required
            label={"Email"}
          />
        </div>
        <div className={styles.margintop}>
          <FormField
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder={REGISTER_PAGE.PASSWORD_PLACEHOLDER}
            required
            label={"Password"}
            getError={passwordValidation}
          />
        </div>
        <div className={styles.margintop}>
          <FormField
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            placeholder={REGISTER_PAGE.CONFIRM_PASSWORD_PLACEHOLDER}
            getError={(confirmPassword) =>
              confirmPasswordValidation(confirmPassword, password)
            }
            required
            label={"Confirm Password"}
          />
        </div>
        <div className={styles.margintop}>
          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
          >
            <option value={UserEnum.Customer}>{UserEnum.Customer}</option>
            <option value={UserEnum.Restaurant}>{UserEnum.Restaurant}</option>
            <option value={UserEnum.Admin}>{UserEnum.Admin}</option>
          </select>
        </div>
        <Button
          stylesProp={styles.margintop}
          message={REGISTER_PAGE.REGISTER_MESSAGE}
          disable={!isSubmittable}
        />
      </form>
    </div>
  );
};
