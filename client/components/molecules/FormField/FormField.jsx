import { useState } from "react";
import { useDidMountEffect } from "../../../hooks/use-did-mount-effect";
import classnames from "classnames";
import styles from "./FormField.module.css";
import { Text } from "../../atoms/Text/Text";
import { TEXT_SIZES } from "../../../utils/constants";
import { Input } from "../../atoms/Input/Input";

const mainClass = "oct-form-field";

export const FormField = ({
  value,
  label,
  onChange,
  className = "",
  type = null,
  getError = null,
  placeholder = "",
  required = false,
}) => {
  const [error, setError] = useState("");

  useDidMountEffect(() => {
    if (getError) {
      setError(getError(value));
    }
  }, [value]);

  const labelRow = (
    <div className={styles[`${mainClass}__label`]}>
      <div className={styles[`${mainClass}__label-text`]}>
        <Text size={TEXT_SIZES.S}>{label}</Text>
      </div>
      {required && (
        <Text className={styles[`${mainClass}__label-required`]}>Required</Text>
      )}
    </div>
  );

  return (
    <div className={styles[`${mainClass}__group`]}>
      {labelRow}
      <Input
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        error={error}
      />
      <div
        className={classnames(
          styles[`${mainClass}-message-error`],
          styles[`${mainClass}-error`]
        )}
      >
        {error}
      </div>
    </div>
  );
};
