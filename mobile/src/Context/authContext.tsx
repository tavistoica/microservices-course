import * as React from 'react'
import { AuthContextType } from '../@types/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IUser } from '../@types/auth'

export const AuthContext = React.createContext<AuthContextType | null>(null)

interface Props {
  children: React.ReactNode
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authToken, setAuthToken] = React.useState<string | undefined>(
    undefined,
  )
  const [userData, setUserData] = React.useState<IUser | undefined>(undefined)

  React.useEffect(() => {
    const fetchTokenData = async () => {
      const storedToken = await AsyncStorage.getItem('token')
      if (storedToken) {
        setAuthToken(storedToken)
      }
    }

    const fetchUserData = async () => {
      const storedEmail = await AsyncStorage.getItem('email')
      const storedRole = await AsyncStorage.getItem('role')
      const storedId = await AsyncStorage.getItem('id')

      if (storedEmail && storedRole && storedId) {
        setUserData({ email: storedEmail, role: storedRole, id: storedId })
      }
    }

    fetchTokenData()
    fetchUserData()
  }, [])

  const login = (token: string, user: IUser) => {
    setAuthToken(token)
    setUserData({ email: user.email, role: user.role, id: user.id })
    AsyncStorage.setItem('token', token.toString())
    AsyncStorage.setItem('email', user.email.toString())
    AsyncStorage.setItem('role', user.role.toString())
    AsyncStorage.setItem('id', user.id.toString())
  }

  const logout = () => {
    setAuthToken(undefined)
    setUserData(undefined)
    AsyncStorage.removeItem('token')
    AsyncStorage.removeItem('email')
    AsyncStorage.removeItem('role')
    AsyncStorage.removeItem('id')
  }

  const value = {
    token: authToken,
    userData: userData,
    isAuthenticated: !!authToken,
    login: login,
    logout: logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
