import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Homepage } from '../Containers'

const Tab = createBottomTabNavigator<any>()

export const TabNavigator = function TabNavigator() {
  // return <Icon as={Entypo} name="user"></Icon>;
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="homeTab"
        component={Homepage}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="ordersTab"
        component={Homepage}
        options={{
          tabBarLabel: 'Orders',
        }}
      />
      <Tab.Screen
        name="profileTab"
        component={Homepage}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  )
}
