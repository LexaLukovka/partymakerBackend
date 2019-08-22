const jwt = require('jsonwebtoken')
const Env = use('Env')

const authMiddleware = (socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(socket.handshake.query.token, Env.get('APP_KEY'), (err, decoded) => {
      if (err) return next(new Error('Authentication error'))
      socket.user = decoded.data
      return next()
    })
  } else {
    next(new Error('Authentication error'))
  }
}

module.exports = authMiddleware
