import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Keyboard,
  DeviceEventEmitter
} from 'react-native'
import { Divider } from 'react-native-elements'
import React, { useState } from 'react'
import StatusLines from '../../components/StatusLines'
import {
  BACKGROUND_COLOR,
  ERROR_COLOR,
  TEXT_COLOR
} from '../../constants/colors'
import { RFPercentage } from 'react-native-responsive-fontsize'
import CustomInput from '../../components/CustomInput'
import CustomBtn from '../../components/CustomBtn'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useKeyboard } from '@react-native-community/hooks'
import { RootStackParamList } from 'NavType'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type OnboardTwoProps = NativeStackScreenProps<RootStackParamList, 'OnboardTwo'>

const OnboardTwo = ({ navigation }: OnboardTwoProps) => {
  const [errorColor, setErrorColor] = useState<string>('')
  const [name, setName] = useState<{ firstName: string; lastName: string }>({
    firstName: '',
    lastName: ''
  })
  const isKeyboardVisible = Keyboard.isVisible()
  const keyboardHeight = useKeyboard()

  const handleNextPress = () => {
    if (!name.firstName || !name.lastName) {
      setErrorColor(ERROR_COLOR)
      return
    } else {
      setErrorColor('')
    }
    // DeviceEventEmitter.emit('event.userInfo', name)
    // setName({
    //   firstName: '',
    //   lastName: ''
    // })
    navigation.navigate('OnboardThree', { name })
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusLines steps={5} activeStep={0} />
      <View style={styles.headingWrapper}>
        <Text style={styles.headingText}>
          First things first, What should I call you?
        </Text>
      </View>
      <Divider />
      <View>
        <CustomInput
          placeholder="First Name"
          onChange={(text) => setName({ ...name, firstName: text })}
          placeholderColor={errorColor ? errorColor : ''}
          value={name.firstName}
          inputStyle={{ fontSize: RFPercentage(3) }}
        />
        <CustomInput
          placeholder="Last Name"
          onChange={(text) => setName({ ...name, lastName: text })}
          placeholderColor={errorColor ? errorColor : ''}
          value={name.lastName}
          inputStyle={{ fontSize: RFPercentage(3) }}
        />
      </View>
      <View
        style={[
          styles.nextBtn,
          isKeyboardVisible
            ? { bottom: keyboardHeight.keyboardHeight + RFPercentage(1) }
            : { bottom: RFPercentage(6) }
        ]}
      >
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
      </View>
    </SafeAreaView>
  )
}

export default OnboardTwo

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    height: '100%'
  },
  headingWrapper: {
    paddingHorizontal: RFPercentage(1),
    marginVertical: RFPercentage(2)
  },
  headingText: {
    color: TEXT_COLOR,
    fontSize: RFPercentage(4)
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
