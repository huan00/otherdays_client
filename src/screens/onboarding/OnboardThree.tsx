import { SafeAreaView, StyleSheet, Text, View, Keyboard } from 'react-native'
import React, { useState } from 'react'
import StatusLines from '../../components/StatusLines'
import {
  BACKGROUND_COLOR,
  ERROR_COLOR,
  OTHERDAY_LIME,
  TEXT_COLOR
} from '../../constants/colors'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Divider } from 'react-native-elements'
import CustomBtn from '../../components/CustomBtn'
import SelectBtn from '../../components/SelectBtn'
import CustomInput from '../../components/CustomInput'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useKeyboard } from '@react-native-community/hooks'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from 'NavType'

type OnboardThreeProps = NativeStackScreenProps<
  RootStackParamList,
  'OnboardThree'
>

const OnboardThree = ({ navigation, route }: OnboardThreeProps) => {
  const [errorColor, setErrorColor] = useState<string>('')
  const [gender, setGender] = useState<string>()
  const [age, setAge] = useState<string>()
  const [weight, setWeight] = useState<string>()
  const [feet, setFeet] = useState<string>()
  const [inches, setInches] = useState<string>()
  const isKeyboardVisible = Keyboard.isVisible()
  const keyboardHeight = useKeyboard()

  const handleGenderPress = (data: string) => {
    setGender(data)
  }

  const handleNextPress = () => {
    if (!gender || !weight || !age || !feet || !inches) {
      setErrorColor(ERROR_COLOR)
      return
    } else {
      setErrorColor('')
    }

    if (
      parseInt(weight) < 1 ||
      parseInt(age) < 1 ||
      parseInt(feet) < 1 ||
      parseInt(inches) < 0
    ) {
      return
    }

    const userInfo: {
      firstName: string
      lastName: string
      gender: string
      weight: number
      height: { feet: number; inches: number }
    } = {
      firstName: route.params.name.firstName,
      lastName: route.params.name.lastName,
      gender: gender,
      weight: parseFloat(weight),
      height: { feet: parseInt(feet), inches: parseInt(inches) }
    }
    // DeviceEventEmitter.emit('event.userInfo', data)

    navigation.navigate('OnboardFour', { userInfo })
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusLines steps={5} activeStep={1} />
      <View style={styles.headingWrapper}>
        <Text style={styles.headingText}>
          Let me know some of your current stats
        </Text>
      </View>
      <Divider />
      <View style={styles.content}>
        <View style={styles.genderWrapper}>
          <SelectBtn
            title="Male"
            onPress={handleGenderPress}
            btnStyle={
              gender === 'male' ? { backgroundColor: OTHERDAY_LIME } : undefined
            }
          />
          <SelectBtn
            title="Female"
            onPress={handleGenderPress}
            btnStyle={
              gender === 'female'
                ? { backgroundColor: OTHERDAY_LIME }
                : undefined
            }
          />
        </View>
        <CustomInput
          placeholder="Weight(lb)"
          placeholderColor={errorColor}
          value={weight ? weight?.toString() : ''}
          onChange={(text) => {
            setWeight(text)
          }}
          inputStyle={
            (weight && !Number.isInteger(parseInt(weight))) ||
            (weight && parseInt(weight) < 1)
              ? { color: ERROR_COLOR }
              : {}
          }
          keyboardType={'numeric'}
        />
        <CustomInput
          placeholder="Age"
          placeholderColor={errorColor}
          value={age ? age?.toString() : ''}
          onChange={(text) => {
            setAge(text)
          }}
          inputStyle={
            (age && !Number.isInteger(parseInt(age))) ||
            (age && parseInt(age) < 1)
              ? { color: ERROR_COLOR }
              : {}
          }
          keyboardType={'numeric'}
        />
        <View style={styles.heightWrapper}>
          <View style={styles.feet}>
            <CustomInput
              placeholder="Feet"
              placeholderColor={errorColor}
              value={feet ? feet?.toString() : ''}
              keyboardType={'numeric'}
              onChange={(text) => setFeet(text)}
              inputStyle={
                (feet && parseInt(feet) < 0) ||
                (feet && !Number.isInteger(parseInt(feet)))
                  ? { color: ERROR_COLOR }
                  : {}
              }
            />
          </View>
          <View style={styles.inches}>
            <CustomInput
              placeholder="Inches"
              placeholderColor={errorColor}
              value={inches ? inches?.toString() : ''}
              keyboardType={'numeric'}
              onChange={(text) => setInches(text)}
              inputStyle={
                (inches && !Number.isInteger(parseInt(inches))) ||
                (inches && parseInt(inches) > 11) ||
                (inches && parseInt(inches) < 0)
                  ? { color: ERROR_COLOR }
                  : {}
              }
            />
          </View>
        </View>
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

export default OnboardThree

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
  content: {
    marginTop: RFPercentage(5),
    paddingHorizontal: RFPercentage(1)
  },
  genderWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  heightWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  feet: {
    width: '50%'
  },
  inches: {
    width: '50%'
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
