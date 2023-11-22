import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useRef, useState } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck, faEdit } from '@fortawesome/free-solid-svg-icons'

type label = {
  value: string
  label: string
  edit?: boolean
  onBlur: (
    label: string,
    // event: string
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => void
}

const Label = ({ value, label, onBlur, edit = false }: label) => {
  // const [edit, setEdit] = useState<boolean>(false)
  const refInput = useRef<TextInput>(null)

  // const handleEdit = () => {
  //   setEdit(!edit)

  //   if (edit) refInput.current?.focus()
  // }

  return (
    <View style={styles.container}>
      <TextInput
        ref={refInput}
        defaultValue={value}
        onBlur={(event) => onBlur(label, event)}
        placeholderTextColor={'white'}
        style={styles.textInput}
        editable={edit}
        selection={{ start: 1, end: 5 }}
      />
      {/* <TouchableOpacity style={styles.editWrapper} onPress={handleEdit}>
        {edit ? (
          <FontAwesomeIcon
            icon={faCheck}
            color="white"
            size={RFPercentage(2.5)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faEdit}
            color="white"
            size={RFPercentage(2.5)}
          />
        )}
      </TouchableOpacity> */}
    </View>
  )
}

export default Label

const styles = StyleSheet.create({
  container: {
    marginVertical: RFPercentage(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
