import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { FormDataType } from '../types'

interface Props {
  data: {
    label: string
    value: string
  }[]
  setData: React.Dispatch<React.SetStateAction<FormDataType>>
  formData: FormDataType
  title: string
}

const Dropdown = ({ data, setData, title, formData }: Props) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)
  const [items, setItems] = useState([...data])

  return (
    <DropDownPicker
      placeholder={items[0].value}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      onChangeValue={(value) => setData({ ...formData, [title]: value })}
      containerStyle={{}}
      textStyle={{
        color: 'white',
        fontSize: RFPercentage(1.5),
        flexDirection: 'row',
        justifyContent: 'flex-start'
      }}
      theme="DARK"
    />
  )
}

export default Dropdown

const styles = StyleSheet.create({})
