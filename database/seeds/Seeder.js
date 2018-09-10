/*
eslint-disable import/no-unresolved,
import/no-extraneous-dependencies,
import/newline-after-import,
function-paren-newline,
no-console,
*/

const USERS = require('./users')
const Chance = require('chance')
const PLACES = require('./places')
const GROUPS = require('./groups')
const EVENTS = require('./events')
const flatten = require('lodash/flattenDeep')
const Group = use('App/Models/Group')
const Picture = use('App/Models/Picture')
const Place = use('App/Models/Place')
const Address = use('App/Models/Address')
const Factory = use('Factory')
const User = use('App/Models/User')
const Event = use('App/Models/Event')

function printProgress(text) {
  console.log(text)
  return text
}

class Seeder {

  constructor() {
    this.chance = new Chance()
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
    return Promise.all(PLACES.map(async place => {
      const address = await Address.create(place.address)

      const pictures = await Picture.add(place.pictures.map(picture => picture))

      const placeModel = await Place.create({
        title: place.title,
        working_hours: place.working_hours,
        price: place.price,
        description: place.description,
        admin_id: (this.chance.pickone(users)).id,
        address_id: address.id,
      })

      await placeModel.pictures().attach(pictures.map(p => p.id))

      return placeModel
    }))
  }

  createEvents(users) {
    printProgress('creating places...')
    return Promise.all(EVENTS.map(async event => {
      const address = await Address.create(event.address)

      const pictures = await Picture.add(event.pictures.map(picture => picture))

      const placeModel = await Event.create({
        title: event.title,
        starts_at: event.starts_at,
        ends_at: event.ends_at,
        price: event.price,
        description: event.description,
        admin_id: (this.chance.pickone(users)).id,
        address_id: address.id,
      })

      await placeModel.pictures().attach(pictures.map(p => p.id))

      return placeModel
    }))
  }

  createRealGroups(users) {
    printProgress('creating real parties...')
    return Promise.all(GROUPS.map(party =>
      Group.make({
        admin_id: (this.chance.pickone(users)).id,
        ...party,
      }),
    ))
  }

  createFakeGroups(users, places, events) {
    printProgress('creating fake parties...')

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

