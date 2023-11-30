import {
  Dimensions,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View
} from 'react-native'
import * as SecureStore from 'expo-secure-store'

import React, { useRef, useState } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { STYLES } from '../../util/styles'
import { useAuth } from '../../context/AppContext'
import Label from '../Label'
import { faCancel, faCheck, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { UserType } from '../../types'
import { updateUser } from '../../services'

type EditDataType = {
  first_name: string
  last_name: string
  gender: string
  weight: number
  height: { feet: number; inches: number }
}

type ErrorType = {
  message: string
  response: { data: { error: string }; status: number; statusText: string }
}

const MyProfile = () => {
  const { user } = useAuth()
  const [isUserProfile, setIsUserProfile] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [editAbleUserData, setEditAbleUserData] = useState<
    UserType | undefined
  >(user)
  const editRef = useRef<TextInput | null>(null)

  const handleOnChange = (
    label: string,
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    if (editAbleUserData) {
      if (
        label.toUpperCase() === 'feet'.toUpperCase() ||
        label.toUpperCase() === 'inches'.toUpperCase()
      ) {
        const tempHeight: UserType = { ...editAbleUserData }
        tempHeight.height = {
          ...tempHeight.height,
          [label]: event.nativeEvent.text
        }
        setEditAbleUserData(tempHeight)
      } else {
        const updateData = {
          ...editAbleUserData,
          [label]: event.nativeEvent.text
        }
        setEditAbleUserData(updateData)
      }
    }
  }

  const handleEditPress = (): void => {
    setIsEdit(!isEdit)
  }

  const handleCancelEditPress = (): void => {
    setEditAbleUserData(user)
    setIsEdit(!isEdit)
  }

  const handleUpdate = async () => {
    try {
      const resToken =
        Platform.OS === 'web'
          ? localStorage.getItem('fitnessLoginToken')
          : await SecureStore.getItemAsync('fitnessLoginToken')
      const token = resToken?.replace(/"/g, '')

      if (editAbleUserData) {
        const updatedData: EditDataType = {
          first_name: editAbleUserData?.first_name,
          last_name: editAbleUserData?.last_name,
          gender: editAbleUserData?.gender,
          weight: editAbleUserData?.weight,
          height: editAbleUserData?.height
        }
        const res = await updateUser(updatedData, token)
      }
      setIsEdit(!isEdit)
    } catch (error) {
      const result = (error as Error).message
    }
  }

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
                if (isEdit) {
                  setIsEdit(!isEdit)
                }
              }}
            >
              My Profiles
            </Text>
            {isUserProfile && (
              <View
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end'
                }}
              >
                {!isEdit ? (
                  <TouchableOpacity onPress={handleEditPress}>
                    <FontAwesomeIcon
                      icon={faEdit}
                      color="white"
                      size={RFPercentage(2.5)}
                      style={{}}
                    />
                  </TouchableOpacity>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      gap: RFPercentage(2)
                    }}
                  >
                    <TouchableOpacity onPress={handleCancelEditPress}>
                      <FontAwesomeIcon
                        icon={faCancel}
                        color="white"
                        size={RFPercentage(2.5)}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleUpdate}>
                      <FontAwesomeIcon
                        icon={faCheck}
                        color="white"
                        size={RFPercentage(2.5)}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          </View>

          <View
            style={{
              display: isUserProfile ? 'flex' : 'none',
              paddingLeft: RFPercentage(3)
            }}
          >
            <Label
              value={editAbleUserData ? editAbleUserData.email : ''}
              edit={false}
              label={'email'}
              onChange={handleOnChange}
            />
            <Label
              value={editAbleUserData ? editAbleUserData.first_name : ''}
              edit={isEdit}
              label={'first_name'}
              onChange={handleOnChange}
              editRef={editRef}
            />
            <Label
              value={editAbleUserData ? editAbleUserData.last_name : ''}
              edit={isEdit}
              label={'last_name'}
              onChange={handleOnChange}
            />
            <Label
              value={editAbleUserData ? editAbleUserData.gender : ''}
              edit={isEdit}
              label={'gender'}
              onChange={handleOnChange}
            />
            <Label
              value={editAbleUserData ? editAbleUserData.weight.toString() : ''}
              edit={isEdit}
              inputType="numeric"
              label={'weight'}
              onChange={handleOnChange}
            />
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <View>
                <Text style={{ color: 'white', fontSize: RFPercentage(2) }}>
                  HEIGTH:{' '}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Label
                  value={
                    editAbleUserData
                      ? editAbleUserData.height.feet.toString()
                      : ''
                  }
                  edit={isEdit}
                  label={'feet'}
                  inputType="numeric"
                  onChange={handleOnChange}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Label
                  value={
                    editAbleUserData
                      ? editAbleUserData.height.inches.toString()
                      : ''
                  }
                  edit={isEdit}
                  label={'inches'}
                  inputType="numeric"
                  onChange={handleOnChange}
                />
              </View>
            </View>
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
