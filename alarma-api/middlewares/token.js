import jwt from 'jsonwebtoken'
import Debug from 'debug'
import { secret } from '../config'
const debug = new Debug('api/middleware/token')

export const required = (req, res, next) => {
  const tok = req.headers.authorization
  if (!tok) {
    debug('JWT was not enctrypted with our secret')
    return res.status(401).json({
      message: 'Unauthorized',
      tok
    })
  }

  debug(tok.split(' ')[0])
  if (req.headers && req.headers.authorization && tok.split(' ')[0] === 'Bearer') {
    jwt.verify(tok.split(' ')[1], secret, (err, token) => {
      if (err) {
        debug('JWT was not enctrypted with our secret')
        return res.status(401).json({
          message: 'Unauthorized',
          error: err,
          token
        })
      }
      debug(`token verificado con exito ${JSON.stringify(token)}`)
      req.token = token
      next()
    })
  }
}
