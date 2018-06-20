import apiService from './api'

const reportsService = {}

reportsService.search = function (uuid) {
  return apiService.get('/devices/5b2a192ccefe294e12e366ca/reports')
    .then(res => res.data)
}

export default reportsService
