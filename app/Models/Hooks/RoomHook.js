/* eslint-disable no-multi-assign */
const randomString = require('randomstring')
const Room = exports = module.exports = {}

Room.createInvite = async (room) => {
  await room.invite().create({
    headline: 'Приглашение',
    preposition: 'на',
    title: 'Вечеринку',
    background_url: '/images/sparks.png',
    token: randomString.generate()
  })
}