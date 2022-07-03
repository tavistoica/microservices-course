import { EMAIL_VALIDATION } from "./constants";

export const emailValidation = (email) => {
  if (!email) return EMAIL_VALIDATION.EMPTY_FIELD;
  const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!email || regex.test(email) === false) {
    return EMAIL_VALIDATION.REGEX_ERROR;
  }
  return "";
};

export const passwordValidation = (password) => {
  const uppercaseRegExp = /(?=.*?[A-Z])/;
  const lowercaseRegExp = /(?=.*?[a-z])/;
  const digitsRegExp = /(?=.*?[0-9])/;
  const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
  const minLengthRegExp = /.{8,}/;
  const passwordLength = password.length;
  const uppercasePassword = uppercaseRegExp.test(password);
  const lowercasePassword = lowercaseRegExp.test(password);
  const digitsPassword = digitsRegExp.test(password);
  const specialCharPassword = specialCharRegExp.test(password);
  const minLengthPassword = minLengthRegExp.test(password);

  let errMsg = "";
  if (passwordLength === 0) {
    errMsg = "Password is empty";
  } else if (!uppercasePassword) {
    errMsg = "At least one Uppercase";
  } else if (!lowercasePassword) {
    errMsg = "At least one Lowercase";
  } else if (!digitsPassword) {
    errMsg = "At least one digit";
  } else if (!specialCharPassword) {
    errMsg = "At least one Special Characters";
  } else if (!minLengthPassword) {
    errMsg = "At least minumum 8 characters";
  } else {
    errMsg = "";
  }
  return errMsg;
};

export const confirmPasswordValidation = (confirmPassword, password) => {
  if (confirmPassword !== password) {
    return "Confirm password is not matched";
  }
  const testPassword = passwordValidation(password);
  if (testPassword) return testPassword;
  return "";
};

export const mealTitleValidation = (title) => {
  if (!title) return "Title field cannot be empty";
  return "";
};

export const mealPriceValidation = (price) => {
  if (price < 0) {
    return "Price needs to be greater or equal than 0";
  }
  return "";
};

export const mealStockValidation = (stock) => {
  if (stock < 0) {
    return "Stock needs to be greater or equal than 0";
  }
  return "";
};
