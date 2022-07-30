import React, { useContext } from 'react'
import { Button } from 'native-base'

import { AuthContext } from '../Context/authContext'
import { AuthContextType } from '../@types/auth'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { MainNavigator } from './MainNavigator'
import { AuthNavigator } from './AuthNavigator'

const Stack = createNativeStackNavigator()

export const RootNavigator = () => {
  const { isAuthenticated, logout } = useContext(AuthContext) as AuthContextType

  const logoutHandler = () => {
    logout()
  }

  return (
    <Stack.Navigator>
      {isAuthenticated === false ? (
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
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="main"
            component={MainNavigator}
            options={{
              headerRight: () => (
                <Button
                  variant="ghost"
                  colorScheme="light"
                  onPress={logoutHandler}
                >
                  Logout
                </Button>
              ),
            }}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  )
}

RootNavigator.displayName = 'RootNavigator'
