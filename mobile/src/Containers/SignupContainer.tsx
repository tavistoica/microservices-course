import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { Box, Text } from 'native-base'

const SignupContainer = () => {
  const navigation = useNavigation()
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text>Text here</Text>
      <Text>Text here</Text>
    </Box>
  )
}

export default SignupContainer
