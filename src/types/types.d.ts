import { UserType } from '.'

interface screenTwo {
  first_name: string
  last_name: string
  email: string
  password: string
}

interface screenThree extends screenTwo {
  age: number
  gender: string
  weight: number
  height: { feet: number; inches: number }
}

interface screenFour extends screenThree {
  profile_image: string | Blob
}

interface screenFive extends screenFour {
  workout_program: string[]
}

interface ScreenSix extends ScreenFive {
  equipment_list: string[]
}

export type WorkoutTwoScreen = {
  date: string
  prompt: {
    workoutLevel: string
    workoutTime: string
    workoutEquipment: string
    muscleGroup: string
    workoutGoal: string
  }
  cooldown: [
    {
      name: string
      rep: number
      set: number
      rest_duration: number
      duration: number
    }
  ]
  workout: [
    {
      name: string
      rep: number
      set: number
      rest_duration: number
      duration: number
    }
    // user: {}
  ]
  warmup: [
    {
      name: string
      rep: number
      set: number
      rest_duration: number
      duration: number
    }
  ]
  user?: UserType
}

type WorkoutThreeScreen = {
  date: string
  cooldown: [
    {
      name: string
      rep: number
      set: number
      rest_duration: number
      duration: number
    }
  ]
  workout: [
    {
      name: string
      rep: number
      set: number
      rest_duration: number
      duration: number
    }
  ]
  warmup: [
    {
      name: string
      rep: number
      set: number
      rest_duration: number
      duration: number
    }
  ]
  time?: string
  user?: UserType
}

export type RootStackParamList = {
  Home: undefined
  Login
  OnboardOne
  OnboardTwo
  OnboardThree: screenTwo
  OnboardFour: screenThree
  OnboardFive: screenFour
  OnboardSix: screenFive
  OnboardSeven: screenSix
  Workout: UserType
  WorkoutTwo: WorkoutTwoScreen
  WorkoutThree: WorkoutTwoScreen
  WorkoutFour: WorkoutThreeScreen
  Profile
  Testing
}

declare module '*.png' {
  const value: any
  export = value
}
