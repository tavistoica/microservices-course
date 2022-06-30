import React from 'react'
import { useNavigation } from '@react-navigation/native'

import {
  Center,
  Box,
  VStack,
  Heading,
  FormControl,
  Input,
  Button,
  AlertDialog,
} from 'native-base'

const ForgetPassword = () => {
  const navigation = useNavigation()
  const [isOpen, setIsOpen] = React.useState(false)

  const onClose = React.useCallback(() => {
    setIsOpen(false)
    navigation.goBack()
  }, [navigation])

  const cancelRef = React.useRef(null)

  const onSendInstruction = React.useCallback(() => {
    setIsOpen(true)
  }, [])

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
        >
          Reset Password
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <Input placeholder="Email" />
          </FormControl>
          <Button mt="2" colorScheme="blue" onPress={onSendInstruction}>
            Send instructions
          </Button>
        </VStack>
      </Box>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.Header>Check your email</AlertDialog.Header>
          <AlertDialog.Body>
            We have sent an email to your email address with instructions to
            reset your password.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
              >
                Got it!
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  )
}

export default ForgetPassword
