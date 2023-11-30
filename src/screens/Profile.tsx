import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  ScrollView,
  Platform,
  Dimensions
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { STYLES } from '../util/styles'
import * as SecureStore from 'expo-secure-store'
import { BASEURL, verifyLogin } from '../services'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Divider } from 'react-native-elements'
import Label from '../components/Label'
import CustomBtn from '../components/CustomBtn'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import WorkoutHistory from '../components/WorkoutHistory'
import { useAuth } from '../context/AppContext'
import MyProfile from '../components/profile/MyProfile'
import MyProfileWorkPref from '../components/profile/MyProfileWorkPref'
import WorkoutGoal from '../components/profile/WorkoutGoal'
import MyEquipment from '../components/profile/MyEquipment'

type Props = {
  navigation: NavigationProp<ParamListBase>
}

type UserSettingType = {
  id: number
  email: string
  first_name: string
  last_name: string
  age: number
  gender: string
  weight: number
  profile_image: null
  height: { feet: number; inches: number }
}

const Profile = ({ navigation }: Props) => {
  const { user, setUser } = useAuth()
  const [userSetting, setUserSetting] = useState<UserSettingType | undefined>()
  const [isUserProfile, setIsUserProfile] = useState<boolean>(false)
  const [isWorkoutPref, setIsWorkoutPref] = useState<boolean>(false)
  const [isWorkoutGoal, setIsWorkoutGoal] = useState<boolean>(false)
  const [isEquipment, setIsEquipment] = useState<boolean>(false)
  const [isWorkoutHistory, setIsWorkoutHistory] = useState<boolean>(false)

  useEffect(() => {
    if (user) {
      setUserSetting({
        id: user.id,
        email: user.email,
        first_name: user?.first_name,
        last_name: user?.last_name,
        age: user.age,
        gender: user.gender,
        weight: user?.weight,
        profile_image: user?.profile_image,
        height: user?.height
      })
    }
  }, [user])

  const handleUpdate = (
    label: string,
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const updateUser: any = { ...user, [label]: event.nativeEvent.text }

    setUser(updateUser)
  }

  const handleHomePress = () => {
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
    navigation.navigate('Workout')
  }

  console.log(user)

  return (
    <SafeAreaView style={STYLES.container}>
      {user ? (
        <>
          <View style={[styles.headerContainer]}>
            <View style={[styles.userHeader]}>
              <Image
                source={{ uri: `${BASEURL}${user?.profile_image}` }}
                style={styles.profileImage}
              />
            </View>
            <View style={styles.userName}>
              <Text style={STYLES.whiteText}>
                {user.first_name.charAt(0).toUpperCase() +
                  user.first_name.slice(1)}{' '}
                {user.last_name.charAt(0).toUpperCase() +
                  user.last_name.slice(1)}
              </Text>
            </View>
          </View>
          <Divider />

          <ScrollView
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <View>
              <MyProfile />
            </View>

            <View style={{ marginTop: RFPercentage(3) }}>
              <MyProfileWorkPref data={user.workoutPreference} />
            </View>

            <View style={{ marginTop: RFPercentage(3) }}>
              <WorkoutGoal />
            </View>

            <View style={{ marginTop: RFPercentage(3) }}>
              <MyEquipment />
              {/* <Text
                style={[STYLES.whiteText, styles.headerText]}
                onPress={() => setIsEquipment(!isEquipment)}
              >
                Equipments List
              </Text>
              <View
                style={{
                  display: isEquipment ? 'flex' : 'none',
                  paddingLeft: RFPercentage(3)
                }}
              >
                {user.EquipmentsList.map((equipments: any) =>
                  equipments.equipments.map((equipment: any, index: number) => (
                    <Label
                      key={index + Math.random()}
                      value={equipment.name}
                      label={equipment.name}
                      onChange={() => {}}
                    />
                  ))
                )}
              </View> */}
            </View>

            <View style={{ marginTop: RFPercentage(3) }}>
              <Text
                style={[STYLES.whiteText, styles.headerText]}
                onPress={() => setIsWorkoutHistory(!isWorkoutHistory)}
              >
                Workout History
              </Text>
              <View
                style={{
                  display: isWorkoutHistory ? 'flex' : 'none'
                }}
              >
                <WorkoutHistory data={user.workouts} />
              </View>
            </View>
          </ScrollView>

          <View style={styles.btnLayout}>
            <CustomBtn
              title={'Home'}
              onPress={handleHomePress}
              btnStyle={{ width: '45%' }}
            />
            <CustomBtn
              title={'Log out'}
              btnStyle={{ width: '45%' }}
              bgColor="red"
              onPress={async () => {
                if (Platform.OS === 'web') {
                  localStorage.clear()
                } else {
                  await SecureStore.deleteItemAsync('fitnessLoginToken')
                  await SecureStore.deleteItemAsync('fitnessUser')
                }
                setUser(undefined)
                navigation.navigate('Home')
              }}
            />
          </View>
        </>
      ) : (
        <View>
          <Text style={{ alignSelf: 'center', color: 'white' }}>
            Loading...
          </Text>
        </View>
      )}
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: RFPercentage(3),
    // height: Dimensions.get('window').height * 0.3,
    width: Dimensions.get('window').width
  },
  userHeader: {
    marginTop: RFPercentage(3),
    width: '50%',
    aspectRatio: '1/1',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: RFPercentage(1),
    borderRadius: RFPercentage(50)
  },
  userName: {
    marginTop: RFPercentage(2)
  },
  profileImage: {
    width: '100%',
    aspectRatio: 1 / 1,
    borderColor: 'white',
    borderWidth: 1,
    // borderStyle: 'solid',
    borderRadius: RFPercentage(50)
  },
  btnLayout: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center'
  },
  headerText: {
    fontSize: RFPercentage(2.5)
  }
})
