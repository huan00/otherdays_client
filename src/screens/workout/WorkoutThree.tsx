import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native'
import React, { useState } from 'react'
import Timer from '../../components/Timer'
import CustomBtn from '../../components/CustomBtn'
import { STYLES } from '../../util/styles'
import OnboardHeading from '../../components/OnboardHeading'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Divider } from 'react-native-elements'
import { OTHERDAY_LIME } from '../../constants/colors'
import * as SecureStore from 'expo-secure-store'

import WorkoutDisplay from '../../components/WorkoutDisplay'
import {
  NavigationProp,
  ParamListBase,
  RouteProp
} from '@react-navigation/native'
import { WorkoutTwoScreen } from '../../types/types'
import axios from 'axios'
import { BASEURL } from '../../services'

type Props = {
  navigation: NavigationProp<ParamListBase>
  route: RouteProp<{ WorkoutThree: WorkoutTwoScreen }, 'WorkoutThree'>
}

const WorkoutThree = ({ navigation, route }: Props) => {
  const [time, setTime] = useState<string>('0:00')
  const handleFinish = async () => {
    // sent work out to the back
    const token =
      Platform.OS === 'web'
        ? localStorage.getItem('fitnessLoginToken')
        : await SecureStore.getItemAsync('fitnessLoginToken')

    const workout_data = {
      workout_form: {
        user: route?.params?.user?.id,
        date: route.params.date,
        calories: 0,
        distance: 0,
        notes: route.params.prompt.muscleGroup
      },
      exercises: {
        warmup: route.params.warmup,
        workout: route.params.workout,
        cooldown: route.params.cooldown
      }
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `token ` + token?.replace(/"/g, '')
    }

    const res = await axios.post(
      `${BASEURL}/fitness/saveworkout`,
      JSON.stringify(workout_data),
      {
        headers
      }
    )

    navigation.navigate('WorkoutFour', { ...route.params, time })
  }

  return (
    <SafeAreaView style={STYLES.container}>
      <OnboardHeading title="Timer" textStyle={{ fontSize: RFPercentage(2) }} />
      <Divider />
      <Timer setTime={setTime} />
      <Divider />
      <View style={{ height: '70%' }}>
        <ScrollView>
          <WorkoutDisplay
            workoutData={route.params.warmup}
            workoutTitle="Warm up"
          />

          <WorkoutDisplay
            workoutData={route.params.workout}
            workoutTitle="Workout"
          />

          <WorkoutDisplay
            workoutData={route.params.cooldown}
            workoutTitle="Cooldown"
          />
        </ScrollView>
      </View>

      <View style={styles.finishBtn}>
        <CustomBtn title="Finish" onPress={handleFinish} />
      </View>
    </SafeAreaView>
  )
}

export default WorkoutThree

const styles = StyleSheet.create({
  exerciseWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'left',
    height: RFPercentage(5),
    borderBottomColor: '#373737',
    borderWidth: 1
  },
  repWrapper: {
    flex: 1
  },
  exerciseNameWrapper: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between'
    // borderColor: 'red',
    // borderWidth: 1
  },
  exerciseText: {
    color: 'white',
    textAlign: 'left',
    fontSize: RFPercentage(1.8)
  },
  finishBtn: {
    position: 'absolute',
    bottom: RFPercentage(5),
    alignSelf: 'center'
  },
  completedTextColor: {
    color: OTHERDAY_LIME
  }
})
