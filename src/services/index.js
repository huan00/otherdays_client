import axios from 'axios'
import { Platform } from 'react-native'
import * as SecureStore from 'expo-secure-store'

export const BASEURL = 'http://127.0.0.1:8000'
// export const BASEURL =
//   Platform.OS === 'ios' ? 'http://127.0.0.1:8000' : 'http://10.0.2.2:3000'
// export const BASEURL = 'https://fitnesstrackerbackend-production.up.railway.app'

export const verifyLogin = async (token) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'token ' + token
  }
  const res = await axios.post(
    `${BASEURL}/fitness/verifylogin`,
    {},
    { headers }
  )
  // const headers = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: 'token ' + token
  //   }
  // }
  // const res = await fetch(`${BASEURL}/fitness/verifylogin`, { headers })

  return res.data
}

export const updateUser = async (data, token) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'token ' + token
  }

  const res = await axios.put(`${BASEURL}/fitness/updateuser`, data, {
    headers
  })

  console.log(res)
}

export const getToken = async () => {
  const res =
    Platform.OS === 'web'
      ? localStorage.getItem('fitnessLoginToken')
      : await SecureStore.getItemAsync('fitnessLoginToken')
  const token = res?.replace(/"/g, '')

  return token
}
