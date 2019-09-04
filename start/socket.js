const Ws = use('Ws')
const RoomUser = use('App/Models/RoomUser')
const moment = require('moment')


const startConnection = async ({ socket, auth }) => {
  const room_id = socket.topic.substring(5, 6)
  const user_id = auth.user.id

  await RoomUser
    .query()
    .where({ user_id, room_id })
    .update({ is_online: true })

  const onlineUsers = await RoomUser.query().where({ is_online: true }).fetch()

  socket.broadcastToAll('online', onlineUsers.toJSON().map(p => p.user_id))

}

const closeConnection = async ({ socket, _auth_: auth }) => {
  const room_id = socket.topic.substring(5, 6)
  const user_id = auth.user.id

  await RoomUser
    .query()
    .where({ user_id, room_id })
    .update({
      is_online: false,
      last_seen: moment().format('YYYY-MM-DD HH:mm:ss'),
    })

  const online = await RoomUser.query().where({ is_online: true }).fetch()

  socket.broadcastToAll('online', online.toJSON().map(p => p.user_id))
}


Ws.channel('room:*', async (ctx) => {
  const { auth, socket } = ctx
  await startConnection({ socket, auth })

  ctx.socket.on('close', async (closingSocket) => {
    await closeConnection({ ...ctx, socket: closingSocket, })
  })
}).middleware(['auth'])
