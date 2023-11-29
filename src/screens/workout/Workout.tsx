import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import * as SecureStore from 'expo-secure-store'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { STYLES } from '../../util/styles'
import OnboardHeading from '../../components/OnboardHeading'
import { Divider } from 'react-native-elements'
import { RFPercentage } from 'react-native-responsive-fontsize'
import {
  WORKOUT_EQUIPMENTS,
  WORKOUT_GOAL_PROMPT,
  WORKOUT_LEVEL,
  WORKOUT_MUSCLE,
  WORKOUT_TIME
} from '../../constants/workoutProgram'
import CustomBtn from '../../components/CustomBtn'
import { BASEURL, verifyLogin } from '../../services'
import Loading from '../../components/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FormDataType, UserType } from '../../types'
import Dropdown from '../../components/Dropdown'
import {
  NavigationProp,
  ParamListBase,
  RouteProp
} from '@react-navigation/native'
import { useAuth } from '../../context/AppContext'

type Props = {
  navigation: NavigationProp<ParamListBase>
  route: RouteProp<{ Workout: UserType }, 'Workout'>
}

const Workout = ({ navigation, route }: Props) => {
  const { setUser } = useAuth()
  const [loader, setLoader] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormDataType>({
    workoutLevel: WORKOUT_LEVEL[0].value,
    workoutTime: WORKOUT_TIME[0].value,
    workoutEquipment: WORKOUT_EQUIPMENTS[0].value,
    muscleGroup: WORKOUT_MUSCLE[0].value,
    workoutGoal: WORKOUT_GOAL_PROMPT[0].value
  })

  useEffect(() => {
    const getToken = async () => {
      const res =
        Platform.OS === 'web'
          ? localStorage.getItem('fitnessLoginToken')
          : await SecureStore.getItemAsync('fitnessLoginToken')
      const token = res?.replace(/"/g, '')
      if (token) {
        const res = await verifyLogin(token)

        setUser(JSON.parse(res))
      }
    }
    getToken()
    console.log('hello')
  }, [])

  const handlePress = async () => {
    const token =
      Platform.OS === 'web'
        ? localStorage.getItem('fitnessLoginToken')
        : await SecureStore.getItemAsync('fitnessLoginToken')

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `token ` + token?.replace(/"/g, '')
    }
    setLoader(true)
    const res = await axios.post(`${BASEURL}/fitness/getworkout`, formData, {
      headers
    })
    console.log(res)

    setLoader(false)

    if (res.data) {
      navigation.navigate('WorkoutTwo', { prompt: formData, ...res.data })
    }
  }

  const handlePressGear = () => {
    navigation.navigate('Profile')
  }

  return (
    <SafeAreaView style={[STYLES.container]}>
      <View style={styles.headerWrapper}>
        <OnboardHeading
          title="Let's start a workout"
          textStyle={{ fontSize: RFPercentage(2) }}
        />
        <TouchableOpacity style={styles.gearWrapper} onPress={handlePressGear}>
          <FontAwesomeIcon icon={faGear} color="white" size={RFPercentage(2)} />
        </TouchableOpacity>
      </View>
      <Divider />
      <View style={[styles.mainWrapper]}>
        <Text style={[STYLES.grayText]}>Prompt</Text>

        <View style={{ width: '100%', flexDirection: 'column' }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}
          >
            <View style={{ flex: 0 }}>
              <Text style={styles.promptText}>A </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 1
              }}
            >
              <View style={{ flex: 1 }}>
                <Dropdown
                  formData={formData}
                  data={WORKOUT_LEVEL}
                  title="workoutLevel"
                  setData={setFormData}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Dropdown
                  formData={formData}
                  data={WORKOUT_MUSCLE}
                  title="muscleGroup"
                  setData={setFormData}
                />
              </View>
              <View>
                <Text style={styles.promptText}>workout</Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', zIndex: -100 }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row'
              }}
            >
              <Text style={[styles.promptText, {}]}>that focus on </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Dropdown
                formData={formData}
                data={WORKOUT_GOAL_PROMPT}
                title="workoutGoal"
                setData={setFormData}
              />
            </View>
          </View>
          <View
            style={{ flexDirection: 'row', flexWrap: 'wrap', zIndex: -200 }}
          >
            <View
              style={{
                flexShrink: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start'
              }}
            >
              <Text style={[{ flex: 1 }, styles.promptText]}>for </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Dropdown
                formData={formData}
                data={WORKOUT_TIME}
                title="workoutTime"
                setData={setFormData}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.promptText}> with </Text>
            </View>
          </View>
          <View style={{ flexShrink: 1, flexDirection: 'row', zIndex: -300 }}>
            <View style={{ flex: 1 }}>
              <Dropdown
                formData={formData}
                data={WORKOUT_EQUIPMENTS}
                title="workoutEquipment"
                setData={setFormData}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={STYLES.nextBtn}>
        <CustomBtn
          title="Get Workout"
          onPress={handlePress}
          btnStyle={{ backgroundColor: 'white' }}
        />
      </View>
      {loader && <Loading />}
    </SafeAreaView>
  )
}

export default Workout

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  gearWrapper: {
    paddingRight: RFPercentage(1)
  },
  mainWrapper: {
    paddingHorizontal: RFPercentage(1),
    marginTop: RFPercentage(4)
  },
  promptWrapper: {
    // borderColor: 'white',
    // borderWidth: 1,
    flexDirection: 'row',
    marginTop: RFPercentage(1),
    alignItems: 'flex-start'
  },
  promptText: {
    justifyContent: 'flex-start',
    color: 'white',
    fontSize: RFPercentage(3.5)
    // textDecorationLine: 'underline'
  },
  dropDownWrapper: {
    width: RFPercentage(26.5),
    borderBottomColor: '#737373',
    borderBottomWidth: 1,
    paddingLeft: RFPercentage(1)
  },
  dropDownText: {
    fontSize: RFPercentage(3.5),
    color: 'red',
    borderBottomColor: 'red',
    borderBottomWidth: 1
    // flexDirection: 'row',
    // alignSelf: 'flex-end',
    // justifyContent: 'center'
  }
})
