import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { STYLES } from '../util/styles'

const MyProfile = () => {
  return (
    <View>
      <Text
        style={[
          STYLES.whiteText,
          { marginTop: RFPercentage(2) },
          styles.headerText
        ]}
        onPress={() => {
          setIsUserProfile(!isUserProfile)
        }}
      >
        My Profile
      </Text>
      <View
        style={{
          display: isUserProfile ? 'flex' : 'none',
          paddingLeft: RFPercentage(3)
        }}
      >
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
        <Label value={user.gender} label={'gender'} onChange={handleUpdate} />
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
      </View>
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
