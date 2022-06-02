import React from 'react'
import 'react-native-gesture-handler'
import '../ReactotronConfig'
import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'

import { NavigationContainer } from '@react-navigation/native'
import { MainNavigator } from './Navigators'

const App = () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  </ApplicationProvider>
)

export default App
