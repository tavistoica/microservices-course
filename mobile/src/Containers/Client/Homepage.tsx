import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { AuthContext } from '../../Context/authContext'
import { AuthContextType } from '../../@types/auth'

import { Box, ScrollView, Text } from 'native-base'
import { MealCard } from '@/Components'
import { getAllMeals } from '@/Utils/API/meals'
import { Alert } from 'react-native'

const Homepage = () => {
  const navigation = useNavigation()

  const { userData } = React.useContext(AuthContext) as AuthContextType
  const [meals, setMeals] = React.useState([])

  React.useState(() => {
    const getData = async () => {
      try {
        const data = await getAllMeals()
        setMeals(data)
      } catch (err) {
        Alert.alert(
          'Something went wrong',
          'Please check your internet connection',
        )
      }
    }

    getData()
  }, [])

  return (
    <ScrollView>
      <Box flex={1} alignItems="center" justifyContent="center">
        {userData?.role === 'restaurant' ? (
          <Text fontSize="xl" marginTop="5" marginBottom="3" bold>
            Published meals
          </Text>
        ) : (
          <Text fontSize="xl" marginTop="5" marginBottom="3" bold>
            Available meals
          </Text>
        )}
        {meals.map(meal => {
          return (
            <MealCard
              key={meal.id}
              id={meal.id}
              imagePath={meal.imagePath}
              price={meal.price}
              stock={meal.stock}
              title={meal.title}
            />
          )
        })}
      </Box>
    </ScrollView>
  )
}

export default Homepage
