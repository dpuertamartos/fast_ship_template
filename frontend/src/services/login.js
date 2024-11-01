import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const googleLogin = async (authorizationCode, redirectUri) => {
  const response = await axios.post(`${baseUrl}/google`, {
    code: authorizationCode,
    redirectUri: redirectUri,
  })
  return response.data
}

export default { login, googleLogin }
