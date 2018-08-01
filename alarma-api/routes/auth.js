import express from 'express'
import Debug from 'debug'
import jwt from 'jsonwebtoken'
import { secret } from '../config'
import User from '../db-api/user'
import emailValidator from 'email-validator'
import {compareSync as comparePasswords} from 'bcryptjs'

const app = express.Router()

const debug = new Debug('api/routes/auth')

const createToken = function (user) {
  user.password = null
  return jwt.sign({
    user
  }, secret)
}

// only testing
app.get('/users', async (req, res) => {
  debug(`devolviendo usuarios`)
  const users = await User.getUsers()
    .catch((err) => {
      debug(`error al devolover usuarios ${err}`)
      return handleBadRequest(res, err.message)
    })
  res.status(200).json({
    message: 'users',
    users
  })
})

// POST login de usuario por email y contraseña
app.post('/login', async (req, res) => {
  debug(`entrando a login`)
  const { email, password } = req.body
  if (!emailValidator.validate(email)) {
    res.status(400).json({
      message: 'debe ingresar un email válido',
      email
    })
    return
  }

  const user = await User.findByEmail(email)

  if (!user) {
    debug(`User with email ${email} not found`)
    return handleLoginFailed(res)
  }

  if (comparePasswords(password, user.password)) {
    const token = createToken(user)

    res.status(200).json({
      message: 'logueado con exito',
      token
    })
  } else {
    return handleLoginFailed(res)
  }
})

// POST registro de usuarios en la API
app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  if (!emailValidator.validate(email)) {
    res.status(400).json({
      message: 'debe ingresar un email válido',
      email
    })
    return
  }

  if (await User.findByEmail(email)) {
    res.status(400).json({
      message: 'ya existe un usuario registrado con ese email',
      email
    })
    return
  }

  if (password.length < 8 || !password || !firstName || !lastName || !email) {
    res.status(400).json({
      length: password.length,
      message: 'La contraseña debe tener minimo 8 caracteres',
      password
    })
    return
  }

  const u = {
    firstName,
    lastName,
    email,
    password
  }

  debug(`creando usuario ${JSON.stringify(u)}`)
  const user = await User.create(u)
  res.status(201).json({
    message: 'Usuario guardado',
    user
  })
  handleLoginFailed(res, 'hola')
})

function handleLoginFailed (res, message) {
  return res.status(401).json({
    message: 'Login failed',
    error: message || 'Email and password don\'t match'
  })
}

function handleBadRequest (res, message) {
  return res.status(400).json({
    message: 'Bad Request',
    error: message || 'bad request'
  })
}

export default app
