import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const StartupContainer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Starting Point</Text>
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
  },
})
