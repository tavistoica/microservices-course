export interface IUser {
  email: string
  token: string
}
export type AuthContextType = {
  email: string | undefined
  token: string | undefined
  isAuthenticated: boolean
  login: (token: string, email: string) => void
  logout: () => void
}
