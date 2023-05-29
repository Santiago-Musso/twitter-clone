import { createContext } from 'react'
import { useUser } from '../hooks/useUser'

export const UserContext = createContext(null)

export function UserProvider({ children }) {

  const user = useUser()

  return (
    <UserContext.Provider value={
      user
    }>
      { children }
    </UserContext.Provider>
  )
}