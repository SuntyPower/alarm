const express    = require('express');

//for test
const api= express.Router()
const db = require('alarma-db')
const config = require('./config')
const jwt = require('jsonwebtoken');
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
  res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });



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

const createToken = (user) => jwt.sign({ user }, "12345", { expiresIn: 86400 })

api.post('/createUser',async(req,res)=>{
const {firstName,lastName,username,email,password}=req.body
console.log(req.body)

const u = await User.create({
  firstName,
  lastName,
  username,
  email,
  password
})
if(!u){
  res.send({
    message: "este Usuario ya esta en uso"
  })
}
console.log("creando usuario ",u)
const token =createToken(u)
res.status(201).json({
  message:"Usuario guardado con éxito",
  token,
  userId: u.id,
  firstName,
  lastName,
  email,
  username
})
})

api.get('/createReport/:uuid/:triggered/:zone/:type', async(req,res)=>{
  const triggered = req.params.triggered === '1' ? 1 : 0
  const zone = Number(req.params.zone)
  const type = req.params.type
  const uuid = req.params.uuid
  console.log("GGGGGGGGGGGG",triggered, uuid, type, zone)

  const report=await Report.create(
     uuid,{
     triggered: triggered,
     zone: zone,
     type: type
    }
   ).catch((err) => {
    res.send("MAL")
  })
  report.triggered = report.triggered ? 1 : 0
  console.log('TRIGEREED\n\n\n',report)
  res.status(200).send(report)
  })



function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

module.exports=api
