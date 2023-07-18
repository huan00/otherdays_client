import axios from 'axios'

// export const BASEURL = 'http://127.0.0.1:8000'
export const BASEURL = 'https://fitnesstrackerbackend-production.up.railway.app'

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
