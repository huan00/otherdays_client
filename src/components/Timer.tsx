import { StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'

type TimerProps = {
  startTimer?: boolean
  pauseCount?: boolean
  setTime: Dispatch<SetStateAction<string>>
}

const Timer = ({ setTime }: TimerProps) => {
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
      setTime(
        `${hourCount < 0 ? hourCount : '00'}:${
          minCount > 9 ? minCount : '0' + minCount
        }:${secondCount > 9 ? secondCount : '0' + secondCount}`
      )
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
