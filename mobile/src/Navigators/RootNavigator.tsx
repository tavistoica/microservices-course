/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your MainNavigator) which the user
 * will use once logged in.
 */
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Login, SignUp, ForgetPassword, Homepage } from '../Containers'

const Stack = createNativeStackNavigator()

export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerShown: true,
          headerTitle: '',
        }}
      >
        <Stack.Screen name="signIn" component={Login} />
        <Stack.Screen name="forgetPassword" component={ForgetPassword} />
        <Stack.Screen name="signUp" component={SignUp} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          headerShown: true,
          headerTitle: 'Smart Food',
        }}
      >
        <Stack.Screen name="home" component={Homepage} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

RootNavigator.displayName = 'RootNavigator'
