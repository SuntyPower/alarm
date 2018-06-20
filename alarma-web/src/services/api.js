import trae from 'trae'
import configService from './config'

trae.before((config) => {
  // const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJQb3dlciIsImxhc3ROYW1lIjoiU3VudHkiLCJlbWFpbCI6Imd1aWxlQGd1aWxsZS5jb20iLCJpYXQiOjE1Mjk0MjI2MTN9.RERpd_uKav70LCCz88BFdk1UHhXNYlkyDPAkWEKZnR4'
  const token = `Bearer ${window.localStorage.token}`
  config.headers['Authorization'] = token

  return config
})
const apiService = trae.create({
  baseUrl: configService.apiUrl
})

export default apiService
