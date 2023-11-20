import { NavigationContainer, ParamListBase } from '@react-navigation/native'
import Home from './src/screens/Home'
import Login from './src/screens/Login'
import {
  OnboardOne,
  OnboardThree,
  OnboardFour,
  OnboardTwo,
  OnboardFive,
  OnboardSix,
  OnboardSeven
} from './src/screens/onboarding'
import { RootStackParamList } from './src/types/types'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  WorkoutFour,
  WorkoutThree,
  WorkoutTwo,
  Workout
} from './src/screens/workout'
import * as SecureStore from 'expo-secure-store'
import { AppProvider } from './src/context/AppContext'

import Profile from './src/screens/Profile'
import { createContext, useEffect, useState } from 'react'
import { UserType } from './src/types'
import { Platform, SafeAreaView } from 'react-native'
import { verifyLogin } from './src/services'

const RootStack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  const [user, setUser] = useState<UserType | undefined>(undefined)
  const UserContext = createContext<UserType | undefined>(undefined)

  useEffect(() => {
    const getToken = async () => {
      const tokenExist =
        Platform.OS === 'web'
          ? localStorage.getItem('fitnessLoginToken')
          : await SecureStore.getItemAsync('fitnessLoginToken')

      const token = tokenExist?.replace(/"/g, '')

      if (token) {
        const res = await verifyLogin(token)
        setUser(res)
      }
    }
    getToken()
  }, [])

  return (
    <AppProvider>
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Home"
        >
          <RootStack.Screen name="Home" component={Home} options={{}} />
          <RootStack.Screen name="Login" component={Login} />

          {/* Onboarding */}
          <RootStack.Screen name="OnboardOne" component={OnboardOne} />
          <RootStack.Screen name="OnboardTwo" component={OnboardTwo} />
          <RootStack.Screen name="OnboardThree" component={OnboardThree} />
          <RootStack.Screen name="OnboardFour" component={OnboardFour} />
          <RootStack.Screen name="OnboardFive" component={OnboardFive} />
          <RootStack.Screen name="OnboardSix" component={OnboardSix} />
          <RootStack.Screen name="OnboardSeven" component={OnboardSeven} />

          {/* Workout */}
          <RootStack.Screen name="Workout" component={Workout} />
          <RootStack.Screen name="WorkoutTwo" component={WorkoutTwo} />
          <RootStack.Screen name="WorkoutThree" component={WorkoutThree} />
          <RootStack.Screen name="WorkoutFour" component={WorkoutFour} />

          {/* Profile */}
          <RootStack.Screen name="Profile" component={Profile} />
        </RootStack.Navigator>
      </NavigationContainer>
    </AppProvider>
  )
}
