import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import React, { useEffect, useState } from 'react'
import StatusLines from '../components/StatusLines'
import {
  BACKGROUND_COLOR,
  OTHERDAY_LIME,
  TEXT_COLOR_WHITE
} from '../constants/colors'
import CustomBtn from '../components/CustomBtn'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store'
import { verifyLogin } from '../services'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

type HomeProps = {
  navigation: NavigationProp<ParamListBase>
}

const Home = ({ navigation }: HomeProps) => {
  const [token, setToken] = useState<string | undefined>('')
  const [user, setUser] = useState<any>('')

  useEffect(() => {
    const getToken = async () => {
      const tokenData = await SecureStore.getItemAsync('fitnessLoginToken')
      console.log(tokenData)
      setToken(tokenData?.replace(/"/g, ''))
    }
    if (token) {
      getToken()
      setUser(verifyLogin(token))
    }

    if (user) {
      navigation.navigate('Workout')
    }
  }, [token])

  const handleBtnPress = () => {
    navigation.navigate('Login')
  }

  const handleRegister = () => {
    navigation.navigate('OnboardOne')
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <StatusLines steps={4} activeStep={0} />
        <View style={styles.content}>
          <Text style={styles.headline}>
            A lifestyle commitment to ourselves. Powered by Ai, built for
            humans.
          </Text>
          <View style={styles.loginRegisterContainer}>
            <CustomBtn
              title={'Log me into my space'}
              bgColor={OTHERDAY_LIME}
              onPress={handleBtnPress}
            />
            <TouchableOpacity
              onPress={handleRegister}
              style={styles.registerWrapper}
            >
              <Text style={styles.register}>I’m new to Other Days</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: '100%',
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: 'space-between',
    paddingHorizontal: RFPercentage(1)
  },
  content: {
    height: HEIGHT * 0.48,

    marginBottom: RFPercentage(3),
    justifyContent: 'flex-start'
  },
  headline: {
    color: TEXT_COLOR_WHITE,
    fontSize: RFPercentage(3.6),
    marginBottom: RFPercentage(15)
  },
  loginRegisterContainer: {
    justifyContent: 'space-between'
  },
  registerWrapper: {
    alignSelf: 'center',
    marginTop: RFPercentage(4),
    paddingVertical: RFPercentage(1)
  },
  register: {
    color: TEXT_COLOR_WHITE,
    alignSelf: 'center'
  }
})
