/* eslint-disable react/button-has-type */
import React from "react";
import styles from "./Button.module.css";

export const Button = ({
  message,
  btnType = "primary",
  type = "button",
  stylesProp = "",
  onClick = null,
  disable = false,
}) => (
  <button
    type={type}
    className={`${stylesProp} ${styles.button} btn btn-${btnType}`}
    onClick={onClick}
    disabled={disable}
  >
    {message}
  </button>
);
