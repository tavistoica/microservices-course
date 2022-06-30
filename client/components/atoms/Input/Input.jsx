import classnames from "classnames";
import styles from "./Input.module.css";

const mainClass = "oct-input";

export const Input = ({
  error = "",
  className = "",
  type = null,
  onChange,
  value,
  placeholder = "",
}) => {
  return (
    <>
      <input
        className={classnames(styles[mainClass], className, {
          [`${styles[`${mainClass}-error`]}`]: error,
        })}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
      <div
        className={classnames(
          styles[`${mainClass}-message-error`],
          styles[`${mainClass}-error`]
        )}
      >
        {error}
      </div>
    </>
  );
};
