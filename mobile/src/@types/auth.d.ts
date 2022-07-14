export interface IUser {
  email: string
  token: string
}
export type AuthContextType = {
  userData: IUSer
  login: (user: IUSer) => void
  logout: () => void
}
