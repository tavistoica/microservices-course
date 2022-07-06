import * as React from 'react'
import { AuthContextType, IUser } from '../@types/auth'

export const AuthContext = React.createContext<AuthContextType | null>(null)

interface Props {
  children: React.ReactNode
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [userData, setUserData] = React.useState<IUser | undefined>(undefined)

  const login = (user: IUser) => {
    console.log(user.email)
    setUserData(user)
  }

  const logout = () => {
    setUserData(undefined)
  }

  return (
    <AuthContext.Provider value={{ userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
