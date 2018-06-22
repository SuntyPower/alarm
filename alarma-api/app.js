import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import { device, auth } from './routes'
const app = express()

app.use(bodyParser.json())

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS')
    next()
  })
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(process.cwd(), 'dist')))
}

app.use('/api/devices', device)
app.use('/api/auth', auth)
export default app
