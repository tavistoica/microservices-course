import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { StartupContainer } from '../Containers'
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
    </Stack.Navigator>
  )
}

const exitRoutes = ['TabNavigator']
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
