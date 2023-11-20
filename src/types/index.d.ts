export type FormDataType = {
  workoutLevel: string
  workoutTime: string
  workoutEquipment: string
  muscleGroup: string
  workoutGoal: string
}

type ExerciseType = {
  id: number
  body_parts: string[] | string
  name: string
  set_count: number
  reps: number
  weight: number
  rest_time: number
  exercise_type: string
  workout: number
}

type WorkoutType = {
  calories: number
  date: string
  distance: number
  id: number
  notes: string
  user_id: number
  exercises: ExerciseType[]
}

export type UserType = {
  id: number
  email: string
  first_name: string
  last_name: string
  age: number
  gender: string
  weight: number
  profile_image: null
  height: { feet: number; inches: number }
  workoutPreference: [
    { id: number; user: number; preference: [{ id: number; name: string }] }
  ]
  EquipmentsList: [
    { id: number; user: number; equipments: [{ id: number; name: string }] }
  ]
  workoutGoals: [
    {
      id: number
      user: number
      goals: [{ id: number; goal: string }, { id: number; goal: string }]
    }
  ]
  workouts: WorkoutType[]
}
