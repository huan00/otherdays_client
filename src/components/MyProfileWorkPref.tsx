import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useState } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCancel, faCheck, faEdit } from '@fortawesome/free-solid-svg-icons'
import Dropdown from './Dropdown'
import { WORKOUT_PROGRAM } from '../constants/workoutProgram'
import WorkoutPref from './WorkoutPref'
import { OTHERDAY_LIME } from '../constants/colors'
import { updateUserPref, verifyLogin } from '../services'
import * as SecureStore from 'expo-secure-store'
import { useAuth } from '../context/AppContext'

type Props = {
  data: {
    id: number
    user: number
    preference: {
      id: number
      name: string
    }[]
  }[]
}

const MyProfileWorkPref = ({ data }: Props) => {
  const { setUser } = useAuth()
  const [isShow, setIsShow] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [workoutPref, setWorkoutPref] = useState<string[]>(
    data[0]?.preference?.map((item) => {
      return item.name
    })
  )

  const getWorkoutProgram = (program: Array<Object>) => {
    const len = program.length
    const result: string[] = []
    for (const [index, value] of Object.entries(program)) {
      result.push(Object.values(value)[0])
    }
    result.sort()
    result.push('Any')
    return result
  }

  const handleUpdateSelect = (item: string) => {
    if (workoutPref?.includes(item)) {
      const index = workoutPref.indexOf(item)
      console.log(index)
      const tempPref = workoutPref ? [...workoutPref] : []
      tempPref.splice(index, 1)
      setWorkoutPref(tempPref)
    } else {
      const tempPref = workoutPref ? [...workoutPref] : []
      tempPref.push(item)
      setWorkoutPref(tempPref)
    }
  }

  const handleUpdatePref = async () => {
    const resToken =
      Platform.OS === 'web'
        ? localStorage.getItem('fitnessLoginToken')
        : await SecureStore.getItemAsync('fitnessLoginToken')
    const token = resToken?.replace(/"/g, '')

    try {
      await updateUserPref(workoutPref, token)
      setIsEdit(!isEdit)
    } catch (error) {
      setWorkoutPref(
        data[0]?.preference?.map((item) => {
          return item.name
        })
      )
    }
  }

  const checkPref = (item: string) => {
    let result = false
    workoutPref?.forEach((pref) => {
      if (pref.toLowerCase() === item.toLowerCase()) result = true
    })

    return result
  }

  const handleCancel = () => {
    setWorkoutPref(
      data[0]?.preference?.map((item) => {
        return item.name
      })
    )
    setIsEdit(!isEdit)
  }

  return (
    <View
      style={
        {
          // display: isWorkoutPref ? 'flex' : 'none',
          // paddingLeft: RFPercentage(3)
        }
      }
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <TouchableOpacity onPress={() => setIsShow(!isShow)}>
          <Text style={{ color: 'white', fontSize: RFPercentage(2.5) }}>
            Workout Preference
          </Text>
        </TouchableOpacity>
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
            <TouchableOpacity onPress={handleCancel}>
              <FontAwesomeIcon
                icon={faCancel}
                color="white"
                size={RFPercentage(2)}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleUpdatePref}>
              <FontAwesomeIcon
                icon={faCheck}
                color="white"
                size={RFPercentage(2)}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {isShow && (
        <View style={{ paddingLeft: RFPercentage(2.5) }}>
          {!isEdit ? (
            <View>
              {workoutPref?.map((item) => (
                <WorkoutPref
                  key={Math.random()}
                  title={item}
                  onPress={() => {}}
                  style={{
                    container: { borderColor: OTHERDAY_LIME },
                    circle: { backgroundColor: OTHERDAY_LIME }
                  }}
                />
              ))}
            </View>
          ) : (
            <View>
              {getWorkoutProgram(WORKOUT_PROGRAM).map((item) => (
                <WorkoutPref
                  key={Math.random()}
                  title={item}
                  onPress={() => handleUpdateSelect(item)}
                  info={true}
                  style={{
                    container: checkPref(item)
                      ? { borderColor: OTHERDAY_LIME }
                      : undefined,
                    circle: checkPref(item)
                      ? { backgroundColor: OTHERDAY_LIME }
                      : undefined
                  }}
                />
              ))}
              {/* <FlatList
                data={getWorkoutProgram(WORKOUT_PROGRAM)}
                renderItem={({ item }) => (
                  <WorkoutPref
                    title={item}
                    onPress={() => {}}
                    info={true}
                    style={{
                      container: workoutPref.includes(item)
                        ? { borderColor: OTHERDAY_LIME }
                        : undefined,
                      circle: workoutPref.includes(item)
                        ? { backgroundColor: OTHERDAY_LIME }
                        : undefined
                    }}
                  />
                )}
              /> */}
            </View>
          )}
        </View>
      )}
    </View>
  )
}

export default MyProfileWorkPref

const styles = StyleSheet.create({})
