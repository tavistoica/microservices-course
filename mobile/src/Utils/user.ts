import axios from 'axios'
import { CURRENT_USER } from './constants'

export const getCurrentUser = async () => {
  const response = await axios.get(CURRENT_USER, { withCredentials: true })
  const user = {
    email: response.data.currentUser.email,
    role: response.data.currentUser.role,
    id: response.data.currentUser.id,
  }

  return user
}
