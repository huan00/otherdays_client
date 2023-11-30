import {
  SafeAreaView,
  StyleSheet,
  View,
  Keyboard,
  Platform,
  Dimensions
} from 'react-native'
import { Divider } from 'react-native-elements'
import React, { useState } from 'react'
import StatusLines from '../../components/StatusLines'
import { BACKGROUND_COLOR, ERROR_COLOR } from '../../constants/colors'
import { RFPercentage } from 'react-native-responsive-fontsize'
import CustomInput from '../../components/CustomInput'
import CustomBtn from '../../components/CustomBtn'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useKeyboard } from '@react-native-community/hooks'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import OnboardHeading from '../../components/OnboardHeading'
import { SIGNUP_STEPS } from '../../constants/workoutProgram'
import { RootStackParamList } from '../../types/types'

type OnboardTwoProps = NativeStackScreenProps<RootStackParamList, 'OnboardTwo'>

type data = {
  first_name: string
  last_name: string
  email: string
  password: string
}

const OnboardTwo = ({ navigation }: OnboardTwoProps) => {
  const [errorColor, setErrorColor] = useState<string>('')
  const [name, setName] = useState<{ first_name: string; last_name: string }>({
    first_name: '',
    last_name: ''
  })
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [confirmPassword, setConfirmPassword] = useState<string>()
  const isEmail = (email: string) => {
    return emailRegex.test(email)
  }
  const isKeyboardVisible =
    Platform.OS === 'web' ? undefined : Keyboard.isVisible()
  const keyboardHeight = Platform.OS === 'web' ? undefined : useKeyboard()

  const handleNextPress = () => {
    if (!name.first_name || !name.last_name) {
      setErrorColor(ERROR_COLOR)
      return
    } else {
      setErrorColor('')
    }
    if (!email || !password || !confirmPassword || password != confirmPassword)
      return

    const data: data = {
      first_name: name.first_name,
      last_name: name.last_name,
      email,
      password
    }
    navigation.navigate('OnboardThree', data)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusLines steps={SIGNUP_STEPS} activeStep={0} />
      <OnboardHeading title={'First things first, what should I call you'} />
      <Divider />
      <View style={styles.nameWrapper}>
        <View style={{ width: '50%' }}>
          <CustomInput
            placeholder="First Name"
            onChange={(text) => setName({ ...name, first_name: text })}
            placeholderColor={errorColor ? errorColor : ''}
            value={name.first_name}
          />
        </View>
        <View style={{ width: '50%' }}>
          <CustomInput
            placeholder="Last Name"
            onChange={(text) => setName({ ...name, last_name: text })}
            placeholderColor={errorColor ? errorColor : ''}
            value={name.last_name}
          />
        </View>
      </View>
      <View style={styles.credential}>
        <CustomInput
          placeholder="Email"
          value={email ? email : ''}
          onChange={setEmail}
          inputStyle={email && isEmail(email) ? {} : { color: ERROR_COLOR }}
        />
        <CustomInput
          placeholder="Password"
          password={true}
          value={password ? password : ''}
          onChange={setPassword}
          inputStyle={
            password && confirmPassword && password != confirmPassword
              ? { color: ERROR_COLOR }
              : {}
          }
        />
        <CustomInput
          placeholder="Confirm Password"
          password={true}
          value={confirmPassword ? confirmPassword : ''}
          onChange={setConfirmPassword}
          inputStyle={
            password && confirmPassword && password != confirmPassword
              ? { color: ERROR_COLOR }
              : {}
          }
        />
      </View>
      <View
        style={[
          styles.nextBtn,

          Platform.OS === 'web'
            ? {}
            : isKeyboardVisible && Platform.OS === 'ios'
            ? {
                bottom: keyboardHeight
                  ? keyboardHeight.keyboardHeight + RFPercentage(5)
                  : ''
              }
            : { bottom: RFPercentage(6) }
        ]}
      >
        {name.first_name && name.last_name && (
          <CustomBtn
            icon={
              <FontAwesomeIcon
                icon={faArrowRight}
                size={RFPercentage(3)}
                style={styles.fontArrow}
              />
            }
            onPress={handleNextPress}
            btnStyle={{ width: RFPercentage(7) }}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default OnboardTwo

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    height: Dimensions.get('window').height
  },
  nameWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: RFPercentage(2)
  },
  credential: {
    marginTop: RFPercentage(4)
  },
  nextBtn: {
    position: 'absolute',
    right: 0,
    bottom: 0
  },
  fontArrow: {
    alignSelf: 'center'
  }
})
