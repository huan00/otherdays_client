import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect
} from 'react'
import { UserType } from '../types'

export type UserContextType = {
  user: UserType | undefined
  setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>
}

const AppContext = createContext<UserContextType | undefined>(undefined)

function useAuth(): UserContextType {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AppProvider = (props: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | undefined>(undefined)

  return <AppContext.Provider {...props} value={{ user, setUser }} />
}

export { AppContext, useAuth }
