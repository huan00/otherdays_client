import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform
} from 'react-native'
import * as SecureStore from 'expo-secure-store'
import React, { useState } from 'react'
import StatusLines from '../components/StatusLines'
import {
  BACKGROUND_COLOR,
  INACTIVE_COLOR,
  OTHERDAY_LIME,
  TEXT_COLOR_WHITE
} from '../constants/colors'
import CustomInput from '../components/CustomInput'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { P_HORIZONTAL } from '../constants/styles'
import CustomBtn from '../components/CustomBtn'
import axios from 'axios'
import { BASEURL } from '../services'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { useAuth } from '../context/AppContext'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

type LoginProps = {
  navigation: NavigationProp<ParamListBase>
}

const Login = ({ navigation }: LoginProps) => {
  const { setUser } = useAuth()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = async () => {
    const authData = {
      email,
      password
    }

    if (!email || !password) return

    try {
      const response = await axios.post(`${BASEURL}/fitness/login`, authData)
      const data = response.data
      setUser(data.user)
      if (Platform.OS === 'web') {
        localStorage.setItem('fitnessUser', JSON.stringify(data.user))
        localStorage.setItem('fitnessLoginToken', JSON.stringify(data.token))
        navigation.navigate('Workout')
      } else {
        await SecureStore.setItemAsync(
          'fitnessLoginToken',
          JSON.stringify(data.token)
        )
        await SecureStore.setItemAsync('fitnessUser', JSON.stringify(data.user))
        navigation.navigate('Workout')
      }
    } catch (error) {
      console.log(error)
    }
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
              title="Continue with Google - Coming soon"
              onPress={() => {}}
              bgColor={INACTIVE_COLOR}
              textColor={TEXT_COLOR_WHITE}
              btnStyle={{ borderColor: TEXT_COLOR_WHITE, borderWidth: 1 }}
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
    width: WIDTH,
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
    color: TEXT_COLOR_WHITE
  },
  titleText: {
    color: TEXT_COLOR_WHITE,
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
