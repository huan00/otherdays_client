import {
  Dimensions,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { STYLES } from '../util/styles'
import { useAuth } from '../context/AppContext'
import Label from './Label'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { UserType } from '../types'

type EditDataType = {
  email: string
  first_name: string
  last_name: string
  gender: string
  weight: number
  height: { feet: number; inches: number }
}

const MyProfile = () => {
  const { user, setUser } = useAuth()
  const [isUserProfile, setIsUserProfile] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [editUserData, setEditUserData] = useState<UserType | undefined>(user)

  const handleUpdate = (
    label: string,
    // text: string
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    console.log(event)
    // const updateUser: any = { ...user, [label]: event.nativeEvent.text }
    // setUser(updateUser)
    if (editUserData) {
      const updateData = { ...editUserData, [label]: event.nativeEvent.text }
      setEditUserData(updateData)
    }
  }

  const handleEditPress = (): void => {
    setIsEdit(!isEdit)
  }

  console.log(editUserData)

  return (
    <View>
      {user && (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end'
            }}
          >
            <Text
              style={[
                STYLES.whiteText,
                { marginTop: RFPercentage(2), flex: 1 },
                styles.headerText
              ]}
              onPress={() => {
                setIsUserProfile(!isUserProfile)
              }}
            >
              My Profiles
            </Text>
            {isUserProfile && (
              <TouchableOpacity
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end'
                }}
                onPress={handleEditPress}
              >
                <FontAwesomeIcon
                  icon={faEdit}
                  color="white"
                  size={RFPercentage(2.5)}
                  style={{}}
                />
              </TouchableOpacity>
            )}
          </View>

          <View
            style={{
              display: isUserProfile ? 'flex' : 'none',
              paddingLeft: RFPercentage(3)
            }}
          >
            <Label
              value={editUserData ? editUserData.email : ''}
              edit={isEdit}
              label={'email'}
              onBlur={handleUpdate}
            />
            <Label
              value={editUserData ? editUserData.first_name : ''}
              edit={isEdit}
              label={'first_name'}
              onBlur={handleUpdate}
            />
            <Label
              value={editUserData ? editUserData.last_name : ''}
              edit={isEdit}
              label={'last_name'}
              onBlur={handleUpdate}
            />
            <Label
              value={editUserData ? editUserData.gender : ''}
              edit={isEdit}
              label={'gender'}
              onBlur={handleUpdate}
            />
            <Label
              value={editUserData ? editUserData.weight.toString() + 'lbs' : ''}
              edit={isEdit}
              label={'weight'}
              onBlur={handleUpdate}
            />
            <Label
              value={
                editUserData
                  ? editUserData.height.feet.toString() +
                    ' feet ' +
                    editUserData.height.inches.toString() +
                    ' inches'
                  : ''
              }
              edit={isEdit}
              label={'height'}
              onBlur={handleUpdate}
            />
          </View>
        </>
      )}
    </View>
  )
}

export default MyProfile

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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerText: {
    fontSize: RFPercentage(2.5)
  }
})
