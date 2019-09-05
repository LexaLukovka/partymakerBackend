/* eslint-disable no-multi-assign */
const randomString = require('randomstring')
const Message = use('App/Models/Message')
const Env = use('Env')

const RoomHook = exports = module.exports = {}

RoomHook.afterCreate = async (order) => {
  const token = randomString.generate()
  order.merge({ token })
  await order.save()

}
