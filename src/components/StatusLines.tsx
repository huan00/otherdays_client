import { Dimensions, StyleSheet, View } from 'react-native'
import React from 'react'
import { INACTIVE_COLOR, STATUSLINE_COLOR } from '../constants/colors'
import { RFPercentage } from 'react-native-responsive-fontsize'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

type StatusProps = {
  steps: number
  activeStep?: number
}

const StatusLines = ({ steps, activeStep }: StatusProps) => {
  return (
    <View style={styles.container}>
      {Array.apply(null, Array(steps)).map((_, idx) => (
        <View
          style={[
            styles.line,
            { width: steps > 1 ? WIDTH / (steps + 1) : '100%' },
            {
              backgroundColor:
                activeStep === idx ? STATUSLINE_COLOR : INACTIVE_COLOR
            }
          ]}
          key={idx}
        />
      ))}
    </View>
  )
}

export default StatusLines

const styles = StyleSheet.create({
  container: {
    flex: 0,

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingTop: RFPercentage(10)
  },
  line: {
    height: HEIGHT * 0.001,
    backgroundColor: STATUSLINE_COLOR
  }
})
