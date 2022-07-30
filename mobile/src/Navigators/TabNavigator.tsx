import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Homepage, Orders, Profile } from '../Containers'

import {
  Home,
  HomeOutline,
  Menu,
  MenuOutline,
  Person,
  PersonOutline,
} from '@/Assets/Images/Icons'

const Tab = createBottomTabNavigator<any>()

export const TabNavigator = function TabNavigator() {
  const getIcon = (tab: string | undefined) => {
    switch (tab) {
      case 'home': {
        return <Home />
      }
      case 'home-outline': {
        return <HomeOutline />
      }
      case 'menu': {
        return <Menu />
      }
      case 'menu-outline': {
        return <MenuOutline />
      }
      case 'person-circle': {
        return <Person />
      }
      case 'person-circle-outline': {
        return <PersonOutline />
      }
    }
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'home') {
            iconName = focused ? 'home' : 'home-outline'
          } else if (route.name === 'orders') {
            iconName = focused ? 'menu' : 'menu-outline'
          } else if (route.name === 'profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline'
          }

          return getIcon(iconName)
        },
        headerShown: false,
        tabBarActiveBackgroundColor: '#F9F9F9',
        tabBarInactiveBackgroundColor: 'white',
        headerTintColor: 'black',
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'black',
      })}
    >
      <Tab.Screen
        name="home"
        component={Homepage}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="orders"
        component={Orders}
        options={{
          tabBarLabel: 'Orders',
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  )
}
