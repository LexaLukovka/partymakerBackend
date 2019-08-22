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


const updateUser = async (room, user, is_online) =>
  room.users()
    .pivotQuery()
    .where({ user_id: user.id })
    .update({
      is_online,
      last_seen: moment().format('YYYY-MM-DD HH:mm:ss'),
    })

const setupListeners = (room_id, namespace) => async (socket) => {
  const room = await Room.find(room_id)
  const { user } = socket

  console.log('connected', user.name)

  socket.emit('online', user.id)

  await updateUser(room, user, true)

  Event.on('ws:message', (message) => socket.emit('message', message))


  socket.on('disconnect', async () => {
    namespace.emit('offline', user.id)
    await updateUser(room, user, false)
    console.log('disconnected', user.name)
    Event.removeAllListeners('ws:message')
  })

}

const activateNamespace = (room_id) => {
  const namespace = io.of(`/rooms/${room_id}`)
  namespace.use(auth).on('connection', setupListeners(room_id, namespace))
}

module.exports = activateNamespace
