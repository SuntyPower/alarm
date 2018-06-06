import apiService from './api'

const reportsService = {}

reportsService.search = function (uuid) {
  return apiService.get('/reports')
    .then(res => res.data)
}

export default reportsService
