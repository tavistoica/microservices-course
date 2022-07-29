import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { AuthContext } from '../../Context/authContext'
import { AuthContextType } from '../../@types/auth'

import { Box, Button } from 'native-base'

const Homepage = () => {
  const navigation = useNavigation()

  const { userData } = React.useContext(AuthContext) as AuthContextType

  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Button onPress={() => console.log(userData)}>Welcome </Button>
    </Box>
  )
}

export default Homepage
