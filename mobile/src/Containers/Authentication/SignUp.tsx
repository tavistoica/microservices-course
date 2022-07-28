import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../Context/authContext'
import { AuthContextType } from '../../@types/auth'

import {
  emailValidation,
  passwordValidation,
  confirmPasswordValidation,
} from '@/Utils/input-validation'

import { createUser } from '@/Utils/auth'

import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Link,
  FormControl,
  Input,
  Button,
  Center,
  Select,
  CheckIcon,
  WarningOutlineIcon,
  Spinner,
} from 'native-base'
import { Alert } from 'react-native'

const SignUp = () => {
  const navigation = useNavigation()
  const { login } = React.useContext(AuthContext) as AuthContextType

  const [formData, setData] = React.useState({})
  const [errors, setErrors] = React.useState({})
  const [isAuthenticating, setIsAuthenticating] = React.useState(false)

  const validate = () => {
    if (emailValidation(formData.email) !== '') {
      setErrors({ ...errors, email: emailValidation(formData.email) })
      return false
    }
    if (passwordValidation(formData.password) !== '') {
      setErrors({ ...errors, password: passwordValidation(formData.password) })
      return false
    }
    if (
      confirmPasswordValidation(formData.confirmPassword, formData.password) !==
      ''
    ) {
      setErrors({
        ...errors,
        confirmPassword: confirmPasswordValidation(
          formData.confirmPassword,
          formData.password,
        ),
      })
      return false
    }

    return true
  }

  const onSubmit = async () => {
    if (validate() === true) {
      setIsAuthenticating(true)
      try {
        const token = await createUser(
          formData.email,
          formData.password,
          formData.role,
        )
        login(token, formData.email)
      } catch (err) {
        Alert.alert(
          'Authentication failed',
          'Could not create user. Please check your input and try again !',
        )
      }
      setIsAuthenticating(false)
    }
  }

  const onSignIn = React.useCallback(() => {
    navigation.replace('signIn')
  }, [navigation])

  if (isAuthenticating) {
    return (
      <Center w="100%" h="100%">
        <Box safeArea p="2" w="90%" py="8">
          <HStack space={2} justifyContent="center" alignItems="center">
            <Spinner />
            <Heading color="coolGray.600" fontSize="md">
              Creating user...
            </Heading>
          </HStack>
        </Box>
      </Center>
    )
  }

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
          <FormControl isRequired isInvalid={'email' in errors}>
            <Input
              placeholder="Email"
              onChangeText={value => setData({ ...formData, email: value })}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {'email' in errors ? (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {emailValidation(formData.email)}
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>
          <FormControl isRequired isInvalid={'password' in errors}>
            <Input
              type="password"
              placeholder="Password"
              onChangeText={value => setData({ ...formData, password: value })}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
            />
            {'password' in errors ? (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {passwordValidation(formData.password)}
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>
          <FormControl isRequired isInvalid={'confirmPassword' in errors}>
            <Input
              type="password"
              placeholder="Confirm Password"
              onChangeText={value =>
                setData({ ...formData, confirmPassword: value })
              }
              autoCapitalize="none"
              autoCorrect={false}
            />
            {'confirmPassword' in errors ? (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {confirmPasswordValidation(
                  formData.confirmPassword,
                  formData.password,
                )}
              </FormControl.ErrorMessage>
            ) : null}
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
              onValueChange={value => setData({ ...formData, role: value })}
            >
              <Select.Item label="Client" value="client" />
              <Select.Item label="Restaurant" value="restaurant" />
              <Select.Item label="Admin" value="admin" />
            </Select>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Please make a selection!
            </FormControl.ErrorMessage>
          </FormControl>
          <Button mt="2" colorScheme="blue" onPress={onSubmit}>
            Sign up
          </Button>
        </VStack>
        <HStack mt="6" justifyContent="center">
          <Text
            fontSize="sm"
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}
          >
            I already have an account.{' '}
          </Text>
          <Link
            _text={{
              color: 'indigo.500',
              fontWeight: 'medium',
              fontSize: 'sm',
            }}
            onPress={onSignIn}
          >
            Sign In
          </Link>
        </HStack>
      </Box>
    </Center>
  )
}

export default SignUp
