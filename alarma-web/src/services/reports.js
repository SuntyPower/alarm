import apiService from './api'

const reportsService = {}

reportsService.search = function (_id) {
  console.log('device id: ', _id)
  return apiService.get(`/devices/${_id}/reports`)
    .then(res => res.data)
}

reportsService.setAlarmState = function (_id, alarmState) {
  console.log('Device id:', _id, 'Alarm State: ', alarmState)
  return apiService.get(`/devices/alarmState/${_id}/${alarmState}`)
  .then(res => res.data)
}
export default reportsService
