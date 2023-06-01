import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Keyboard,
  Platform
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
import OnboardHeading from '../../components/OnboardHeading'

type OnboardTwoProps = NativeStackScreenProps<RootStackParamList, 'OnboardTwo'>

const OnboardTwo = ({ navigation }: OnboardTwoProps) => {
  const [errorColor, setErrorColor] = useState<string>('')
  const [name, setName] = useState<{ first_name: string; last_name: string }>({
    first_name: '',
    last_name: ''
  })
  const isKeyboardVisible = Keyboard.isVisible()
  const keyboardHeight = useKeyboard()

  const handleNextPress = () => {
    if (!name.first_name || !name.last_name) {
      setErrorColor(ERROR_COLOR)
      return
    } else {
      setErrorColor('')
    }
    navigation.navigate('OnboardThree', { name })
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusLines steps={5} activeStep={0} />
      <OnboardHeading title={'First things first, what should I call you'} />
      <Divider />
      <View>
        <CustomInput
          placeholder="First Name"
          onChange={(text) => setName({ ...name, first_name: text })}
          placeholderColor={errorColor ? errorColor : ''}
          value={name.first_name}
          inputStyle={{ fontSize: RFPercentage(3) }}
        />
        <CustomInput
          placeholder="Last Name"
          onChange={(text) => setName({ ...name, last_name: text })}
          placeholderColor={errorColor ? errorColor : ''}
          value={name.last_name}
          inputStyle={{ fontSize: RFPercentage(3) }}
        />
      </View>
      <View
        style={[
          styles.nextBtn,
          isKeyboardVisible && Platform.OS === 'ios'
            ? { bottom: keyboardHeight.keyboardHeight + RFPercentage(5) }
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
    height: '100%'
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
