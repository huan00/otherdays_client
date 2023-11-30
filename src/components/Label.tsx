import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  Text,
  TextInputChangeEventData,
  View,
  KeyboardTypeOptions
} from 'react-native'
import React, { useEffect } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'

type label = {
  value: string
  label: string
  edit?: boolean
  editRef?: React.MutableRefObject<TextInput | null>
  inputType?: KeyboardTypeOptions
  onChange: (
    label: string,
    // event: string
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => void
}

const Label = ({
  value,
  label,
  onChange,
  edit = false,
  editRef,
  inputType
}: label) => {
  useEffect(() => {
    if (edit && label === 'first_name') {
      editRef?.current?.focus()
    }
  }, [edit])

  return (
    <View style={styles.container}>
      <Text style={{ color: 'white', fontSize: RFPercentage(1.8) }}>
        {label.length > 0
          ? `${label.toLocaleUpperCase().replace('_', ' ')}: `
          : ''}
      </Text>
      <TextInput
        ref={editRef}
        value={value}
        keyboardType={inputType}
        onChange={(event) => onChange(label, event)}
        placeholderTextColor={'white'}
        style={[styles.textInput, !edit && { color: 'gray' }]}
        editable={edit}
        selectTextOnFocus={true}
      />
    </View>
  )
}

export default Label

const styles = StyleSheet.create({
  container: {
    marginVertical: RFPercentage(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  textInput: {
    flex: 1,
    borderBottomColor: 'white',
    borderWidth: 1,
    fontSize: RFPercentage(2),
    color: 'white'
  },
  editWrapper: {
    flexDirection: 'row',
    marginLeft: RFPercentage(1)
  },
  edit: {}
})
