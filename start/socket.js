/* eslint-disable no-console */
const Room = use('App/Models/Room')
const activateNamespace = require('../socket')

Room.ids().then(rooms_ids => rooms_ids.forEach(activateNamespace))

