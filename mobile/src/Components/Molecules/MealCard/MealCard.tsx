import React from 'react'
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  HStack,
  Stack,
} from 'native-base'
import { TouchableOpacity } from 'react-native'

export type Props = {
  id: string
  title: string
  imagePath: string
  price: string
  stock: string
}

export const MealCard = ({ id, title, imagePath, price, stock }: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <Box
        maxW="80"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        backgroundColor="gray.50"
        shadow="2"
        margin="3"
      >
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: imagePath,
              }}
              alt="image"
            />
          </AspectRatio>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md">{title}</Heading>
              <Text fontSize="xs" color="black" fontWeight="500">
                Stock: {stock}
              </Text>
            </Stack>

            <HStack
              alignItems="center"
              space={4}
              justifyContent="space-between"
            >
              <HStack alignItems="center">
                <Text color="#ff0000" bold fontSize="md">
                  {price} RON
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </Box>
    </TouchableOpacity>
  )
}
