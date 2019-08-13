/*
eslint-disable import/no-unresolved,
import/no-extraneous-dependencies,
import/newline-after-import,
function-paren-newline,
no-console,
*/

const USERS = require('./users')
const ENTERTAINMENTS = require('./entertainments')
const PLACES = require('./places')
const ROOMS = require('./rooms')
const MESSAGES = require('./messages')

const Factory = use('Factory')
const User = use('App/Models/User')
const Entertainment = use('App/Models/Entertainment')
const Place = use('App/Models/Place')
const Room = use('App/Models/Room')
const Message = use('App/Models/Message')

function log(text) {
  console.log(text)
  return text
}

class Seeder {

  createEntertainments() {
    log('creating entertainments...')
    return Promise.all(ENTERTAINMENTS.map(fields => Entertainment.create(fields)))
  }

  createPlaces() {
    log('creating places...')
    return Promise.all(PLACES.map(fields => Place.create(fields)))
  }

  async createUsers() {
    log('creating users...')
    const defaultUsers = await Promise.all(USERS.map(user => User.create(user)))
    const randomUsers = await Factory.model('App/Models/User').createMany(5)
    return [...defaultUsers, ...randomUsers]
  }

  createRooms() {
    log('creating rooms...')
    return Promise.all(ROOMS.map(fields => Room.create(fields)))
  }

  addUsersToRoom(rooms, users) {
    log('adding users to rooms...')
    return Promise.all(rooms.map(room => room.users().attach(users.map(u => u.id))))
  }

  async createMessages() {
    log('creating messages...')
    await Promise.all(MESSAGES.map(fields => Message.create(fields)))
  }

  async run() {
    const users = await this.createUsers()
    await this.createEntertainments()
    await this.createPlaces()
    const rooms = await this.createRooms()
    await this.addUsersToRoom(rooms, users)
    await this.createMessages()

    return true
  }
}

module.exports = Seeder
