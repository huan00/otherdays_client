import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import React from 'react'
import StatusLines from '../components/StatusLines'
import {
  BACKGROUND_COLOR,
  OTHERDAY_LIME,
  TEXT_COLOR
} from '../constants/colors'
import CustomBtn from '../components/CustomBtn'
import { NavigationProp, ParamListBase } from '@react-navigation/native'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

type RootStackParamList = {
  Home: undefined
  Login: undefined
}

type HomeProps = {
  navigation: NavigationProp<ParamListBase>
}

const Home = ({ navigation }: HomeProps) => {
  const handleBtnPress = () => {
    navigation.navigate('Login')
  }

  const handleRegister = () => {
    navigation.navigate('OnboardOne')
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <StatusLines steps={4} active={true} />
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
            <TouchableOpacity onPress={handleRegister}>
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
    height: HEIGHT,
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
    color: TEXT_COLOR,
    fontSize: RFPercentage(3.6),
    marginBottom: RFPercentage(15)
  },
  loginRegisterContainer: {
    justifyContent: 'space-between'
  },
  register: {
    color: TEXT_COLOR,
    alignSelf: 'center',
    marginTop: RFPercentage(4)
  }
})
