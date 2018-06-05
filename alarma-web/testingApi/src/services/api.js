import trae from 'trae'
import configService from './config'

const apiService = trae.create({
  baseUrl: configService.apiUrl
})

export default apiService
