import { StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import React, { useState } from 'react'
import CustomBtn from '../../components/CustomBtn'
import {
  BACKGROUND_COLOR,
  OTHERDAY_LIME,
  TEXT_COLOR
} from '../../constants/colors'
import { RootStackParamList } from 'NavType'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

type OnboardProps = NativeStackScreenProps<RootStackParamList, 'OnboardOne'>

const OnboardOne = ({ navigation }: OnboardProps) => {
  const handleNext = () => {
    navigation.navigate('OnboardTwo')
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.circle} />
          <View>
            <View style={styles.textBox}>
              <Text style={styles.chatStyle}>
                Welcome to Other Days, your wellness assistant from here on out.
                Other Days will grow with you and adjust what you need to do
                over time
              </Text>
            </View>
            <View style={styles.textBox}>
              <Text style={styles.chatStyle}>Let’s get started!</Text>
            </View>
          </View>
        </View>
        <View style={styles.nextBtn}>
          <CustomBtn title="Let's go" onPress={handleNext} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default OnboardOne

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
    backgroundColor: BACKGROUND_COLOR,
    paddingHorizontal: RFPercentage(1),
    paddingTop: RFPercentage(4)
  },
  content: {
    flexDirection: 'row',
    width: WIDTH,
    overflow: 'hidden'
  },
  circle: {
    width: RFPercentage(3),
    aspectRatio: 1 / 1,
    backgroundColor: OTHERDAY_LIME,
    borderRadius: 50,
    marginRight: RFPercentage(1)
  },
  textBox: {
    width: '90%',
    borderRadius: 10,
    marginBottom: RFPercentage(1),
    alignItems: 'flex-start'
  },
  chatStyle: {
    width: 'auto',
    color: TEXT_COLOR,
    padding: RFPercentage(1),
    backgroundColor: '#282828',
    borderRadius: 10,
    overflow: 'hidden'
  },
  nextBtn: {
    marginBottom: RFPercentage(9)
  }
})
