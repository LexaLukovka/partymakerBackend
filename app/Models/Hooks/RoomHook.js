/* eslint-disable no-multi-assign */
const randomString = require('randomstring')
const RoomHook = exports = module.exports = {}

RoomHook.afterCreate = async (room) => {
  room.merge({ invite_token: randomString.generate() })
  await room.save()
}
