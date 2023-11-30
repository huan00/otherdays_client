import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Label from './Label'
import { RFPercentage } from 'react-native-responsive-fontsize'

type Props = {
  title: string
  data: any
}

const ProfileSetting = ({ title, data }: Props) => {
  const [isActive, setIsActive] = useState(false)

  const keys = Object.keys(data)
  const handleUpdate = () => {}
  return (
    <TouchableOpacity>
      <Text
        style={styles.title}
        onPress={() => {
          setIsActive(!isActive)
        }}
      >
        {title}
      </Text>
      <View style={{ display: isActive ? 'flex' : 'none' }}>
        {keys.map((key) => (
          <View key={key}>
            <Label value={data[key]} label={key} onChange={() => {}} />
          </View>
        ))}
      </View>
    </TouchableOpacity>
  )
}

export default ProfileSetting

const styles = StyleSheet.create({
  title: {
    fontSize: RFPercentage(2.5),
    color: 'white',
    marginBottom: RFPercentage(2)
  }
})
