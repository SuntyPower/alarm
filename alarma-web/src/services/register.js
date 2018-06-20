import apiService from './api'

const registerService = {}

registerService.register = function ({
  firstName,
  lastName,
  email,
  password
}) {
  return apiService.post('/auth/register', {
    firstName,
    lastName,
    email,
    password
  })
    .then(res => res.data)
}

export default registerService
