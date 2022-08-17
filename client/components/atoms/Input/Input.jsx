import React from "react";
import classnames from "classnames";
import styles from "./Input.module.css";

const mainClass = "oct-input";

export const Input = ({ error, type, onChange, value, placeholder }) => (
  <input
    className={classnames(styles[mainClass], {
      [`${styles[`${mainClass}-error`]}`]: error,
    })}
    type={type}
    onChange={onChange}
    value={value}
    placeholder={placeholder}
  />
);
