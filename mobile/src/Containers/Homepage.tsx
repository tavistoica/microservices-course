import React, { useContext, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'

import { AuthContext } from '../Context/authContext'
import { AuthContextType } from '../@types/auth'

import { Box, Text, Button } from 'native-base'

const Homepage = () => {
  const navigation = useNavigation()

  const { logout, email } = useContext(AuthContext) as AuthContextType

  const onPress = useCallback(() => {
    logout()
  }, [logout])

  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text>Welcome {email}</Text>
      <Button mt="2" colorScheme="blue" onPress={onPress}>
        Logout
      </Button>
    </Box>
  )
}

export default Homepage
