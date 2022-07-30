import React from 'react'
import { Box, Text } from 'native-base'
import { StyleSheet, ScrollView } from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component'

const Orders = () => {
  const [data, setData] = React.useState({
    tableHead: ['Title', 'Status', 'Ammount', 'Price'],
    tableData: [
      ['Pizza', 'Created', '10', '50'],
      ['Pizza', 'Canceled', '10', '50'],
    ],
  })

  return (
    <ScrollView>
      <Box alignItems="center" justifyContent="center">
        <Text fontSize="xl" marginTop="5" marginBottom="3" bold>
          Orders
        </Text>
      </Box>
      <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
        <Row
          data={data.tableHead}
          style={styles.head}
          textStyle={styles.text}
        />
        <Rows data={data.tableData} textStyle={styles.text} />
      </Table>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
})

export default Orders
