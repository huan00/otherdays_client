import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Dimensions
} from 'react-native'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { STYLES } from '../../util/styles'
import { RFPercentage } from 'react-native-responsive-fontsize'
import CustomBtn from '../../components/CustomBtn'
import {
  NavigationProp,
  ParamListBase,
  RouteProp
} from '@react-navigation/native'

import { WorkoutTwoScreen } from '../../types/types'

type Props = {
  navigation: NavigationProp<ParamListBase>
  route: RouteProp<{ WorkoutTwo: WorkoutTwoScreen }, 'WorkoutTwo'>
}
const HEIGHT = Dimensions.get('window').height

const WorkoutTwo = ({ navigation, route }: Props) => {
  const [workout, setWorkout] = useState<WorkoutTwoScreen>(route.params)

  const mapList = (
    dataList: [
      {
        name: string
        rep: number
        set: number
        rest_duration: number
        duration: number
      }
    ]
  ) => {
    return (
      <View
        style={{
          borderWidth: 1,
          borderBottomColor: '#373737',
          paddingBottom: RFPercentage(1)
        }}
      >
        {dataList.map((item, index) => (
          <View style={{ flexDirection: 'row' }} key={index}>
            {item.rep ? (
              <Text style={STYLES.grayText}>Rep: {item.rep} | </Text>
            ) : (
              <Text style={STYLES.grayText}>Time: {item.duration} sec | </Text>
            )}
            <Text style={STYLES.grayText}>{item.name}</Text>
          </View>
        ))}
      </View>
    )
  }

  const handleStartWorkout = () => {
    navigation.navigate('WorkoutThree', workout)
  }

  return (
    <SafeAreaView style={[STYLES.container, { height: '100%' }]}>
      <ScrollView>
        <View style={{ height: HEIGHT * 0.6 }}>
          <ImageBackground
            style={styles.backgroundImage}
            source={require('../../../assets/fitness_bg.png')}
          >
            <View style={styles.backBtn}>
              <FontAwesomeIcon icon={faArrowLeft} color="white" />
            </View>
            <View style={styles.workoutPrompt}>
              <Text style={styles.promptTextHeader}>Workout</Text>
              <Text style={styles.promptText}>
                A {route.params.prompt.workoutLevel.toLowerCase()}{' '}
                {route.params.prompt.muscleGroup.toLowerCase()} workout that
                focuses on {route.params.prompt.workoutGoal.toLowerCase()} for{' '}
                {route.params.prompt.workoutTime.toLowerCase()} with{' '}
                {route.params.prompt.workoutEquipment.toLowerCase()}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.bottomContent}>
          <View style={styles.exerciseWrapper}>
            <Text style={STYLES.grayText}>
              Warm up- {workout.warmup[0].set} set
            </Text>
            {mapList(workout.warmup)}
          </View>

          <View>
            <Text style={STYLES.grayText}>
              workout- {workout.workout[0].set} sets
            </Text>
            {mapList(workout.workout)}
          </View>

          <View>
            <Text style={STYLES.grayText}>
              cooldown- {workout.cooldown[0].set} set
            </Text>
            {mapList(workout.cooldown)}
          </View>
        </View>
      </ScrollView>
      <CustomBtn title="Start Workout" onPress={handleStartWorkout} />
    </SafeAreaView>
  )
}

export default WorkoutTwo

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  },
  topContent: {
    height: '60%'
  },
  backBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: RFPercentage(2),
    width: RFPercentage(4),
    aspectRatio: 1 / 1,
    borderRadius: RFPercentage(50),
    backgroundColor: '#262626'
  },
  workoutPrompt: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    paddingHorizontal: RFPercentage(1),
    paddingBottom: RFPercentage(2)
  },
  promptTextHeader: {
    fontSize: RFPercentage(1.5),
    color: 'white'
  },
  promptText: {
    fontSize: RFPercentage(3),
    color: 'white',
    lineHeight: RFPercentage(4)
  },
  bottomContent: {
    flex: 1,
    paddingTop: RFPercentage(3)
  },
  bottomHeader: {
    paddingBottom: RFPercentage(1),
    borderBottomWidth: 1,
    borderBottomColor: '#373737'
  },
  exerciseWrapper: {
    paddingTop: RFPercentage(1)
  }
})
