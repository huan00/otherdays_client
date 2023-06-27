import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useState } from 'react'
import Timer from '../../components/Timer'
import CustomBtn from '../../components/CustomBtn'
import { STYLES } from '../../util/styles'
import OnboardHeading from '../../components/OnboardHeading'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Divider } from 'react-native-elements'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from 'NavType'
import { OTHERDAY_LIME } from '../../constants/colors'
import WorkoutDisplay from '../../components/WorkoutDisplay'

type WorkoutThreeProps = NativeStackScreenProps<
  RootStackParamList,
  'WorkoutThree'
>

const WorkoutThree = ({ navigation, route }: WorkoutThreeProps) => {
  const handleFinish = () => {
    navigation.navigate('WorkoutFour', route.params)
  }
  return (
    <SafeAreaView style={STYLES.container}>
      <OnboardHeading title="Timer" textStyle={{ fontSize: RFPercentage(2) }} />
      <Divider />
      <Timer />
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
