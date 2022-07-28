import * as React from 'react'
import { AuthContextType } from '../@types/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = React.createContext<AuthContextType | null>(null)

interface Props {
  children: React.ReactNode
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authToken, setAuthToken] = React.useState<string | undefined>(
    undefined,
  )
  const [userData, setUserData] = React.useState<string | undefined>(undefined)

  React.useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token')
      if (storedToken) {
        setAuthToken(storedToken)
      }
    }
    const fetchEmail = async () => {
      const storedEmail = await AsyncStorage.getItem('email')
      if (storedEmail) {
        setUserData(storedEmail)
      }
    }
    fetchToken()
    fetchEmail()
  }, [])

  const login = (token: string, email: string) => {
    setAuthToken(token)
    setUserData(email)
    AsyncStorage.setItem('token', token.toString())
    AsyncStorage.setItem('email', email.toString())
  }

  const logout = () => {
    setAuthToken(undefined)
    AsyncStorage.removeItem('token')
  }

  const value = {
    token: authToken,
    email: userData,
    isAuthenticated: !!authToken,
    login: login,
    logout: logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
