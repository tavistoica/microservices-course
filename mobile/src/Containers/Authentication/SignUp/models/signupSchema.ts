import * as yup from 'yup'

export const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please provide a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character',
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm password'),
  role: yup.string().required('Role is required'),
})
