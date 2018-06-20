import apiService from './api'

const reportsService = {}

reportsService.search = function (_id) {
  return apiService.get(`/devices/${_id}/reports`)
    .then(res => res.data)
}

export default reportsService
