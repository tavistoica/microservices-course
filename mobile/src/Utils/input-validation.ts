export const emailValidation = (email: string) => {
  if (!email) {
    return 'Email field cannot be empty'
  }
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  if (!email || regex.test(email) === false) {
    return 'Please provide a valid email address'
  }
  return ''
}

export const passwordValidation = (password: string) => {
  const uppercaseRegExp = /(?=.*?[A-Z])/
  const lowercaseRegExp = /(?=.*?[a-z])/
  const digitsRegExp = /(?=.*?[0-9])/
  const specialCharRegExp = /(?=.*[!@#$%^&*])/
  const minLengthRegExp = /.{8,}/
  const uppercasePassword = uppercaseRegExp.test(password)
  const lowercasePassword = lowercaseRegExp.test(password)
  const digitsPassword = digitsRegExp.test(password)
  const specialCharPassword = specialCharRegExp.test(password)
  const minLengthPassword = minLengthRegExp.test(password)

  let errMsg = ''
  if (!password) {
    errMsg = 'Password field cannot be empty'
  } else if (!uppercasePassword) {
    errMsg = 'At least one uppercase character is required'
  } else if (!lowercasePassword) {
    errMsg = 'At least one lowercase character is required'
  } else if (!digitsPassword) {
    errMsg = 'At least one digit is required'
  } else if (!specialCharPassword) {
    errMsg = 'At least one special character is required'
  } else if (!minLengthPassword) {
    errMsg = 'At least minumum 8 characters are required'
  } else {
    errMsg = ''
  }
  return errMsg
}

export const confirmPasswordValidation = (
  confirmPassword: string,
  password: string,
) => {
  if (confirmPassword !== password) {
    return 'Passwords are not matching'
  }
  const testPassword = passwordValidation(password)
  if (testPassword) {
    return testPassword
  }
  return ''
}

export const mealTitleValidation = (title: string) => {
  if (!title) {
    return 'Title field cannot be empty'
  }
  return ''
}

export const mealPriceValidation = (price: number) => {
  if (price < 0) {
    return 'Price needs to be greater or equal than 0'
  }
  return ''
}

export const mealStockValidation = (stock: number) => {
  if (stock < 0) {
    return 'Stock needs to be greater or equal than 0'
  }
  return ''
}
