import React from 'react'
import { Box, Text } from 'native-base'
import { StyleSheet, ScrollView } from 'react-native'
import { Table, Row } from 'react-native-table-component'

const Orders = () => {
  const tableHead = ['Title', 'Status', 'Ammount', 'Price']
  const [data, setData] = React.useState([
    ['Pizza', 'Created', '10', '50'],
    ['Pizza', 'Canceled', '10', '50'],
  ])

  return (
    <ScrollView>
      <Box alignItems="center" justifyContent="center">
        <Text fontSize="xl" marginTop="5" marginBottom="3" bold>
          Orders
        </Text>
      </Box>
      <Table borderStyle={styles.table}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        {data.map((item, index) => {
          return <Row key={index} data={item} textStyle={styles.text} />
        })}
      </Table>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  table: { borderWidth: 2, borderColor: 'black' },
  head: { height: 40, backgroundColor: 'lightgrey' },
  text: { margin: 6 },
})

export default Orders
