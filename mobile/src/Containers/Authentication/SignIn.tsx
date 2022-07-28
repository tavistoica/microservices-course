import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../Context/authContext'
import { AuthContextType } from '../../@types/auth'
import { emailValidation, passwordValidation } from '@/Utils/input-validation'

import { authenticate } from '@/Utils/auth'

import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  WarningOutlineIcon,
  Spinner,
} from 'native-base'
import { Alert } from 'react-native'

const SignIn = () => {
  const navigation = useNavigation()
  const { login } = React.useContext(AuthContext) as AuthContextType

  const [formData, setData] = React.useState({})
  const [errors, setErrors] = React.useState({})
  const [isAuthenticating, setIsAuthenticating] = React.useState(false)

  const onForgetPassword = React.useCallback(() => {
    navigation.navigate('forgetPassword')
  }, [navigation])

  const onSignUp = React.useCallback(() => {
    navigation.replace('signUp')
  }, [navigation])

  const validate = () => {
    if (emailValidation(formData.email) !== '') {
      setErrors({ ...errors, email: emailValidation(formData.email) })
      return false
    }
    if (passwordValidation(formData.password) !== '') {
      setErrors({ ...errors, password: passwordValidation(formData.password) })
      return false
    }
    return true
  }

  const onSubmit = async () => {
    if (validate() === true) {
      setIsAuthenticating(true)
      try {
        const token = await authenticate(formData.email, formData.password)
        login(token, formData.email)
      } catch (err) {
        Alert.alert(
          'Authentication failed',
          'Could not log you in. Please check your credentials and try again!',
        )
      }
      setIsAuthenticating(false)
    }
  }

  if (isAuthenticating) {
    return (
      <Center w="100%" h="100%">
        <Box safeArea p="2" w="90%" py="8">
          <HStack space={2} justifyContent="center" alignItems="center">
            <Spinner />
            <Heading color="coolGray.600" fontSize="md">
              Logging in...
            </Heading>
          </HStack>
        </Box>
      </Center>
    )
  }

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
          Welcome
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: 'warmGray.200',
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign in to continue!
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
            <Link
              _text={{
                fontSize: 'xs',
                fontWeight: '500',
                color: 'indigo.500',
              }}
              alignSelf="flex-end"
              mt="1"
              onPress={onForgetPassword}
            >
              Forget Password?
            </Link>
          </FormControl>
          <Button mt="2" colorScheme="blue" onPress={onSubmit}>
            Sign in
          </Button>
          <Button mt="2" colorScheme="blue">
            Facebook
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
            >
              I'm a new user.{' '}
            </Text>
            <Link
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              onPress={onSignUp}
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  )
}

export default SignIn
