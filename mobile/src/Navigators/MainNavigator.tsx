import React from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'

import { StartupContainer, LoginContainer } from '../Containers'
import { TabNavigator } from './TabNavigator'

const Stack = createNativeStackNavigator()

export function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Home" component={StartupContainer} />
      <Stack.Screen name="Login" component={LoginContainer} />
    </Stack.Navigator>
  )
}

const exitRoutes = ['TabNavigator']
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
