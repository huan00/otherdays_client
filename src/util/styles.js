import { StyleSheet, Dimensions, Platform, Keyboard } from 'react-native'
import { BACKGROUND_COLOR } from '../constants/colors'
import { useKeyboard } from '@react-native-community/hooks'

export const STYLES = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    height: '100%'
  },
  inputText: {}
})
