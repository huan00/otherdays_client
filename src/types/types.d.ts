declare module 'NavType' {
  export type RootStackParamList = {
    Home: undefined
    Login
    OnboardOne
    OnboardTwo
    OnboardThree: { name: { firstName: string; lastName: string } }
    OnboardFour: {
      userInfo: {
        firstName: string
        lastName: string
        gender: string
        weight: number
        height: { feet: number; inches: number }
      }
    }
  }
}
