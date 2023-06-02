import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import StatusLines from '../../components/StatusLines'
import { EQUIPMENTS, SIGNUP_STEPS } from '../../constants/workoutProgram'
import { STYLES } from '../../util/styles'
import OnboardHeading from '../../components/OnboardHeading'
import { Divider } from 'react-native-elements'
import WorkoutPref from '../../components/WorkoutPref'
import { OTHERDAY_LIME } from '../../constants/colors'
import { RFPercentage } from 'react-native-responsive-fontsize'
import CustomBtn from '../../components/CustomBtn'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types'
import { RootStackParamList } from 'NavType'

type OnboardSixProps = NativeStackScreenProps<RootStackParamList, 'OnboardSix'>

const OnboardSix = ({ navigation, route }: OnboardSixProps) => {
  const [equipmentList, setEquipmentList] = useState<string[]>([])

  const handleSelect = (equipment: string) => {
    const currentList = new Set(equipmentList)

    if (currentList.has(equipment)) {
      currentList.delete(equipment)
    } else {
      currentList.add(equipment)
    }

    setEquipmentList([...currentList])
  }

  const handleNextPress = () => {
    const data = { ...route.params, equipment_list: equipmentList }

    navigation.navigate('OnboardSeven', data)
  }

  return (
    <SafeAreaView style={[STYLES.container]}>
      <StatusLines steps={SIGNUP_STEPS} activeStep={5} />
      <OnboardHeading title="What types of equipment do you have?" />
      <Divider style={{ marginBottom: RFPercentage(1) }} />
      <View style={styles.listWrapper}>
        <FlatList
          data={EQUIPMENTS}
          renderItem={({ item }) => (
            <WorkoutPref
              title={item}
              onPress={handleSelect}
              checkBox={true}
              checked={equipmentList.includes(item) ? true : false}
              style={
                equipmentList.includes(item)
                  ? { borderColor: OTHERDAY_LIME }
                  : undefined
              }
            />
          )}
        />
      </View>
      <View style={styles.nextBtn}>
        <CustomBtn
          title="Next"
          icon={<FontAwesomeIcon icon={faArrowRight} />}
          onPress={handleNextPress}
        />
      </View>
    </SafeAreaView>
  )
}

export default OnboardSix

const styles = StyleSheet.create({
  listWrapper: {
    height: RFPercentage(55)
  },
  nextBtn: {
    width: '100%',
    position: 'absolute',
    bottom: RFPercentage(4),
    justifyContent: 'center',
    alignItems: 'center'
  }
})
