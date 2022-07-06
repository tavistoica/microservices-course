import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Box, Text, Button } from 'native-base'

const Homepage = () => {
  const navigation = useNavigation()

  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text>Welcome </Text>
    </Box>
  )
}

export default Homepage
