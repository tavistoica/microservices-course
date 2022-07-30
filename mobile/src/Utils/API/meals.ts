import axios from 'axios'
import { GET_ALL_MEALS } from '../constants'

export const getAllMeals = async () => {
  const response = await axios.get(GET_ALL_MEALS)
  return response.data
}
