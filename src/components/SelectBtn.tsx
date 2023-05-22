import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BACKGROUND_COLOR, TEXT_COLOR } from '../constants/colors'
import { RFPercentage } from 'react-native-responsive-fontsize'

type SelectBtnProps = {
  title: string
  onPress: (data: string) => void
  btnStyle?: object
}

const SelectBtn = ({ title, onPress, btnStyle }: SelectBtnProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, btnStyle]}
      onPress={() => onPress(title.toLocaleLowerCase())}
    >
      <Text
        style={[styles.titleText, btnStyle ? { color: BACKGROUND_COLOR } : {}]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default SelectBtn

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: TEXT_COLOR,
    borderRadius: 50,

    paddingHorizontal: RFPercentage(8),
    paddingVertical: RFPercentage(2)
  },
  titleText: {
    color: TEXT_COLOR
  }
})
