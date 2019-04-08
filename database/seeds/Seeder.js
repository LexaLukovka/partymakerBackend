/*
eslint-disable import/no-unresolved,
import/no-extraneous-dependencies,
import/newline-after-import,
function-paren-newline,
no-console,
*/

const autoBind = require('auto-bind')
const Chance = require('chance')
const USERS = require('./users')
const Factory = use('Factory')
const User = use('App/Models/User')

const PlaceRepository = use('App/Repositories/Place')
const EventRepository = use('App/Repositories/Event')

function printProgress(text) {
  console.log(text)
  return text
}

class Seeder {

  constructor() {
    this.chance = new Chance()
    this.place = new PlaceRepository()
    this.event = new EventRepository()
    autoBind(this)
  }

  async createUsers() {
    printProgress('creating users...')
    const defaultUsers = await Promise.all(USERS.map(user => User.create(user)))
    const randomUsers = await Factory.model('App/Models/User').createMany(5)

    return [...defaultUsers, ...randomUsers]
  }


  async run() {
    const users = await this.createUsers()
    await this.createPlaces(users)
    await this.createRealEvents(users)

    return true
  }
}

module.exports = Seeder

