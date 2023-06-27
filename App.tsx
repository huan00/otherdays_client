import { NavigationContainer } from '@react-navigation/native'
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
import { RootStackParamList } from 'NavType'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  WorkoutFour,
  WorkoutThree,
  WorkoutTwo,
  Workout
} from './src/screens/workout'
import { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'

const RootStack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
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
      </RootStack.Navigator>
    </NavigationContainer>
  )
}
