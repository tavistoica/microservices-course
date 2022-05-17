import styles from "./Button.module.css";

export const Button = ({
  message,
  type = "primary",
  stylesProp = "",
  onClick = null,
}) => {
  return (
    <button
      className={`${stylesProp} ${styles.button} btn btn-${type}`}
      onClick={onClick}
    >
      {message}
    </button>
  );
};
