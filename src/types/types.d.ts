declare module 'NavType' {
  export type RootStackParamList = {
    Home: undefined
    Login
    OnboardOne
    OnboardTwo
    OnboardThree: { name: { first_name: string; last_name: string } }
    OnboardFour: {
      userInfo: {
        first_name: string
        last_name: string
        age: number
        sex: string
        weight: number
        height: { feet: number; inches: number }
      }
    }
    OnboardFive: {
      userInfo: {
        first_name: string
        last_name: string
        age: number
        sex: string
        weight: number
        height: { feet: number; inches: number }
        profile_image: string
      }
    }
  }
}

declare module '*.png' {
  const value: any
  export = value
}
