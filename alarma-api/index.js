import mongoose from 'mongoose'
import Debug from 'debug'
import { mongoUrl, port } from './config'
import app from './app'

const debug = new Debug('api')

async function start () {
  await mongoose.connect(mongoUrl)

  app.listen(port, () => {
    debug(`servidor corriendo en puerto ${port}`)
  })
}

start()
