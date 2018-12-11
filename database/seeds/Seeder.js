/*
eslint-disable import/no-unresolved,
import/no-extraneous-dependencies,
import/newline-after-import,
function-paren-newline,
no-console,
*/
const autoBind = require('auto-bind')
const Chance = require('chance')
const flatten = require('lodash/flattenDeep')
const USERS = require('./users')
const PLACES = require('./places')
const EVENTS = require('./events')
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
    this.placeRepo = new PlaceRepository()
    this.eventRepo = new EventRepository()
    autoBind(this)
  }

  async createUsers() {
    printProgress('creating users...')
    const defaultUsers = await Promise.all(USERS.map(user => User.create({ ...user })))
    const randomUsers = await Factory.model('App/Models/User').createMany(5)

    return [...defaultUsers, ...randomUsers]
  }

  createPlaces(users) {
    printProgress('creating places...')
    const placeModels = PLACES.map(place =>
      this.placeRepo.create({ ...place, admin: this.chance.pickone(users).toObject() }),
    )

    return Promise.all(placeModels)
  }

  createRealEvents(users) {
    printProgress('creating real events...')
    return Promise.all(EVENTS.map(event =>
      this.eventRepo.create({
        admin: this.chance.pickone(users),
        ...event,
      }),
    ))
  }

  createFakeEvents(users, places) {
    printProgress('creating fake events...')

    const promises = Array.from(new Array(20), async () => {
      const admin = this.chance.pickone(users)
      const event = await Factory.model('App/Models/Event').create({
        admin, place: this.chance.pickone(places),
      })

      await event.users().attach([admin.id])
      await event.users().attach(users.map(user => user.id))

      return event
    })

    return Promise.all(flatten(promises))
  }

  async run() {
    const users = await this.createUsers()
    await this.createPlaces(users)
    await this.createRealEvents(users)

    return true
  }
}

module.exports = Seeder

