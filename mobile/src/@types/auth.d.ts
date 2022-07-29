export interface IUser {
  email: string
  role: string
  id: string
}
export type AuthContextType = {
  userData: IUser | undefined
  token: string | undefined
  isAuthenticated: boolean
  login: (token: string, user: IUser) => void
  logout: () => void
}
