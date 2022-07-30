import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { AuthContext } from '../Context/authContext'
import { AuthContextType } from '../@types/auth'

import { Box, Text } from 'native-base'

import { getCurrentUser } from '@/Utils/API/users'

const Profile = () => {
  const navigation = useNavigation()

  const { userData } = React.useContext(AuthContext) as AuthContextType

  return (
    <Box marginTop="5" alignItems="center" justifyContent="center">
      <Text bold fontSize="xl">
        Profile details
      </Text>
      <Text fontSize="md" marginTop="5">
        Email: {userData.email}
      </Text>
      <Text fontSize="md">
        Role: {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
      </Text>
    </Box>
  )
}

export default Profile
