import React from 'react'
import 'react-native-gesture-handler'
import '../ReactotronConfig'
import AuthProvider from './Context/authContext'

import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { RootNavigator } from './Navigators'

const App = () => {
  return (
    <AuthProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </NativeBaseProvider>
    </AuthProvider>
  )
}

export default App
