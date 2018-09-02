/* eslint-disable no-console,function-paren-newline,import/newline-after-import */
const USERS = require('./users')
const Chance = require('chance')
const PLACES = require('./places')
const PARTIES = require('./parties')
const flatten = require('lodash/flattenDeep')
const Party = use('App/Models/Party')
const Picture = use('App/Models/Picture')
const Place = use('App/Models/Place')
const Address = use('App/Models/Address')
const Factory = use('Factory')
const User = use('App/Models/User')

function printProgress(text) {
  console.log(text)
  return text
}

class Seeder {

  constructor() {
    this.chance = new Chance()
    this.createRealParties = this.createRealParties.bind(this)
    this.createFakeParties = this.createFakeParties.bind(this)
    this.createPlaces = this.createPlaces.bind(this)
    this.createUsers = this.createUsers.bind(this)
  }

  async createUsers() {
    printProgress('creating users...')
    const defaultUsers = await Promise.all(USERS.map(user => User.create({ ...user })))
    const randomUsers = await Factory.model('App/Models/User')
      .createMany(5)

    return [...defaultUsers, ...randomUsers]
  }

  createPlaces(users) {
    printProgress('creating places...')
    return Promise.all(PLACES.map(async place => {
      const address = await Address.create(place.address)

      const pictures = await Picture.add(place.pictures.map(picture => picture))

      const placeModel = await Place.create({
        title: place.title,
        telegram_url: place.telegram_url,
        type: place.type,
        description: place.description,
        admin_id: (this.chance.pickone(users)).id,
        address_id: address.id,
      })

      await placeModel.pictures().attach(pictures.map(p => p.id))

      return placeModel
    }))
  }

  createRealParties(users) {
    printProgress('creating real parties...')
    return Promise.all(PARTIES.map(party => Party.make({
      admin_id: (this.chance.pickone(users)).id,
      ...party,
    }),
    ))
  }

  createFakeParties(users, places) {
    printProgress('creating fake parties...')

    const promises = Array.from(new Array(20), async () => {
      const admin = this.chance.pickone(users)
      const address = await Factory.model('App/Models/Address').create()
      const party = await Factory.model('App/Models/Party').create({
        admin,
        address,
        place: this.chance.pickone(places),
      })

      const pictures = await Picture.add([
        '/images/summer.jpg',
        '/images/solomun-ibiza-2015-destino.jpg',
        '/images/ibiza.jpg',
      ])

      await party.pictures().attach(pictures.map(p => p.id))
      await party.users().attach([admin.id])
      await party.users().attach(users.map(user => user.id))

      return party
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
    await this.createRealParties(users)
    await this.createFakeParties(users, places)
    await this.createFakeRatings(users, places)

    return true
  }
}

module.exports = Seeder

