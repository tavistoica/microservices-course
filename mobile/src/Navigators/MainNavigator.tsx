import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { StartupContainer, ExampleContainer } from '../Containers'

const Stack = createStackNavigator<any>()

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={StartupContainer} />
      <Stack.Screen name="Second" component={ExampleContainer} />
    </Stack.Navigator>
  )
}
