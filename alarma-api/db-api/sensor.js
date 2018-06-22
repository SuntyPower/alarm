import Sensor from '../models/sensor'
import Device from './device'
import Debug from 'debug'

const debug = new Debug('api/db-api/sensor')

export default {
  // crear reporte de sensor a un dispositivo
  create: async (s, _id) => {
    const device = await Device.findById(_id)
    const sensor = new Sensor({
      type: s.type,
      zone: s.zone,
      triggered: s.triggered,
      active: s.active,
      device: _id
    })
    debug(`creando Reporte de sensor ${s} al device ${JSON.stringify(device)}`)
    const savedSensor = await sensor.save()
    try {
      device.reports.push(savedSensor)
      await device.save()
      return savedSensor
    } catch (e) {
      debug(`error ${e}`)
    }
  }
}
