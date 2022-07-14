/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your MainNavigator) which the user
 * will use once logged in.
 */
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Login, SignUp, ForgetPassword } from '../Containers'

const Stack = createNativeStackNavigator()

export const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="signIn" component={Login} />
        <Stack.Screen name="forgetPassword" component={ForgetPassword} />
        <Stack.Screen name="signUp" component={SignUp} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

AuthNavigator.displayName = 'AuthNavigator'
