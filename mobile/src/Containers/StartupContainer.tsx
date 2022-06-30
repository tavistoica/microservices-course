import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { Box, Text, Button } from 'native-base'

const StartupContainer = () => {
  const navigation = useNavigation()
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text>Text here</Text>
      <Button onPress={() => navigation.navigate('Login')}>Login</Button>
    </Box>
  )
}

export default StartupContainer
