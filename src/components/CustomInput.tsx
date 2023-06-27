import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native'
import React, { useState } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { STATUSLINE_COLOR, TEXT_COLOR_WHITE } from '../constants/colors'

type InputProps = {
  label?: string
  placeholder: string
  placeholderColor?: string
  value: string
  password?: boolean | false
  onChange: (text: string) => void
  onBlur?: () => void
  keyboardType?: any
  inputStyle?: object
}

const CustomInput = ({
  label,
  placeholder,
  placeholderColor,
  value,
  password,
  keyboardType,
  inputStyle,
  onChange,
  onBlur
}: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(true)

  const handleOnPress = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, inputStyle]}
          keyboardType={keyboardType}
          placeholderTextColor={
            placeholderColor ? placeholderColor : STATUSLINE_COLOR
          }
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          secureTextEntry={password ? showPassword : false}
          autoCapitalize="none"
          onBlur={onBlur}
        />
        {password && (
          <TouchableOpacity onPress={handleOnPress}>
            <FontAwesomeIcon
              icon={faEyeSlash}
              color={TEXT_COLOR_WHITE}
              style={styles.faEyeSlash}
              size={RFPercentage(2)}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomWidth: RFPercentage(0.1),
    borderColor: STATUSLINE_COLOR
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    fontSize: RFPercentage(2),
    paddingVertical: RFPercentage(1),
    color: TEXT_COLOR_WHITE
  },
  faEyeSlash: {
    flex: 1,
    marginLeft: RFPercentage(1)
  }
})
