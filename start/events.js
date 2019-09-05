const moment = require('moment')
const formatCount = require('../utils/formatCount')
const Event = use('Event')
const Ws = use('Ws')
const Message = use('App/Models/Message')
const Sms = use('Sms')
const Env = use('Env')

Event.on('ws:room', (room_id, name, payload) => {
  const topic = Ws.getChannel('room:*').topic(`room:${room_id}`)
  if (topic) topic.broadcast(name, payload)
})


Event.on('order:created', async ({ order, auth }) => {
  const room = await order.room().fetch()
  const place = await room.place().fetch()


  const players = formatCount({
    few: 'учасников',
    one: 'участника',
    two: 'Участника'
  })

  Sms.send({
    phone: place.phone,
    text: `${Env.get('FRONTEND_URL')}/order/${order.token}`,
  })

  const date = moment(order.date).format('D MMMM, dddd')

  const orderText = `${auth.user.name} отправил заказ в ${place.title} на ${order.guests} ${players(order.guests)}`
  const text = `${orderText}, ${date} ${order.time}. Ожидаем потверждения `

  Message.create({ text, user_id: 1, room_id: room.id, })
})
