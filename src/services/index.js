import axios from 'axios'
import { Platform } from 'react-native'
import * as SecureStore from 'expo-secure-store'

export const BASEURL = 'http://127.0.0.1:8000'
// export const BASEURL =
//   Platform.OS === 'ios' ? 'http://127.0.0.1:8000' : 'http://10.0.2.2:3000'
// export const BASEURL = 'https://fitnesstrackerbackend-production.up.railway.app'
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
  return res.data
}

export const updateUser = async (data, token) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'token ' + token
  }

  await axios.put(`${BASEURL}/fitness/updateuser`, data, {
    headers
  })
}

export const updateUserPref = async (data, token) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'token ' + token
  }

  return await axios.put(`${BASEURL}/fitness/updateuserpref`, data, {
    headers
  })
}
export const updateUserWorkoutGoal = async (data, token) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'token ' + token
  }

  return await axios.put(`${BASEURL}/fitness/updateuserworkoutgoal`, data, {
    headers
  })
}
export const updateUserEquipment = async (data, token) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'token ' + token
  }

  return await axios.put(`${BASEURL}/fitness/updateuserequipment`, data, {
    headers
  })
}

export const getToken = async () => {
  const res =
    Platform.OS === 'web'
      ? localStorage.getItem('fitnessLoginToken')
      : await SecureStore.getItemAsync('fitnessLoginToken')
  const token = res?.replace(/"/g, '')

  return token
}
