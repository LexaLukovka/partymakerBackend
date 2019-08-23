/* eslint-disable no-console */
const Server = use('Server')
const Event = use('Event')
const Room = use('App/Models/Room')
const moment = require('moment')
const auth = require('./middleware/auth')
const io = use('socket.io')(Server.getInstance(), {
  serveClient: true,
  transports: ['polling', 'websocket'],
  pingInterval: 5000,
  pingTimeout: 10000,
})


const updateUser = async (room, user) =>
  room.users()
    .pivotQuery()
    .where({ user_id: user.id })
    .update({ last_seen: moment().format('YYYY-MM-DD HH:mm:ss'), })

const activeUsers = {}

const setupListeners = (room_id) => async (socket) => {
  const room = await Room.find(room_id)
  const { user } = socket

  activeUsers[socket.user.id] = user

  console.log('connected', user.name)

  socket.emit('online', Object.values(activeUsers).map(u => u.id))

  Event.on('ws:message', (message) => socket.emit('message', message))
  Event.on('ws:guest:left', (leftUser) => socket.emit('guest:left', leftUser))
  Event.on('ws:guest:joined', (joinedUser) => socket.emit('guest:joined', joinedUser))

  socket.on('disconnect', async () => {
    delete activeUsers[user.id]
    socket.emit('online', Object.values(activeUsers).map(u => u.id))
    console.log('disconnected', user.name)
    Event.removeAllListeners('ws:message')
    Event.removeAllListeners('ws:guest:left')
    Event.removeAllListeners('ws:guest:joined')
    await updateUser(room, user)
  })

}

const activateNamespace = (room_id) => {
  const namespace = io.of(`/rooms/${room_id}`)
  namespace.use(auth).on('connection', setupListeners(room_id, namespace))
}

module.exports = activateNamespace
