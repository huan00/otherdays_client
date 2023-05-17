import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/screens/Home'
import Login from './src/screens/Login'
import { OnboardOne, OnboardTwo } from './src/screens/onboarding'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ route, navigation }) => ({ headerShown: false })}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={Home} options={{}} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OnboardOne" component={OnboardOne} />
        <Stack.Screen name="OnboardTwo" component={OnboardTwo} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
