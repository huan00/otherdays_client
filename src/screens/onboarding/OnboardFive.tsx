import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Keyboard,
  Image,
  Platform
} from 'react-native'
import React, { useState } from 'react'
import StatusLines from '../../components/StatusLines'
import { STYLES } from '../../util/styles'
import OnboardHeading from '../../components/OnboardHeading'
import { Divider } from 'react-native-elements'
import CustomInput from '../../components/CustomInput'
import CustomBtn from '../../components/CustomBtn'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { useKeyboard } from '@react-native-community/hooks'
import { ERROR_COLOR } from '../../constants/colors'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from 'NavType'
import BASEURL from '../../services/index'

type OnboardFiveProps = NativeStackScreenProps<
  RootStackParamList,
  'OnboardFive'
>

const OnboardFive = ({ route }: OnboardFiveProps) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [confirmPassword, setConfirmPassword] = useState<string>()

  const isKeyboardVisible = Keyboard.isVisible()
  const keyboardHeight = useKeyboard()

  const isEmail = (email: string) => {
    return emailRegex.test(email)
  }

  console.log(route.params.userInfo.profile_image)

  const handleRegister = async () => {
    const { first_name, last_name, age, sex, weight, profile_image, height } =
      route.params.userInfo
    const image: Blob | any = {
      uri: profile_image,
      name: 'profile_image.jpg',
      type: 'image/jpg'
    }

    const data = new FormData()
    data.append('first_name', first_name)
    data.append('last_name', last_name)
    data.append('age', age.toString())
    data.append('gender', sex)
    data.append('weight', weight.toString())
    data.append('profile_image', image)
    data.append('height', JSON.stringify(height))
    email && data.append('email', email)
    password && data.append('password', password)

    const res = await fetch(`http://localhost:8000/fitness/register`, {
      method: 'POST',
      body: data
    })
  }

  return (
    <SafeAreaView style={[STYLES.container, styles.container]}>
      <StatusLines steps={5} activeStep={4} />
      <OnboardHeading title="Let's setup login" />
      <Divider />
      <View>
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
        style={{ width: 200, height: 200, borderColor: 'red', borderWidth: 1 }}
      >
        <Image
          source={{ uri: route.params.userInfo.profile_image }}
          resizeMode="contain"
        />
      </View>
      {email && isEmail(email) && password === confirmPassword && (
        <View
          style={[
            styles.nextBtn,
            isKeyboardVisible && Platform.OS === 'ios'
              ? { bottom: keyboardHeight.keyboardHeight + RFPercentage(5) }
              : styles.androidKeyboard
          ]}
        >
          <CustomBtn title="Register" onPress={handleRegister} />
        </View>
      )}
    </SafeAreaView>
  )
}

export default OnboardFive

const styles = StyleSheet.create({
  container: {
    // height: '100%'
  },
  nextBtn: {
    width: '100%',
    position: 'absolute',
    bottom: RFPercentage(4),
    justifyContent: 'center',
    alignItems: 'center'
  },
  androidKeyboard: {
    bottom: RFPercentage(6)
  }
})
