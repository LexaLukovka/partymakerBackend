/*
eslint-disable import/no-unresolved,
import/no-extraneous-dependencies,
import/newline-after-import,
function-paren-newline,
no-console,
*/

const USERS = require('./users')
const PLACES = require('./places')
const ROOMS = require('./rooms')
const MESSAGES = require('./messages')


const Factory = use('Factory')
const User = use('App/Models/User')
const Place = use('App/Models/Place')
const Room = use('App/Models/Room')
const Message = use('App/Models/Message')


function printProgress(text) {
  console.log(text)
  return text
}

class Seeder {

  async createUsers() {
    printProgress('creating users...')
    const defaultUsers = await Promise.all(USERS.map(user => User.create(user)))
    const randomUsers = await Factory.model('App/Models/User').createMany(5)

    return [...defaultUsers, ...randomUsers]
  }

  createPlaces() {
    printProgress('creating places...')
    return Promise.all(PLACES.map(fields => Place.create(fields)))
  }

  createRooms() {
    printProgress('creating rooms...')
    return Promise.all(ROOMS.map(fields => Room.create(fields)))
  }

  createMessages() {
    printProgress('creating messages...')
    return Promise.all(MESSAGES.map(fields => Message.create(fields)))
  }

  async run() {
    await this.createUsers()
    await this.createPlaces()
    await this.createRooms()
    await this.createMessages()

    return true
  }
}

module.exports = Seeder

