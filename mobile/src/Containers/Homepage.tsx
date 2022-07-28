import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { AuthContext } from '../Context/authContext'
import { AuthContextType } from '../@types/auth'

import { Box, Text } from 'native-base'

const Homepage = () => {
  const navigation = useNavigation()

  const { email } = React.useContext(AuthContext) as AuthContextType

  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text>Welcome {email}</Text>
    </Box>
  )
}

export default Homepage
