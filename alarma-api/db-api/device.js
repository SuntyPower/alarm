import mongoose from 'mongoose'
import Device from '../models/device'
import Debug from 'debug'
import User from './user'
const debug = new Debug('api/db-api/device')

export default {
  // creando dispositivo a un usuario
  create: async (_id) => {
    const user = await User.findById(_id)
    const device = new Device({
      _id: new mongoose.Types.ObjectId(),
      user: _id,
      name: 'alarma casa',
      state: 0
    })

    debug(`creando device ${device} al device `)
    const savedDevice = await device.save()
    try {
      user.devices.push(savedDevice)
      await user.save()
      return savedDevice
    } catch (e) {
      debug(`error ${e}`)
    }
  },
  // devuelve un dispositivo por :id
  findById: (_id) => {
    debug(`buscando dispositivo por id: ${_id}`)
    return Device.findById(_id)
  },

  // devuelve un array de todos los reportes de los sensores del dispositivo
  findAllReports: (_id) => {
    debug(`buscando todos los reportes del dispositivo con id: ${_id}`)
    return Device.findById(_id).populate({
      path: 'reports',
      model: 'Sensor',
      options: {
        sort: {
          'createdAt': 'descending'
        }
      }
    })
  },

  // devuelve los ultimos 10 reports de los sensores del dispositivo
  findLastReports: (_id) => {
    debug(`buscando todos los reportes del dispositivo con id: ${_id}`)
    return Device.findById(_id).populate('reports').sort('-createdAt').limit(10)
  },

  setAlarmState: (_id, state) => {
    debug(`Actualizando estado ${state} del dispositivo ${_id}`)
    Device.findById(_id, function (err, device) {
      if (err) return err

      device.state = state
      device.save(function (err, updatedState) {
        if (err) return err
        return updatedState
      })
    })
  }
}
