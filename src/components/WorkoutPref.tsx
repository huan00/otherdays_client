import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { TEXT_COLOR } from '../constants/colors'
import { OTHERDAY_LIME } from '../constants/colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { CheckBox } from 'react-native-elements'

interface workoutProps {
  title: string
  onPress: (title: string) => void
  style?: { container?: {}; circle?: {} }
  checkBox?: boolean
  checked?: boolean
  info?: boolean
}

const WorkoutPref = ({
  title,
  onPress,
  style,
  checkBox,
  checked,
  info
}: workoutProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, style?.container]}
      onPress={() => onPress(title)}
    >
      <View style={styles.titleWrapper}>
        {checkBox ? (
          <CheckBox
            checked={checked}
            disabled={true}
            checkedColor={OTHERDAY_LIME}
            checkedIcon={
              <FontAwesomeIcon icon={faCheck} color={OTHERDAY_LIME} />
            }
          />
        ) : (
          <View style={[styles.circle, style?.circle]} />
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableOpacity style={styles.info}>
        {info && <FontAwesomeIcon icon={faInfoCircle} color="#fff" />}
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default WorkoutPref

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: RFPercentage(6),

    borderColor: '#555555',
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: RFPercentage(1),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: RFPercentage(1),
    marginVertical: RFPercentage(1)
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  circle: {
    borderRadius: RFPercentage(50),
    backgroundColor: '#555555',
    width: RFPercentage(2),
    aspectRatio: 1 / 1,
    marginRight: RFPercentage(1)
  },
  title: {
    color: TEXT_COLOR
  },
  info: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
