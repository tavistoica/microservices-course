import React, { useContext } from 'react'

import { AuthContext } from '../Context/authContext'
import { AuthContextType } from '../@types/auth'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { MainNavigator } from './MainNavigator'
import { AuthNavigator } from './AuthNavigator'

const Stack = createNativeStackNavigator()

export const RootNavigator = () => {
  const { userData } = useContext(AuthContext) as AuthContextType
  return (
    <Stack.Navigator>
      {userData === undefined ? (
        <Stack.Group
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="auth" component={AuthNavigator} />
        </Stack.Group>
      ) : (
        <Stack.Group
          screenOptions={{
            headerShown: true,
            headerTitle: 'Smart Food',
          }}
        >
          <Stack.Screen name="main" component={MainNavigator} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  )
}

RootNavigator.displayName = 'RootNavigator'
