import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button } from '@ui-kitten/components'

const StartupContainer = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Starting Point</Text>
      <Button onPress={() => navigation.navigate('Second')}>
        Press to navigate
      </Button>
    </View>
  )
}

export default StartupContainer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  text: {
    textAlign: 'center',
    marginBottom: 10,
  },
})
