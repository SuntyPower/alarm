'use strict'


const http = require('http')
const express = require('express')
const port = process.env.PORT || 4000
const app =express()
const api = require('./api')
const server = http.createServer(app)
const io = require('socket.io')(server)
const db = require('alarma-db')
const uuid = require('uuid/v1')
const random  = require('random-js')()
const bodyParser = require('body-parser')
const config = require('./config')
const Trae = require('trae')


const trae = Trae.create({
  baseUrl: 'http://localhost:4000/api/'
})



app.use('/api',api)



app.use((err, req, res, next) => {
  console.log(`Error: ${err.message}`)

  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message })
  }

  res.status(500).send({ error: err.message })
})



function handleFatalError (err) {
  console.error(`[fatal error] ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}


if (!module.parent) {
  process.on('uncaughtException', handleFatalError)
  process.on('unhandledRejection', handleFatalError)

  server.listen(port, () => {
    console.log(`[alarma-app] server listening on port ${port}`)
  })
}



// <---------- SOCKET PART -----------> //


io.on('connection', (socket)=>{
  console.log('SOCKET CONNECTION: ')
  socket.on('sensor/motion',(socket) =>{
    console.log('\n\n\n\n\n\n FUCK');
    console.log(socket);
    trae.get(`createReport/${socket.device.uuid}/${socket.report.triggered}/${socket.report.zone}/${socket.report.type}`)
    io.emit('report',socket)
  })
})





module.exports = server
