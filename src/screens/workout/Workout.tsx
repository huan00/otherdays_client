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
import React, { useState } from 'react'
import { STYLES } from '../../util/styles'
import OnboardHeading from '../../components/OnboardHeading'
import { Divider } from 'react-native-elements'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Dropdown, MultiSelect } from 'react-native-element-dropdown'
import {
  WORKOUT_EQUIPMENTS,
  WORKOUT_LEVEL,
  WORKOUT_MUSCLE,
  WORKOUT_TIME
} from '../../constants/workoutProgram'
import CustomBtn from '../../components/CustomBtn'
import { BASEURL } from '../../services'
import { RootStackParamList } from 'NavType'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Loading from '../../components/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'

type WorkoutProps = NativeStackScreenProps<RootStackParamList, 'Workout'>

const Workout = ({ navigation }: WorkoutProps) => {
  const [loader, setLoader] = useState<boolean>(false)
  const [level, setLevel] = useState<string>(WORKOUT_LEVEL[0].value)
  const [workoutTime, setWorkoutTime] = useState<string>(WORKOUT_TIME[0].value)
  const [workoutEquipment, setWorkoutEquipment] = useState<string>(
    WORKOUT_EQUIPMENTS[0].value
  )
  const [muscleGroup, setMuscleGroup] = useState<string>(
    WORKOUT_MUSCLE[0].value
  )

  const renderDropDown = (
    DropDowndata: { label: string; value: string }[],
    data: string,
    setData: React.Dispatch<React.SetStateAction<string>>
  ) => {
    return (
      <Dropdown
        style={[styles.dropDownWrapper]}
        selectedTextStyle={styles.dropDownText}
        data={DropDowndata}
        labelField={'label'}
        valueField={'value'}
        onChange={(item) => setData(item.value)}
        value={data}
      />
    )
  }

  const handlePress = async () => {
    const data = {
      workoutLevel: level,
      workoutTime: workoutTime,
      workoutEquipment: workoutEquipment,
      muscleGroup: muscleGroup
    }

    console.log(data)
    const token =
      Platform.OS === 'web'
        ? localStorage.getItem('fitnessLoginToken')
        : await SecureStore.getItemAsync('fitnessLoginToken')

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `token ` + token?.replace(/"/g, '')
    }
    setLoader(true)
    const res = await axios.post(`${BASEURL}/fitness/getworkout`, data, {
      headers
    })

    setLoader(false)

    if (res.data) {
      navigation.navigate('WorkoutTwo', res.data)
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
        <View style={styles.promptWrapper}>
          <Text style={[styles.promptText]}>
            Start a {'\n'}
            {renderDropDown(WORKOUT_LEVEL, level, setLevel)}
            {'\n'}
            {renderDropDown(WORKOUT_MUSCLE, muscleGroup, setMuscleGroup)} {'\n'}{' '}
            level workout that focuses on BUILDING Muscle for{' '}
            {renderDropDown(WORKOUT_TIME, workoutTime, setWorkoutTime)} {'\n'}
            with{' '}
            {renderDropDown(
              WORKOUT_EQUIPMENTS,
              workoutEquipment,
              setWorkoutEquipment
            )}
          </Text>
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
    marginTop: RFPercentage(1),
    alignItems: 'flex-start'
  },
  promptText: {
    color: 'white',
    fontSize: RFPercentage(3.5)
  },
  dropDownWrapper: {
    width: RFPercentage(26.5),
    borderBottomColor: '#737373',
    borderBottomWidth: 1,
    paddingLeft: RFPercentage(1)
  },
  dropDownText: {
    fontSize: RFPercentage(3.5),
    color: 'white',
    borderBottomColor: 'red',
    borderBottomWidth: 1
    // flexDirection: 'row',
    // alignSelf: 'flex-end',
    // justifyContent: 'center'
  }
  // dropDownPlaceholder: {
  //   color: 'red',
  //   fontSize: RFPercentage(3.5),
  //   alignSelf: 'flex-end',
  //   justifyContent: 'center'
  // },
})
