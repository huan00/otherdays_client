import { StyleSheet, Dimensions, Platform, Keyboard } from 'react-native'
import { BACKGROUND_COLOR } from '../constants/colors'
import { useKeyboard } from '@react-native-community/hooks'
import { RFPercentage } from 'react-native-responsive-fontsize'

export const STYLES = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    height: '100%'
  },
  inputText: {},
  grayText: {
    fontSize: RFPercentage(2),
    color: '#737373'
  },
  standardText: {},
  nextBtn: {
    width: '100%',
    position: 'absolute',
    bottom: RFPercentage(4),
    justifyContent: 'center',
    alignItems: 'center'
  }
})
