import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import React from 'react'
import { TEXT_COLOR_WHITE, OTHERDAY_LIME } from '../constants/colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

type CustomProps = {
  title?: string
  bgColor?: string
  textColor?: string
  btnStyle?: object
  icon?: JSX.Element
  onPress: () => void
}

const CustomBtn = ({
  title,
  bgColor,
  textColor,
  btnStyle,
  icon,
  onPress
}: CustomProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: bgColor ? bgColor : OTHERDAY_LIME },
        btnStyle
      ]}
    >
      <View style={styles.titleWrapper}>
        {title && (
          <Text style={[styles.title, { color: textColor }]}>{title}</Text>
        )}
        {icon && <>{icon}</>}
      </View>
    </TouchableOpacity>
  )
}

export default CustomBtn

const styles = StyleSheet.create({
  container: {
    width: WIDTH * 0.9,
    height: HEIGHT * 0.05,

    alignSelf: 'center',
    borderRadius: 50,
    alignContent: 'center',
    justifyContent: 'center'
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: RFPercentage(1.5),
    lineHeight: RFPercentage(1.8),
    fontStyle: 'normal',
    fontWeight: '500'
  }
})
