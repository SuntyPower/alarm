import apiService from './api'

const loginServices = {}

loginServices.login = function ({
  email,
  password
}) {
  return apiService.post('/auth/login', {
    email,
    password
  })
    .then(res => res.data)
}

export default loginServices
