const mosca = require('mosca')
const db = require('alarma-db')
const { parsePayload } = require('./utils')
const redis = require('redis')
const trae = require('trae')
const socket = require('socket.io-client')('http://localhost:4000')
const api = trae.create({
  baseUrl: 'http://localhost:4000/api'
})

const settings = {
  port: 1883,
  type: 'redis',
  redis,
  return_buffers:true
}

const config = {
    database: process.env.DB_NAME || 'alarm',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'ieochj28',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql'
  }

const server= new mosca.Server(settings)

let Device,Report

server.on('published', async (packet, client) => {
  console.log(`Connected device Received: ${packet.topic}`)
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

    break

    case 'check':
        console.log(`message Payload: ${packet.payload}`)
        payload = parsePayload(packet.payload)
        console.log("decode payload to JSON: ",payload);
    break
}
})



server.on('ready', async () => {
  const services = await db(config).catch(handleFatalError)
  Device = services.Device
  Report = services.Report

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
