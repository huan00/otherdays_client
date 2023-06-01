import { NavigationContainer } from '@react-navigation/native'
import Home from './src/screens/Home'
import Login from './src/screens/Login'
import {
  OnboardOne,
  OnboardThree,
  OnboardFour,
  OnboardTwo,
  OnboardFive
} from './src/screens/onboarding'
import { RootStackParamList } from 'NavType'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

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
        <RootStack.Screen name="OnboardOne" component={OnboardOne} />
        <RootStack.Screen name="OnboardTwo" component={OnboardTwo} />
        <RootStack.Screen name="OnboardThree" component={OnboardThree} />
        <RootStack.Screen name="OnboardFour" component={OnboardFour} />
        <RootStack.Screen name="OnboardFive" component={OnboardFive} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}
