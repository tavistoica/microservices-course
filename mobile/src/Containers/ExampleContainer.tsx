import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button } from '@ui-kitten/components'

const ExampleContainer = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Next point</Text>
      <Button onPress={() => navigation.popToTop()}>Press to go back</Button>
    </View>
  )
}

export default ExampleContainer

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
