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

export const MealCard = () => {
  return (
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
              uri: 'https://i.ytimg.com/vi/1EBbv0MpC1E/hqdefault.jpg',
            }}
            alt="image"
          />
        </AspectRatio>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md">Hot Dog de la Profi</Heading>
            <Text fontSize="xs" color="black" fontWeight="500">
              Stock: 3
            </Text>
          </Stack>

          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text color="red.900" fontWeight="600" fontSize="md">
                10 LEI
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
  )
}
