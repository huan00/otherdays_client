import {
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import React, { useEffect, useRef, useState } from 'react'
import StatusLines from '../../components/StatusLines'
import { BACKGROUND_COLOR, TEXT_COLOR } from '../../constants/colors'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Divider } from 'react-native-elements'
import CustomBtn from '../../components/CustomBtn'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  faArrowRight,
  faCamera,
  faCameraRotate
} from '@fortawesome/free-solid-svg-icons'
import { Camera, CameraType } from 'expo-camera'
import { RootStackParamList } from 'NavType'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import OnboardHeading from '../../components/OnboardHeading'

type OnboardFourProps = NativeStackScreenProps<
  RootStackParamList,
  'OnboardFour'
>

type userData = {
  first_name: string
  last_name: string
  sex: string
  weight: number
  height: { feet: number; inches: number }
  profile_image: string
}

const OnboardFour = ({ navigation, route }: OnboardFourProps) => {
  const [image, setImage] = useState<string>()
  const [type, setType] = useState(CameraType.back)
  const [permission, requestPermission] = Camera.useCameraPermissions()
  const cameraRef = useRef<any>(null)

  if (!permission) {
    return <View />
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.permissionWrapper}>
        <Text style={[{ textAlign: 'center' }, styles.text]}>
          We need your permission to show the camera
        </Text>
        <CustomBtn
          onPress={requestPermission}
          title="Grant Permission"
          btnStyle={{ marginTop: RFPercentage(3) }}
        />
      </View>
    )
  }

  console.log(image)

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    )
  }

  const takePicture = async () => {
    const { uri } = await cameraRef?.current?.takePictureAsync({ Option: 100 })

    setImage(uri)
  }

  const pressRegister = () => {
    if (!image) return
    const { userInfo } = route.params

    navigation.navigate('OnboardFive', {
      userInfo: { ...userInfo, profile_image: image }
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusLines steps={5} activeStep={3} />

      <OnboardHeading
        title="
      Now let’s get a smile going for the profile picture"
      />
      <Divider />
      <View style={styles.content}>
        {image ? (
          <TouchableOpacity
            onPress={() => setImage(undefined)}
            style={styles.camera}
          >
            <Image source={{ uri: image }} style={styles.camera} />
          </TouchableOpacity>
        ) : (
          <Camera type={type} style={styles.camera} ref={cameraRef}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraType}
              >
                <Text style={styles.text}>
                  <FontAwesomeIcon
                    icon={faCameraRotate}
                    color={TEXT_COLOR}
                    size={RFPercentage(5)}
                  />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.takePictureBtn}
                onPress={takePicture}
              >
                <FontAwesomeIcon
                  icon={faCamera}
                  color={TEXT_COLOR}
                  size={RFPercentage(4)}
                />
              </TouchableOpacity>
            </View>
          </Camera>
        )}
      </View>
      {image && (
        <View style={styles.nextBtn}>
          <CustomBtn
            title="Next"
            icon={<FontAwesomeIcon icon={faArrowRight} />}
            onPress={pressRegister}
          />
        </View>
      )}
    </SafeAreaView>
  )
}

export default OnboardFour

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    height: '100%',
    width: '100%'
  },
  permissionWrapper: {
    backgroundColor: BACKGROUND_COLOR,
    height: '100%',
    width: '100%',
    justifyContent: 'center'
  },
  content: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RFPercentage(2)
  },
  profileWrapper: {
    width: '80%',
    aspectRatio: 1 / 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Dimensions.get('window').width / 2,
    overflow: 'hidden'
  },
  nextBtn: {
    width: '100%',
    position: 'absolute',
    bottom: RFPercentage(4),
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonContainer: {
    width: '100%',
    // flexDirection: 'row',
    backgroundColor: 'transparent',
    // justifyContent: 'center',
    // alignItems: 'center',

    position: 'absolute',
    bottom: 0
  },
  button: {
    position: 'absolute',
    right: 0,
    marginRight: RFPercentage(1)
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  camera: {
    borderRadius: Dimensions.get('window').width,
    width: '100%',
    aspectRatio: 1 / 1
  },
  takePictureBtn: {
    alignSelf: 'center'
  }
})
