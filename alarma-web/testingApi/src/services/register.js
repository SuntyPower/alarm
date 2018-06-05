import apiService from './api'

const registerService = {}

registerService.register = function ({
  firstName,
  lastName,
  username,
  email,
  password
}) {
  return apiService.post('/createUser',{
    firstName,
    lastName,
    username,
    email,
    password
  })
    .then(res => res.data)
}

export default registerService
