/*
eslint-disable import/no-unresolved,
import/no-extraneous-dependencies,
import/newline-after-import,
function-paren-newline,
no-console,
*/

const Chance = require('chance')
const flatten = require('lodash/flattenDeep')
const USERS = require('./users')
const PLACES = require('./places')
const GROUPS = require('./groups')
const EVENTS = require('./events')
const Factory = use('Factory')
const User = use('App/Models/User')

const PlaceRepository = use('App/Repositories/Place')
const EventRepository = use('App/Repositories/Event')
const GroupRepository = use('App/Repositories/Group')

function printProgress(text) {
  console.log(text)
  return text
}

class Seeder {

  constructor() {
    this.chance = new Chance()
    this.placeRepo = new PlaceRepository()
    this.eventRepo = new EventRepository()
    this.groupRepo = new GroupRepository()

    this.createRealGroups = this.createRealGroups.bind(this)
    this.createFakeGroups = this.createFakeGroups.bind(this)
    this.createPlaces = this.createPlaces.bind(this)
    this.createUsers = this.createUsers.bind(this)
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
      this.placeRepo.create({ ...place, admin: this.chance.pickone(users) }),
    )

    return Promise.all(placeModels)
  }

  createEvents(users) {
    printProgress('creating places...')
    const eventModels = EVENTS.map(event =>
      this.eventRepo.create({ ...event, admin: this.chance.pickone(users) }),
    )

    return Promise.all(eventModels)
  }

  createRealGroups(users) {
    printProgress('creating real groups...')
    return Promise.all(GROUPS.map(group =>
      this.groupRepo.create({
        admin: this.chance.pickone(users),
        ...group,
      }),
    ))
  }

  createFakeGroups(users, places, events) {
    printProgress('creating fake groups...')

    const promises = Array.from(new Array(20), async () => {
      const admin = this.chance.pickone(users)
      const address = await Factory.model('App/Models/Address').create()
      const group = await Factory.model('App/Models/Group').create({
        admin,
        address,
        place: this.chance.pickone(places),
        event: this.chance.pickone(events),
      })

      await group.users().attach([admin.id])
      await group.users().attach(users.map(user => user.id))

      return group
    })

    return Promise.all(flatten(promises))
  }

  createFakeRating(user, place) {
    return Factory.model('App/Models/PlaceRating').create({ user, place })
  }

  createFakeRatings(users, places) {
    printProgress('creating fake ratings...')
    const promises = users.map(user => places.map(place => this.createFakeRating(user, place)))

    return Promise.all(flatten(promises))
  }

  async run() {
    const users = await this.createUsers()
    const places = await this.createPlaces(users)
    const events = await this.createEvents(users)

    await this.createRealGroups(users)
    await this.createFakeGroups(users, places, events)
    await this.createFakeRatings(users, places)

    return true
  }
}

module.exports = Seeder

