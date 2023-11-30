import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import React, { useState } from 'react'
import { STYLES } from '../../util/styles'
import StatusLines from '../../components/StatusLines'
import { SIGNUP_STEPS, WORKOUT_GOAL } from '../../constants/workoutProgram'
import OnboardHeading from '../../components/OnboardHeading'
import { Divider } from 'react-native-elements'
import WorkoutPref from '../../components/WorkoutPref'
import { OTHERDAY_LIME } from '../../constants/colors'
import CustomBtn from '../../components/CustomBtn'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { BASEURL } from '../../services'
import axios from 'axios'
import { RootStackParamList } from '../../types/types'
import { useAuth } from '../../context/AppContext'

type OnboardSevenProps = NativeStackScreenProps<
  RootStackParamList,
  'OnboardSeven'
>

const OnboardSeven = ({ route, navigation }: OnboardSevenProps) => {
  const [workoutGoal, setWorkoutGoal] = useState<string[]>([])
  const { user, setUser } = useAuth()

  const handleSelect = (goal: string) => {
    const currentList = new Set(workoutGoal)

    if (currentList.has(goal)) {
      currentList.delete(goal)
    } else {
      currentList.add(goal)
    }

    setWorkoutGoal([...currentList])
  }

  const handleNextPress = async () => {
    const data = { ...route.params, workout_goal: workoutGoal }
    const formData: any = new FormData()

    for (const [key, value] of Object.entries(data)) {
      if (key === 'height') {
        formData.append(key, JSON.stringify(value))
      } else if (key === 'profile_image') {
        if (Platform.OS === 'web') {
        } else {
          formData.append(key, {
            uri: value,
            name: 'profile_image.jpg',
            type: 'image/jpg'
          })
        }
      } else {
        formData.append(key, value)
      }
    }

    // const options = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'multipart/form-data' },
    //   body: formData
    // }

    const res = await axios
      .post(`${BASEURL}/fitness/register`, formData)
      .then((res) => {
        console.log('successful')
        setUser(res.data)
      })
      .catch((err) => console.log(err))

    navigation.navigate('Login')
  }

  return (
    <SafeAreaView style={STYLES.container}>
      <StatusLines steps={SIGNUP_STEPS} activeStep={6} />
      <OnboardHeading title="Last thing, what are your current fitness goals?" />
      <Divider style={{ marginBottom: RFPercentage(1) }} />
      <View style={styles.listWrapper}>
        <FlatList
          data={WORKOUT_GOAL}
          renderItem={({ item }) => (
            <WorkoutPref
              title={item}
              onPress={handleSelect}
              style={{
                container: workoutGoal.includes(item)
                  ? { borderColor: OTHERDAY_LIME }
                  : undefined,
                circle: workoutGoal.includes(item)
                  ? { backgroundColor: OTHERDAY_LIME }
                  : undefined
              }}
            />
          )}
        />
      </View>
      <View style={styles.nextBtn}>
        <CustomBtn title="Finish" onPress={handleNextPress} />
      </View>
    </SafeAreaView>
  )
}

export default OnboardSeven

const styles = StyleSheet.create({
  listWrapper: {
    height: RFPercentage(55)
  },
  nextBtn: {
    width: '100%',
    position: 'absolute',
    bottom: RFPercentage(4),
    justifyContent: 'center',
    alignItems: 'center'
  }
})
