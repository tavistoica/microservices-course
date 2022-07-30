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
        <Select.Item label="1" value="1" />
      </Select>
      <Button colorScheme="light">Purchase</Button>
    </Box>
  )
}

export default MealDetails
