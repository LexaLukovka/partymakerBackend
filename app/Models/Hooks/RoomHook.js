/* eslint-disable no-multi-assign */
const randomString = require('randomstring')
const Message = use('App/Models/Message')
const Env = use('Env')

const RoomHook = exports = module.exports = {}

RoomHook.afterCreate = async (room) => {
  const invite_token = randomString.generate()
  room.merge({ invite_token })
  await room.save()

  const inviteText = 'Привет, Давай пригласим сюда твоих друзей и посмотрим что они скажут насчет этого всего?'
  const linkText = 'Скинь им вот эту ссылку что бы пригласить'
  const text = `
    ${inviteText} ${linkText}
    ${Env.get('FRONTEND_URL')}/invite/${invite_token}
    `

  Message.create({ text, room_id: room.id, user_id: 1 })
}
