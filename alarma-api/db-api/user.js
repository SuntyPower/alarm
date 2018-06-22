import User from '../models/user'
import Debug from 'debug'
import mongoose from 'mongoose'
import { hashSync as hash } from 'bcryptjs'

const debug = new Debug('api/db-api/user')
export default {

  // create new User
  create: async (u) => {
    debug(`creando usuario: ${JSON.stringify(u)}`)

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.email,
      password: hash(u.password)
    })

    debug(`usuario creado: ${JSON.stringify(user)}`)

    const usersaved = await user.save()
      .catch(err => debug(`error creando usuario: ${JSON.stringify(u)},\n error: ${err}`))
    return usersaved
  },

  // find by Email
  findByEmail: (email) => {
    debug(`encontrando usuario por email: ${email}`)
    return User.findOne({email})
  },

  // devuelve un usuario por :id
  findById: async (_id) => {
    debug(`buscando dispositivo por id: ${_id}`)
    const user = await User.findById(_id)
    return user
  },

  // todos los dispositovs del usuario
  findAllDevices: async (_id) => {
    debug(`todos lso dispositivos del usuario con id ${_id}`)
    try {
      const user = await User.findById(_id).populate({
        path: 'devices'
      })
      return user.devices
    } catch (e) {
      debug(e)
    }
  },

  // only for  test
  getUsers: async () => {
    const users = await User.find()
    return users
  }
}
