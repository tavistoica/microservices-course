import axios from 'axios'
import { LOGIN, LOGOUT, REGISTER } from './constants'

export const createUser = async (
  email: string,
  password: string,
  role: string,
) => {
  const response = await axios.post(REGISTER, {
    email: email,
    password: password,
    role: role,
  })

  const token = response.headers['set-cookie']
  return token
}

export const authenticate = async (email: string, password: string) => {
  const response = await axios.post(LOGIN, {
    email: email,
    password: password,
  })

  const token = response.headers['set-cookie']
  return token
}
