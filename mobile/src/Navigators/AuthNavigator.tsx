import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SignIn, SignUp, ForgetPassword } from '../Containers'

const Stack = createNativeStackNavigator()

export const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerShown: true,
          headerTitle: '',
        }}
      >
        <Stack.Screen name="signIn" component={SignIn} />
        <Stack.Screen name="forgetPassword" component={ForgetPassword} />
        <Stack.Screen name="signUp" component={SignUp} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

AuthNavigator.displayName = 'AuthNavigator'
