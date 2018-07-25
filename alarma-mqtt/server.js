const mosca = require('mosca')
const { parsePayload } = require('./utils')
const redis = require('redis')
const trae = require('trae')
const socket = require('socket.io-client')('http://localhost:4000')
const api = trae.create({
  baseUrl: 'http://localhost:3000/api'
})

const settings = {
  port: 1883,
  type: 'redis',
  redis,
  return_buffers:true
}


const server= new mosca.Server(settings)


server.on('published', async (packet, client) => {
  console.log(`Topic : ${packet.topic}, \n Payload ${packet.payload}`)
  switch (packet.topic) {

    case 'sensor/motion':
        console.log('Device reportando sensores');
        console.log(`message Payload: ${packet.payload}`)
        let payload = parsePayload(packet.payload)
        console.log("decode payload to JSON: ",payload);
        //por ahora le paso solo el report
        const device = payload.device
        const report = payload.report
        console.log("DEVICE Y REPORT",device, report);

        socket.emit('sensor/motion',{device,report})
        api.post('/devices/report/create', {
          _id: device.uuid,
          sensor: {
            type: report.type,
            zone: report.zone,
            triggered: report.triggered,
            active: true
          }
        })
        break

    case 'check':
        console.log(`message Payload: ${packet.payload}`)
        payload = parsePayload(packet.payload)
        console.log("decode payload to JSON: ",payload);
        break
    case 'set/AlarmState':
        console.log(`setAlarm  token ${packet.payload}`)
        const message = {
          topic: 'setAlarmState',
          payload: packet.payload
        }
        server.publish(message,() => {
          console.log('alarm status done')
        })
      break
}
})

socket.on('report',socket => {
  console.log("EL SOCKETE",socket)
})


server.on('ready', async () => {
  console.log(`[platziverse-mqtt] server is running at port ${settings.port} \n`)
})


server.on('error', handleFatalError)


function handleFatalError (err) {
  console.error(`[fatal error] ${err.message}\n`)
  console.error(err.stack)
  process.exit(1)
}

function handleError (err) {
  console.error(`'[error]' ${err.message}\n`)
  console.error(err.stack)
}

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)
