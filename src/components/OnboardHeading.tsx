import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TEXT_COLOR } from '../constants/colors'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Divider } from 'react-native-elements'

type props = {
  title: string
}

const OnboardHeading = ({ title }: props) => {
  return (
    <View style={styles.headingWrapper}>
      <Text style={styles.headingText}>{title}</Text>
    </View>
  )
}

export default OnboardHeading

const styles = StyleSheet.create({
  headingWrapper: {
    paddingHorizontal: RFPercentage(1),
    marginVertical: RFPercentage(2)
  },
  headingText: {
    color: TEXT_COLOR,
    fontSize: RFPercentage(4)
  }
})
