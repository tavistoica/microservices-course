import React from 'react'
import 'react-native-gesture-handler'
import '../ReactotronConfig'

import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { RootNavigator } from './Navigators'

const App = () => (
  <NativeBaseProvider>
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  </NativeBaseProvider>
)

export default App
