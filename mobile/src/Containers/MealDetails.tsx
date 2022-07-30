import { getSingleMeal } from '@/Utils/API/meals'
import React from 'react'
import { Alert } from 'react-native'
import { Box, Text, AspectRatio, Image, Button, Select } from 'native-base'

const MealDetails = ({ route }) => {
  const { id } = route.params

  const [meal, setMeal] = React.useState({})

  React.useEffect(() => {
    const getData = async () => {
      try {
        const data = await getSingleMeal(id)
        setMeal(data)
      } catch (err) {
        Alert.alert(
          'Something went wrong',
          'Please check your internet connection',
        )
      }
    }

    getData()
  }, [id, meal])

  const renderStock = (stock: number) => {
    let stockArray = []
    for (let i = 1; i <= stock; i++) {
      stockArray.push(
        <Select.Item key={i} value={i.toString()} label={i.toString()} />,
      )
    }
    return stockArray
  }

  return (
    <Box alignItems="center" justifyContent="center">
      <Text fontSize="xl" marginTop="5" bold>
        {meal?.title}
      </Text>
      <Text fontSize="lg" bold marginBottom="3">
        {meal?.price} RON
      </Text>
      <AspectRatio w="90%" ratio={16 / 9} marginBottom="5">
        <Image
          source={{
            uri: meal?.imagePath,
          }}
          alt="image"
        />
      </AspectRatio>
      <Select
        minWidth="200"
        accessibilityLabel="Select quantity"
        placeholder="Select quantity"
        marginBottom="2"
      >
        {renderStock(meal?.stock)}
      </Select>
      <Button colorScheme="blue">Purchase</Button>
    </Box>
  )
}

export default MealDetails
