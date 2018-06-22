import http from 'http'
import Debug from 'debug'
import mongoose from 'mongoose'
import app from './app'
import {mongoUrl, port} from './config'
const debug = new Debug('api/index')


async function start() {
  await mongoose.connect(mongoUrl)

  app.listen(port, () => {
    debug(`Server corriendo en el puerto ${port}`)
  })
}


start()
