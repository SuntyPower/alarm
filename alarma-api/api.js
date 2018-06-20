const express    = require('express')
const api= express.Router()
const db = require('alarma-db')
const config = require('./config')
const jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')

let Device,Report,User,services

api.use(bodyParser.json())

api.use('*', async (req, res, next) => {

  if (!services) {
    console.log('Connecting to database')
    try {
      services = await db(config.db)
    } catch (e) {
      return next(e)
    }

    Device = services.Device
    Report = services.Report
    User = services.User
  }
  next()
})

api.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
 })

function createToken(user)  {
  return  jwt.sign(
      {
        user,
        exp: 30000
      },
      '12345'
  )
}

api.get('/reports',async (req,res)=>{
    const reports= await Report.findAll().catch((err) => {console.log(err)})
    const services= reports
    res.send(services)
})

api.get('/devices',async (req,res)=>{
    const devices= await Device.findAll().catch((err) => {console.log(err)})
    const services= devices
      res.send(services)

})

api.get('/users',async (req,res)=>{
    const users= await User.findAll().catch((err) => {console.log(err)})
    const services= users
      res.send(services)

})

api.get('/createDevice/:uuid/:username',async (req,res)=>{
  const device= await Device.create({
    uuid: req.params.uuid,
    zones: "casa",
    version: 1,
    state: 1
  },req.params.username)
  res.status(200).send(device)
})

api.post('/register',async(req,res)=>{
  const {firstName,lastName,username,email,password}=req.body

  const user ={
    firstName,
    lastName,
    username,
    email,
    password
  }

  const check = await User.checkNewUser(user.email)
  if (check) {
    res.send({
      message: "el email y/o username ya esta en uso"
    })
  }

  try {
    console.log("por crear usuario en database ",user)
    await createUser(user)
  } catch (e) {
    console.log('Hubo un error al crear usuario\n error', e)
    res.send({
      message: 'Hubu un error al crear usuario'
    })
  }

  user.password = ''

  const token = createToken(JSON.stringify(user))

  res.status(201).json({
    message:"Usuario guardado con éxito",
    token
  })
})

api.get('/createReport/:uuid/:triggered/:zone/:type', async(req,res)=>{
  const triggered = req.params.triggered === '1' ? 1 : 0
  const zone = Number(req.params.zone)
  const type = req.params.type
  const uuid = req.params.uuid

  const report=await Report.create(
     uuid,{
     triggered: triggered,
     zone: zone,
     type: type
    })

  report.triggered = report.triggered ? 1 : 0

  res.status(201).send(report)
})



function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}


module.exports = api
