import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { AuthContext } from '../../Context/authContext'
import { AuthContextType } from '../../@types/auth'

import { Box, ScrollView } from 'native-base'
import { MealCard } from '@/Components'

const Homepage = () => {
  const navigation = useNavigation()

  const { userData } = React.useContext(AuthContext) as AuthContextType

  return (
    <ScrollView>
      <Box flex={1} alignItems="center" justifyContent="center">
        <MealCard />
        <MealCard />
        <MealCard />
        <MealCard />
        <MealCard />
        <MealCard />
      </Box>
    </ScrollView>
  )
}

export default Homepage
