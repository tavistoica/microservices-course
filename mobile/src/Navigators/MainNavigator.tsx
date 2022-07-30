import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Homepage, MealDetails } from '../Containers'
import { TabNavigator } from './TabNavigator'

const Stack = createNativeStackNavigator()

export function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="tabNavigator"
        component={TabNavigator}
        options={{ headerShown: true, headerTitle: 'Smart Food' }}
      />
      <Stack.Group
        screenOptions={{
          headerShown: true,
          headerTitle: 'Smart Food',
          headerBackTitle: 'Back',
        }}
      >
        <Stack.Screen name="home" component={Homepage} />
        <Stack.Screen name="mealDetails" component={MealDetails} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

const exitRoutes = ['TabNavigator']
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
