import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useState } from 'react'
import { STYLES } from '../util/styles'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { OTHERDAY_LIME, TEXT_COLOR_WHITE } from '../constants/colors'

type workoutData = {
  name: string
  rep: number
  set: number
  duration: number
  rest_duration: number
}

type WorkoutDisplayProps = {
  workoutTitle: string
  workoutData: workoutData[]
  completed?: boolean
}

const WorkoutDisplay = ({
  workoutData,
  workoutTitle,
  completed
}: WorkoutDisplayProps) => {
  const [tracker, setTracker] = useState<number[]>(
    [...Array(workoutData.length)].map(() => 0)
  )

  const handlePress = (set: number, index: number) => {
    const temp = [...tracker]

    if (tracker[index] >= set) {
      temp[index] = 0
      setTracker(temp)
    } else {
      temp[index] += 1
      setTracker(temp)
    }
  }

  const renderWorkout = (workoutData: workoutData[]) => {
    return workoutData.map((item, index) => (
      <TouchableOpacity
        style={[styles.exerciseRow]}
        key={index}
        disabled={completed}
        onPress={() => {
          handlePress(item.set, index)
        }}
      >
        <View style={[styles.flexOne]}>
          <Text
            style={[
              styles.textStyle,
              tracker[index] === item.set ? { color: OTHERDAY_LIME } : {}
            ]}
          >
            {item.rep ? `Reps ${item.rep} ` : `${item.duration} sec`}
          </Text>
        </View>
        <View style={[styles.flexOne]}>
          <Text
            style={[
              styles.textStyle,
              styles.exerciseNameText,
              tracker[index] === item.set ? { color: OTHERDAY_LIME } : {}
            ]}
          >
            {item.name}
          </Text>
        </View>
        <View style={[styles.flexOne]}>
          <Text
            style={[
              styles.textStyle,
              { textAlign: 'right' },
              tracker[index] === item.set ? { color: OTHERDAY_LIME } : {}
            ]}
          >
            {completed ? item.set : tracker[index]}
          </Text>
        </View>
      </TouchableOpacity>
    ))
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={STYLES.grayText}>
          {workoutTitle} {workoutData[0].set}{' '}
          {workoutData[0].set > 1 ? 'Sets' : 'Set'}
        </Text>
      </View>
      <View style={styles.tableHeader}>
        <Text style={STYLES.grayText}>Reps/Duration</Text>
        <Text style={STYLES.grayText}>Exercise</Text>
        <Text style={STYLES.grayText}>Set Count</Text>
      </View>
      {renderWorkout(workoutData)}
    </View>
  )
}

export default WorkoutDisplay

const styles = StyleSheet.create({
  container: {
    marginVertical: RFPercentage(1)
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  exerciseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#373737',
    borderBottomWidth: 1,
    paddingVertical: RFPercentage(1)
  },
  exerciseNameText: {
    textAlign: 'left',
    alignSelf: 'flex-start'
  },
  flexOne: {
    flex: 1
  },
  textStyle: {
    color: TEXT_COLOR_WHITE,
    fontSize: RFPercentage(1.8)
  }
})
