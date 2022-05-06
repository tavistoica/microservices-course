import styles from "./Button.module.css";

export const Button = ({ message, type = "primary", stylesProp = "" }) => {
  return (
    <button className={`${stylesProp} ${styles.button} btn btn-${type}`}>
      {message}
    </button>
  );
};
