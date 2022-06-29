import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StartupContainer } from '../Containers'

const Tab = createBottomTabNavigator<any>()

export const TabNavigator = function TabNavigator() {
  // return <Icon as={Entypo} name="user"></Icon>;
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="home"
        component={StartupContainer}
        options={{
          tabBarLabel: 'HomeScreen',
        }}
      />
    </Tab.Navigator>
  )
}
