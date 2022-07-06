import React from 'react'
import { useNavigation } from '@react-navigation/native'

import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  Select,
  CheckIcon,
  WarningOutlineIcon,
} from 'native-base'

const SignUp = () => {
  const navigation = useNavigation()
  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
          fontWeight="semibold"
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: 'warmGray.200',
          }}
          fontWeight="medium"
          size="xs"
        >
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <Input placeholder="Email" />
          </FormControl>
          <FormControl>
            <Input type="password" placeholder="Password" />
          </FormControl>
          <FormControl>
            <Input type="password" placeholder="Confirm Password" />
          </FormControl>
          <FormControl isRequired isInvalid>
            <FormControl.Label>Choose role</FormControl.Label>
            <Select
              minWidth="200"
              accessibilityLabel="Choose role"
              placeholder="Choose role"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size={5} />,
              }}
              mt="1"
            >
              <Select.Item label="Client" value="client" />
              <Select.Item label="Restaurant" value="restaurant" />
            </Select>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Please make a selection!
            </FormControl.ErrorMessage>
          </FormControl>
          <Button mt="2" colorScheme="blue">
            Sign up
          </Button>
        </VStack>
      </Box>
    </Center>
  )
}

export default SignUp
