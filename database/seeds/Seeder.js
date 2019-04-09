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

const Factory = use('Factory')
const User = use('App/Models/User')
const Place = use('App/Models/Place')
const Room = use('App/Models/Room')


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

  async createPlaces() {
    printProgress('creating places...')
    const defaultPlaces = await Promise.all(PLACES.map(fields => Place.create(fields)))

    return [...defaultPlaces]
  }

  async createRooms() {
    printProgress('creating rooms...')
    const defaultRooms = await Promise.all(ROOMS.map(fields => Room.create(fields)))

    return [...defaultRooms]
  }

  async run() {
    await this.createUsers()
    await this.createPlaces()
    await this.createRooms()
    return true
  }
}

module.exports = Seeder

