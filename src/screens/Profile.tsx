import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  ScrollView,
  Platform
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { STYLES } from '../util/styles'
import * as SecureStore from 'expo-secure-store'
import { BASEURL, verifyLogin } from '../services'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Divider } from 'react-native-elements'
import Label from '../components/Label'
import CustomBtn from '../components/CustomBtn'
import { RootStackParamList } from 'NavType'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type ProfileProps = NativeStackScreenProps<RootStackParamList, 'Profile'>

const Profile = ({ navigation }: ProfileProps) => {
  const [user, setUser] = useState<any>()

  useEffect(() => {
    const getToken = async () => {
      let res =
        Platform.OS === 'web'
          ? localStorage.getItem('fitnessLoginToken')
          : await SecureStore.getItemAsync('fitnessLoginToken')
      let temp = res?.replaceAll(/"/g, '')
      if (temp) {
        const response = await verifyLogin(temp)
        setUser(JSON.parse(response))
      }
    }
    getToken()
  }, [])

  const handleUpdate = (
    label: string,
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const updateUser = { ...user }
    updateUser[label] = event.nativeEvent.text
    setUser(updateUser)
  }

  return (
    <SafeAreaView style={STYLES.container}>
      {user ? (
        <>
          <View style={styles.headerContainer}>
            <View>
              <Text style={STYLES.whiteText}>Profile</Text>
            </View>
            <View style={styles.userHeader}>
              <Text style={STYLES.whiteText}>{user.first_name}</Text>
              <Image
                source={{ uri: `${BASEURL}${user?.profile_image}` }}
                style={styles.profileImage}
              />
            </View>
          </View>
          <Divider />

          <ScrollView>
            <Text
              style={[
                STYLES.whiteText,
                { marginTop: RFPercentage(2) },
                styles.headerText
              ]}
            >
              User Info
            </Text>
            <Label value={user.email} label={'email'} onChange={handleUpdate} />
            <Label
              value={user.first_name}
              label={'first_name'}
              onChange={handleUpdate}
            />
            <Label
              value={user.last_name}
              label={'last_name'}
              onChange={handleUpdate}
            />
            <Label
              value={user.gender}
              label={'gender'}
              onChange={handleUpdate}
            />
            <Label
              value={user.weight.toString() + 'lbs'}
              label={'weight'}
              onChange={handleUpdate}
            />
            <Label
              value={
                user.height.feet.toString() +
                ' feet ' +
                user.height.inches.toString() +
                ' inches'
              }
              label={'height'}
              onChange={handleUpdate}
            />
            <Text style={[STYLES.whiteText, styles.headerText]}>
              Workout Prefreference
            </Text>
            <View>
              {user.workoutPreference.map((preference: any) =>
                preference.preference.map((workout: any, index: number) => (
                  <Label
                    key={index + Math.random()}
                    value={workout.name}
                    label={workout.name}
                    onChange={() => {}}
                  />
                ))
              )}
            </View>
            <Text style={[STYLES.whiteText, styles.headerText]}>
              Workout Goals
            </Text>
            <View>
              {user.workoutGoals.map((workoutGoal: any) =>
                workoutGoal.goals.map((goal: any, index: number) => (
                  <Label
                    value={goal.goal}
                    label={goal.goal}
                    onChange={() => {}}
                    key={index + Math.random()}
                  />
                ))
              )}
            </View>

            <Text style={[STYLES.whiteText, styles.headerText]}>
              Equipments List
            </Text>
            <View>
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
            </View>
          </ScrollView>

          <View style={styles.btnLayout}>
            <CustomBtn
              title={'Home'}
              onPress={() => navigation.navigate('Home')}
              btnStyle={{ width: '45%' }}
            />
            <CustomBtn
              title={'Log out'}
              btnStyle={{ width: '45%' }}
              onPress={async () => {
                if (Platform.OS === 'web') {
                  localStorage.clear()
                } else {
                  await SecureStore.deleteItemAsync('fitnessLoginToken')
                  await SecureStore.deleteItemAsync('fitnessUser')
                }
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: RFPercentage(3)
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: RFPercentage(1)
  },
  profileImage: {
    width: RFPercentage(5),
    aspectRatio: 1 / 1,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: RFPercentage(50)
  },
  btnLayout: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerText: {
    fontSize: RFPercentage(2.5)
  }
})
