import axios from 'axios'
import { GET_ALL_MEALS, GET_USERS_MEALS, GET_SINGLE_MEAL } from '../constants'

export const getAllMeals = async () => {
  const response = await axios.get(GET_ALL_MEALS)
  return response.data
}

export const getUsersMeals = async (userId: string) => {
  const response = await axios.get(`${GET_USERS_MEALS}${userId}`)
  return response.data
}

export const getSingleMeal = async (mealId: string) => {
  const response = await axios.get(`${GET_SINGLE_MEAL}${mealId}`)
  return response.data
}
