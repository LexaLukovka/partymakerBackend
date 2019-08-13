/* eslint-disable no-multi-assign */
const Event = use('Event')

const RoomUser = exports = module.exports = {}


RoomUser.notifyAddUser = async ({ room_id, user_id }) =>
  new Promise((resolve, reject) => {
    const callback = (err, user) => (err ? reject(err) : resolve(user))
    Event.fire('guest:add', room_id, user_id, callback)
  })
