import React from 'react'
import 'react-native-gesture-handler'
import '../ReactotronConfig'

import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { RootNavigator, MainNavigator } from './Navigators'

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {false ? <MainNavigator /> : <RootNavigator />}
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

export default App
