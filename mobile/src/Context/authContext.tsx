import * as React from 'react'
import { AuthContextType } from '../@types/auth'

export const AuthContext = React.createContext<AuthContextType | null>(null)

interface Props {
  children: React.ReactNode
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authToken, setAuthToken] = React.useState<string | undefined>(
    undefined,
  )
  const [userData, setUserData] = React.useState<string | undefined>(undefined)

  const login = (token: string, email: string) => {
    setAuthToken(token)
    setUserData(email)
  }

  const logout = () => {
    setAuthToken(undefined)
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
