import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ExerciseType, WorkoutType } from '../types'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Divider } from 'react-native-elements'

type Props = {
  data: WorkoutType[]
}

const WorkoutHistory = ({ data }: Props) => {
  const [isPressed, setIsPress] = useState<number[]>([])
  console.log(data)

  const filterExerciseType = (exercise_data: ExerciseType[], type: string) => {
    const result = exercise_data.filter((exercise) => {
      if (exercise.exercise_type === type) return exercise
    })
    return result
  }

  const handleOnPress = (index: number) => {
    if (isPressed.includes(index)) {
      const idx = isPressed.indexOf(index)
      const temp = [...isPressed]
      temp.splice(idx, 1)
      setIsPress(temp)
    } else {
      const temp: number[] = [...isPressed]
      temp.push(index)
      setIsPress(temp)
    }
  }

  return (
    <View
      style={{
        marginHorizontal: RFPercentage(2),
        marginVertical: RFPercentage(1)
      }}
    >
      <View
        style={{
          marginVertical: RFPercentage(0.5)
        }}
      >
        {data.map((workout, index) => (
          <View key={Math.random() + workout.date}>
            <Text
              style={{ color: 'white', marginVertical: RFPercentage(0.5) }}
              onPress={() => handleOnPress(index)}
            >
              {workout.date}
            </Text>

            <View
              style={[
                {
                  paddingLeft: RFPercentage(2),
                  display: isPressed.includes(index) ? 'flex' : 'none'
                }
              ]}
            >
              {workout.exercises.length > 0 ? (
                <View>
                  <View>
                    <Text style={styles.textWhite}>Warm-up</Text>
                    <Divider />

                    {filterExerciseType(workout.exercises, 'warmup').map(
                      (exercise) => (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                          }}
                          key={Math.random()}
                        >
                          <Text style={[styles.textWhite, { flex: 1 }]}>
                            {exercise.name}
                          </Text>
                          <Text
                            style={[
                              styles.textWhite,
                              { flex: 1, textAlign: 'center' }
                            ]}
                          >
                            {exercise.reps > 0
                              ? `Reps: ${exercise.reps}`
                              : 'Time: 0'}
                          </Text>
                          <Text
                            style={[
                              styles.textWhite,
                              { flex: 1, textAlign: 'right' }
                            ]}
                          >
                            Set: {exercise.set_count}
                          </Text>
                        </View>
                      )
                    )}
                  </View>
                  <View style={{ marginVertical: RFPercentage(2) }}>
                    <Text style={styles.textWhite}>Workout</Text>
                    <Divider />

                    {filterExerciseType(workout.exercises, 'workout').map(
                      (exercise) => (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                          }}
                          key={Math.random()}
                        >
                          <Text style={[styles.textWhite, { flex: 1 }]}>
                            {exercise.name}
                          </Text>
                          <Text
                            style={[
                              styles.textWhite,
                              { flex: 1, textAlign: 'center' }
                            ]}
                          >
                            Reps: {exercise.reps}
                          </Text>
                          <Text
                            style={[
                              styles.textWhite,
                              { flex: 1, textAlign: 'right' }
                            ]}
                          >
                            Set: {exercise.set_count}
                          </Text>
                        </View>
                      )
                    )}
                  </View>
                  <View>
                    <Text style={styles.textWhite}>cooldown</Text>
                    <Divider />
                    {filterExerciseType(workout.exercises, 'cooldown').map(
                      (exercise) => (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                          }}
                          key={Math.random()}
                        >
                          <Text style={[styles.textWhite, { flex: 1 }]}>
                            {exercise.name}
                          </Text>
                          <Text
                            style={[
                              styles.textWhite,
                              { flex: 1, textAlign: 'center' }
                            ]}
                          >
                            Reps: {exercise.reps}
                          </Text>
                          <Text
                            style={[
                              styles.textWhite,
                              { flex: 1, textAlign: 'right' }
                            ]}
                          >
                            Set: {exercise.set_count}
                          </Text>
                        </View>
                      )
                    )}
                  </View>
                </View>
              ) : (
                <Text style={{ color: 'white' }}>No exercise history</Text>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

export default WorkoutHistory

const styles = StyleSheet.create({
  textWhite: {
    color: 'white'
  }
})
