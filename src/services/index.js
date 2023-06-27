import axios from 'axios'

export const BASEURL = 'http://127.0.0.1:8000'
// export const BASEURL = 'http://192.168.4.27:8000'

export const verifyLogin = async (token) => {
  console.log(token)
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
