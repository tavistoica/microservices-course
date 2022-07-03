import classnames from "classnames";
import styles from "./Text.module.css";

const mainClass = "oct-text";

export const Text = ({
  as = "p",
  size = "m",
  className,
  style = {},
  children,
  ...props
}) => {
  const Component = as;
  const classes = classnames(
    mainClass,
    `${mainClass}--size_${size}`,
    className
  );
  return (
    <Component className={classes} style={{ ...style }} {...props}>
      {children}
    </Component>
  );
};
