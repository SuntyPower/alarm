import express from 'express'
import {required} from '../middlewares'
import Debug from 'debug'
import Device from '../db-api/device'
import User from '../db-api/user'
import Sensor from '../db-api/sensor'

const debug = new Debug('api/routes/device')
const app = express.Router()

// GET /api/devices return all devices from the current user
app.get('/', required, async (req, res) => {
  const _id = req.token.user._id

  debug(`buscando todos los dispositivos del usuario con email ${JSON.stringify(_id)}`)
  const devices = await User.findAllDevices(_id).catch(err => debug(`error ${err}`))
  res.status(200).json(devices)
})

// GET /api/devices/:id return device current :id
app.get('/:id', required, (req, res) => {
  const device = {
    version: 1,
    reports: [{i: 2}, {i: 2}]
  }
  res.status(200).json(device)
})

// GET /api/devices/:id/reports return all reports of device with :id
app.get('/:id/reports', required, async (req, res) => {
  const reports = await Device.findAllReports(req.params.id).catch(err => debug(`error ${err}`))
  res.status(200).json(reports)
})

// GET /api/devices/:id/lastReports return max 10 last reports from device :id
app.get('/:id/lastReports', required, async (req, res) => {
  const reports = await Device.findLastReports(req.params.id).catch(err => debug(`error ${err}`))
  res.status(200).json({
    message: 'ultimos 10 reportes',
    reports
  })
})

// GET /api/devices/:id/zones
app.get('/:id/zones', required, (req, res) => {
  const _id = req.params.id
  const zones = 6

  res.status(200).json({_id, zones})
})

// POST /api/devices/create
app.post('/create', required, async (req, res) => {
  const _id = req.token.user._id
  debug(`/create device asociado a usuario email ${_id}`)
  const device = await Device.create(_id)
    .catch((err) => debug(`error /create ${err}`))

  res.status(201).json({
    message: 'Device creado con exito',
    device
  })
})

// DELETE /api/devices/:id
app.delete('/:id', required, (req, res) => {
  const { id } = req.body
  res.status(200).json({
    message: `Device id: ${id} borrado con exito`
  })
})

// POST /api/devices/report/create

app.post('/report/create', required, async (req, res) => {
  const {sensor, _id} = req.body
  const report = await Sensor.create(sensor, _id)
  res.status(201).json({
    message: 'reporte de sensor guardado con exito',
    report
  })
})
export default app
