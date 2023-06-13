import {
  SafeAreaView,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import * as SecureStore from 'expo-secure-store'
import React, { useState } from 'react'
import StatusLines from '../components/StatusLines'
import {
  BACKGROUND_COLOR,
  OTHERDAY_LIME,
  TEXT_COLOR
} from '../constants/colors'
import CustomInput from '../components/CustomInput'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { P_HORIZONTAL } from '../constants/styles'
import CustomBtn from '../components/CustomBtn'
import axios from 'axios'
import { BASEURL } from '../services'
import { NavigationProp, ParamListBase } from '@react-navigation/native'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

type RootStackParamList = {
  Login: undefined
}

type LoginProps = {
  navigation: NavigationProp<ParamListBase>
}

const Login = ({ navigation }: LoginProps) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = async () => {
    const authData = {
      email,
      password
    }

    if (!email || !password) return

    const response = await axios.post(`${BASEURL}/fitness/login`, authData)
    const data = response.data
    await SecureStore.setItemAsync('fitnessLoginToken', data.token)
    await SecureStore.setItemAsync('fitnessUser', data.user)
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={(styles.containerStyle, styles.title)}>
          <Text style={styles.titleText}>Login</Text>
        </View>
        <StatusLines steps={1} />
        <View style={[styles.containerStyle, styles.content]}>
          <CustomInput
            placeholder="Email"
            value={email}
            onChange={(text) => setEmail(text)}
          />
          <CustomInput
            placeholder="Password"
            value={password}
            onChange={(text) => setPassword(text)}
            password={true}
          />
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>I forgot my password</Text>
          </TouchableOpacity>
          <CustomBtn title={'Continue with Email'} onPress={handleLogin} />

          <View style={styles.otherLogin}>
            <Text style={[styles.text, styles.otherText]}>or</Text>

            <CustomBtn
              title="Continue with Google"
              onPress={() => {}}
              bgColor={BACKGROUND_COLOR}
              textColor={TEXT_COLOR}
              btnStyle={{ borderColor: TEXT_COLOR, borderWidth: 1 }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    backgroundColor: BACKGROUND_COLOR
    // paddingHorizontal: RFPercentage(1)
  },
  containerStyle: {
    paddingHorizontal: P_HORIZONTAL
  },
  content: {
    marginTop: RFPercentage(5)
  },
  title: {
    justifyContent: 'center',
    position: 'absolute',
    top: RFPercentage(4),
    left: RFPercentage(1)
  },
  text: {
    color: TEXT_COLOR
  },
  titleText: {
    color: TEXT_COLOR,
    fontSize: RFPercentage(1.8),
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: RFPercentage(2)
  },
  forgotPassword: {
    color: OTHERDAY_LIME,
    marginTop: RFPercentage(1),
    marginBottom: RFPercentage(3)
  },
  otherLogin: {
    alignSelf: 'center',
    alignItems: 'center'
  },
  otherText: {
    marginVertical: RFPercentage(3)
  }
})
