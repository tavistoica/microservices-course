import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../Context/authContext'
import { AuthContextType } from '../../@types/auth'

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
} from 'native-base'

const Login = () => {
  const navigation = useNavigation()
  const { login } = useContext(AuthContext) as AuthContextType

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onForgetPassword = React.useCallback(() => {
    navigation.navigate('forgetPassword')
  }, [navigation])

  const onSignUp = React.useCallback(() => {
    navigation.navigate('signUp')
  }, [navigation])

  const onSignIn = React.useCallback(() => {
    login({ email: email, token: password })
  }, [email, login, password])

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
          <FormControl>
            <Input placeholder="Email" value={email} onChangeText={setEmail} />
          </FormControl>
          <FormControl>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
            />
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
          <Button mt="2" colorScheme="blue" onPress={onSignIn}>
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

export default Login
