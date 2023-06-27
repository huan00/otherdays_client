import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'

type timerProps = {
  startTimer: boolean
  pauseCount: boolean
}

const Timer = () => {
  const [hourCount, setHourCount] = useState<number>(0)
  const [minCount, setMinCount] = useState<number>(0)
  const [secondCount, setSecondCount] = useState<number>(0)

  useEffect(() => {
    let interval = setInterval(() => {
      if (secondCount === 59) {
        setSecondCount(0)
        if (minCount === 59) {
          setMinCount(0)
          setHourCount(hourCount + 1)
        } else {
          setMinCount(minCount + 1)
        }
      } else {
        setSecondCount(secondCount + 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [secondCount])
  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>
        {hourCount > 0
          ? hourCount < 10
            ? '0' + hourCount + ':'
            : hourCount + ':'
          : ''}
        {minCount < 10 ? '0' + minCount : minCount}:
        {secondCount < 10 ? '0' + secondCount : secondCount}
      </Text>
    </View>
  )
}

export default Timer

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center'
  },
  timerText: {
    color: 'white',
    fontSize: RFPercentage(6),
    paddingVertical: RFPercentage(2)
  }
})
