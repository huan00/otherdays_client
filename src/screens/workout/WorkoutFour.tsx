import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { STYLES } from '../../util/styles'
import OnboardHeading from '../../components/OnboardHeading'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Divider } from 'react-native-elements'
import WorkoutDisplay from '../../components/WorkoutDisplay'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from 'NavType'
import { OTHERDAY_LIME } from '../../constants/colors'
import CustomBtn from '../../components/CustomBtn'

type WorkoutFourProps = NativeStackScreenProps<
  RootStackParamList,
  'WorkoutFour'
>

const WorkoutFour = ({ navigation, route }: WorkoutFourProps) => {
  const getDateFormat = (workoutDate: string): string => {
    const date = new Date()
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' })
    const day = date.getDate()
    const month = date.toLocaleDateString('en-US', { month: 'long' })

    return dayOfWeek
  }
  return (
    <SafeAreaView style={STYLES.container}>
      <View style={styles.backBtn}>
        <FontAwesomeIcon icon={faArrowLeft} color="white" />
      </View>
      <Divider />
      <OnboardHeading title="Nice work. You're getting stronger, keep it up." />

      <View style={styles.resultWrapper}>
        <View style={styles.time}>
          <Text style={styles.resultText}>Time</Text>
          <Text style={styles.resultText}>{route.params.time}</Text>
        </View>
        {/* <View style={styles.calories}>
          <Text style={styles.resultText}>Calories</Text>
          <Text style={styles.resultText}>340</Text>
        </View> */}
      </View>

      <View>
        <Text>Workout</Text>
        <View style={{ height: 400 }}>
          <ScrollView>
            <WorkoutDisplay
              workoutData={route.params.workout}
              workoutTitle="Warmup"
              completed={true}
            />
            <WorkoutDisplay
              workoutData={route.params.workout}
              workoutTitle="Workout"
              completed={true}
            />

            <WorkoutDisplay
              workoutData={route.params.cooldown}
              workoutTitle="Cooldown"
              completed={true}
            />
          </ScrollView>
        </View>

        <View>
          <Text
            style={[
              {
                // backgroundColor: OTHERDAY_LIME,
                color: 'white',
                fontSize: RFPercentage(2.3)
              }
            ]}
          >
            {getDateFormat(route.params.date)}
          </Text>
          <Text
            style={[
              {
                // backgroundColor: OTHERDAY_LIME,
                color: '#000',
                fontSize: RFPercentage(2.3)
              }
            ]}
          >
            {/* Strength Training Helps to build muscle strength and endurance.
            Improve your posture, reduce your risk of injuries, and make it
            easier to perform everyday tasks. */}
          </Text>
        </View>
        {/* <View style={styles.btnWrapper}> */}

        {/* </View> */}
      </View>
      <CustomBtn
        title="Home"
        onPress={() => {
          navigation.navigate('Home')
        }}
        btnStyle={{ position: 'absolute', bottom: 0 }}
      />
    </SafeAreaView>
  )
}

export default WorkoutFour

const styles = StyleSheet.create({
  backBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    left: RFPercentage(2),
    width: RFPercentage(4),
    aspectRatio: 1 / 1,
    borderRadius: RFPercentage(50),
    backgroundColor: '#262626',
    marginBottom: RFPercentage(2)
  },
  resultWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  resultText: {
    color: OTHERDAY_LIME,
    fontSize: RFPercentage(3),
    paddingHorizontal: RFPercentage(1)
  },
  time: {
    flex: 1
  },
  calories: {
    alignItems: 'flex-start',
    flex: 1
  },
  btnWrapper: {
    position: 'absolute',
    bottom: 0
  }
})
