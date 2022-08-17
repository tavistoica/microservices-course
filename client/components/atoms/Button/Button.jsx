import React from "react";
import styles from "./Button.module.css";

export const Button = ({
  message,
  type = "primary",
  stylesProp = "",
  onClick = null,
  disable = false,
}) => (
  <button
    type="button"
    className={`${stylesProp} ${styles.button} btn btn-${type}`}
    onClick={onClick}
    disabled={disable}
  >
    {message}
  </button>
);
