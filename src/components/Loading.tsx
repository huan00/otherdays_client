import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'

const Loading = () => {
  const [dots, setDots] = useState<string>('')

  useEffect(() => {
    const interval = setInterval(() => {
      if (dots.length < 3) {
        let temp = dots + '.'
        setDots(temp)
      } else {
        setDots('')
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [dots])

  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Please wait!</Text>
      <Text style={styles.loadingText}>Generating workout!</Text>
      <Text style={styles.loadingText}>Loading{dots}</Text>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',

    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  loadingText: {
    alignSelf: 'center',
    top: '50%',
    color: 'white',
    fontSize: RFPercentage(3)
  }
})
