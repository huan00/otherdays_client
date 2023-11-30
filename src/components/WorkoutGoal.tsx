import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useState } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { STYLES } from '../util/styles'
import { useAuth } from '../context/AppContext'
import Label from './Label'
import WorkoutPref from './WorkoutPref'
import { OTHERDAY_LIME } from '../constants/colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCancel, faCheck, faEdit } from '@fortawesome/free-solid-svg-icons'
import { WORKOUT_GOAL } from '../constants/workoutProgram'
import { updateUserWorkoutGoal } from '../services'
import * as SecureStore from 'expo-secure-store'

const WorkoutGoal = () => {
  const { user } = useAuth()
  const [isShow, setIsShow] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [workoutGoals, setWorkoutGoals] = useState<string[] | undefined>(
    user?.workoutGoals[0].goals.map((item) => {
      return item.goal
    })
  )

  const checkGoalInList = (goal: string) => {
    let result = false
    workoutGoals?.forEach((item) => {
      if (item.toLowerCase() === goal.toLowerCase()) {
        result = true
      }
    })
    return result
  }

  const handleEditSelect = (item: string) => {
    if (workoutGoals?.includes(item)) {
      const index = workoutGoals.indexOf(item)
      const tempWorkoutGoals = [...workoutGoals]
      tempWorkoutGoals.splice(index, 1)
      setWorkoutGoals(tempWorkoutGoals)
    } else {
      if (workoutGoals) {
        const tempWorkoutGoals = [...workoutGoals]
        tempWorkoutGoals.push(item)
        setWorkoutGoals(tempWorkoutGoals)
      }
    }
  }

  const handleUpdate = async () => {
    const resToken =
      Platform.OS === 'web'
        ? localStorage.getItem('fitnessLoginToken')
        : await SecureStore.getItemAsync('fitnessLoginToken')
    const token = resToken?.replace(/"/g, '')

    await updateUserWorkoutGoal(workoutGoals, token)

    setIsEdit(!isEdit)
  }

  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <View>
          <Text
            style={[STYLES.whiteText, styles.headerText]}
            onPress={() => setIsShow(!isShow)}
          >
            Workout Goals
          </Text>
        </View>
        <View>
          {isShow && !isEdit && (
            <TouchableOpacity onPress={() => setIsEdit(!isEdit)}>
              <FontAwesomeIcon
                icon={faEdit}
                color="white"
                size={RFPercentage(2)}
              />
            </TouchableOpacity>
          )}
          {isShow && isEdit && (
            <View style={{ flexDirection: 'row', gap: RFPercentage(2) }}>
              <TouchableOpacity onPress={() => setIsEdit(!isEdit)}>
                <FontAwesomeIcon
                  icon={faCancel}
                  color="white"
                  size={RFPercentage(2)}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleUpdate}>
                <FontAwesomeIcon
                  icon={faCheck}
                  color="white"
                  size={RFPercentage(2)}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <View
        style={{
          display: isShow ? 'flex' : 'none',
          paddingLeft: RFPercentage(3)
        }}
      >
        {isShow &&
          (!isEdit
            ? workoutGoals?.map((item: string, index: number) => (
                <WorkoutPref
                  title={item}
                  onPress={() => {}}
                  key={Math.random()}
                  style={{
                    container: checkGoalInList(item)
                      ? { borderColor: OTHERDAY_LIME }
                      : undefined,
                    circle: checkGoalInList(item)
                      ? { backgroundColor: OTHERDAY_LIME }
                      : undefined
                  }}
                />
              ))
            : WORKOUT_GOAL.map((item) => (
                <WorkoutPref
                  title={item}
                  onPress={() => handleEditSelect(item)}
                  style={{
                    container: checkGoalInList(item)
                      ? { borderColor: OTHERDAY_LIME }
                      : undefined,
                    circle: checkGoalInList(item)
                      ? { backgroundColor: OTHERDAY_LIME }
                      : undefined
                  }}
                />
              )))}
      </View>
    </View>
  )
}

export default WorkoutGoal

const styles = StyleSheet.create({
  headerText: {
    fontSize: RFPercentage(2.5)
  }
})
