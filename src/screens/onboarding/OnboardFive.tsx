import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Keyboard,
  Image,
  Platform,
  FlatList
} from 'react-native'
import React, { useState } from 'react'
import StatusLines from '../../components/StatusLines'
import { STYLES } from '../../util/styles'
import OnboardHeading from '../../components/OnboardHeading'
import { Divider } from 'react-native-elements'

import CustomBtn from '../../components/CustomBtn'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { useKeyboard } from '@react-native-community/hooks'
import { OTHERDAY_LIME } from '../../constants/colors'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from 'NavType'
import { SIGNUP_STEPS, WORKOUT_PROGRAM } from '../../constants/workoutProgram'
import WorkoutPref from '../../components/WorkoutPref'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

type OnboardFiveProps = NativeStackScreenProps<
  RootStackParamList,
  'OnboardFive'
>

const OnboardFive = ({ route, navigation }: OnboardFiveProps) => {
  const isKeyboardVisible = Keyboard.isVisible()
  const keyboardHeight = useKeyboard()

  const [workoutPref, setWorkoutPref] = useState<string[]>([])

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

  const setPref = (title: string) => {
    const workoutPrefList = new Set(workoutPref)

    if (workoutPrefList.has(title)) {
      workoutPrefList.delete(title)
    } else {
      workoutPrefList.add(title)
    }

    const result = [...workoutPrefList]

    setWorkoutPref(result)
  }

  const handleNextPress = () => {
    if (!workoutPref) return

    const data = { ...route.params, workout_program: workoutPref }

    navigation.navigate('OnboardSix', data)
  }

  return (
    <SafeAreaView style={[STYLES.container, styles.container]}>
      <StatusLines steps={SIGNUP_STEPS} activeStep={4} />
      <OnboardHeading title="Tell me some of your workout preferences" />
      <Divider style={{ marginBottom: RFPercentage(1) }} />
      <View style={styles.listWrapper}>
        <FlatList
          data={getWorkoutProgram(WORKOUT_PROGRAM)}
          renderItem={({ item }) => (
            <WorkoutPref
              title={item}
              onPress={setPref}
              style={
                workoutPref.includes(item) ? { borderColor: OTHERDAY_LIME } : ''
              }
            />
          )}
        />
      </View>

      <View
        style={[
          styles.nextBtn,
          isKeyboardVisible && Platform.OS === 'ios'
            ? { bottom: keyboardHeight.keyboardHeight + RFPercentage(5) }
            : styles.androidKeyboard
        ]}
      >
        <CustomBtn
          title="Next"
          icon={<FontAwesomeIcon icon={faArrowRight} />}
          onPress={handleNextPress}
        />
      </View>
    </SafeAreaView>
  )
}

export default OnboardFive

const styles = StyleSheet.create({
  container: {
    // height: '100%'
  },
  listWrapper: {
    height: RFPercentage(55)
  },
  nextBtn: {
    width: '100%',
    position: 'absolute',
    bottom: RFPercentage(4),
    justifyContent: 'center',
    alignItems: 'center'
  },
  androidKeyboard: {
    bottom: RFPercentage(6)
  }
})
