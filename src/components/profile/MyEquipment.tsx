import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useState } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { STYLES } from '../../util/styles'
import { useAuth } from '../../context/AppContext'
import WorkoutPref from '../WorkoutPref'
import { OTHERDAY_LIME } from '../../constants/colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCancel, faCheck, faEdit } from '@fortawesome/free-solid-svg-icons'
import { EQUIPMENTS } from '../../constants/workoutProgram'
import { updateUserEquipment, updateUserWorkoutGoal } from '../../services'
import * as SecureStore from 'expo-secure-store'

const WorkoutGoal = () => {
  const { user } = useAuth()
  const [isShow, setIsShow] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [equipmentsList, setEquipmentsList] = useState<string[] | undefined>(
    user?.EquipmentsList[0].equipments.map((item) => {
      return item.name
    })
  )

  const checkInList = (goal: string) => {
    let result = false
    equipmentsList?.forEach((item) => {
      if (item.toLowerCase() === goal.toLowerCase()) {
        result = true
      }
    })
    return result
  }

  const handleEditSelect = (item: string) => {
    if (equipmentsList?.includes(item)) {
      const index = equipmentsList.indexOf(item)
      const tempequipmentsList = [...equipmentsList]
      tempequipmentsList.splice(index, 1)
      setEquipmentsList(tempequipmentsList)
    } else {
      if (equipmentsList) {
        const tempequipmentsList = [...equipmentsList]
        tempequipmentsList.push(item)
        setEquipmentsList(tempequipmentsList)
      }
    }
  }

  const handleUpdate = async () => {
    const resToken =
      Platform.OS === 'web'
        ? localStorage.getItem('fitnessLoginToken')
        : await SecureStore.getItemAsync('fitnessLoginToken')
    const token = resToken?.replace(/"/g, '')

    await updateUserEquipment(equipmentsList, token)

    setIsEdit(!isEdit)
  }

  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <View>
          <Text
            style={[STYLES.whiteText, styles.headerText]}
            onPress={() => setIsShow(!isShow)}
          >
            Equipments List
          </Text>
        </View>
        <View>
          {isShow && !isEdit && (
            <TouchableOpacity onPress={() => setIsEdit(!isEdit)}>
              <FontAwesomeIcon
                icon={faEdit}
                color="white"
                size={RFPercentage(2)}
              />
            </TouchableOpacity>
          )}
          {isShow && isEdit && (
            <View style={{ flexDirection: 'row', gap: RFPercentage(2) }}>
              <TouchableOpacity onPress={() => setIsEdit(!isEdit)}>
                <FontAwesomeIcon
                  icon={faCancel}
                  color="white"
                  size={RFPercentage(2)}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleUpdate}>
                <FontAwesomeIcon
                  icon={faCheck}
                  color="white"
                  size={RFPercentage(2)}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <View
        style={{
          display: isShow ? 'flex' : 'none',
          paddingLeft: RFPercentage(3)
        }}
      >
        {isShow &&
          (!isEdit
            ? equipmentsList?.map((item: string, index: number) => (
                <WorkoutPref
                  title={item}
                  onPress={() => {}}
                  key={Math.random()}
                  style={{
                    container: checkInList(item)
                      ? { borderColor: OTHERDAY_LIME }
                      : undefined,
                    circle: checkInList(item)
                      ? { backgroundColor: OTHERDAY_LIME }
                      : undefined
                  }}
                />
              ))
            : EQUIPMENTS.map((item) => (
                <WorkoutPref
                  title={item}
                  onPress={() => handleEditSelect(item)}
                  style={{
                    container: checkInList(item)
                      ? { borderColor: OTHERDAY_LIME }
                      : undefined,
                    circle: checkInList(item)
                      ? { backgroundColor: OTHERDAY_LIME }
                      : undefined
                  }}
                />
              )))}
      </View>
    </View>
  )
}

export default WorkoutGoal

const styles = StyleSheet.create({
  headerText: {
    fontSize: RFPercentage(2.5)
  }
})
