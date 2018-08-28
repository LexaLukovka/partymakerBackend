/* eslint-disable no-console,function-paren-newline,import/newline-after-import */
const readline = require('readline')
const USERS = require('./users')
const Chance = require('chance')
const PLACES = require('./places')
const PARTIES = require('./parties')
const Party = use('App/Models/Party')
const Env = use('Env')
const Picture = use('App/Models/Picture')
const Place = use('App/Models/Place')
const Address = use('App/Models/Address')
const Factory = use('Factory')
const User = use('App/Models/User')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function printProgress(text) {
  readline.clearLine(process.stdout, 0)
  readline.cursorTo(process.stdout, 0, null)
  rl.write(`${text}`)
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
    const defaultUsers = await Promise.all(USERS.map(user => User.create({
      ...user,
      avatar_url: `${Env.get('APP_URL')}${user.avatar_url}`,
    })))
    const randomUsers = await Factory.model('App/Models/User')
      .createMany(100)

    return [...defaultUsers, ...randomUsers]
  }

  createPlaces(users) {
    printProgress('creating places...')
    return Promise.all(PLACES.map(async place => {
      const address = await Address.create(place.address)

      const pictures = await Picture.add(place.pictures.map(picture => `${Env.get('APP_URL')}${picture}`))

      const placeModel = await Place.create({
        title: place.title,
        telegram_url: place.telegram_url,
        type: place.type,
        description: place.description,
        admin_id: (this.chance.pickone(users)).id,
        address_id: address.id,
      })

      placeModel.pictures()
        .attach(pictures.map(p => p.id))

      return placeModel
    }))
  }

  createRealParties(users) {
    printProgress('creating real parties...')
    return Promise.all(PARTIES.map(party =>
      Party.make({
        admin_id: (this.chance.pickone(users)).id,
        ...party,
      }),
    ))
  }

  createFakeParties(users, places) {
    printProgress('creating fake parties...')

    return Array.from(new Array(20), async () => {
      const admin = this.chance.pickone(users)
      const address = await Factory.model('App/Models/Address')
        .create()
      const party = await Factory.model('App/Models/Party')
        .create({
          admin,
          address,
          place: this.chance.pickone(places),
        })
      await party.users()
        .attach([admin.id])
      await party.users()
        .attach(users.map(user => user.id))

      return party
    })

  }

  async run() {
    const users = await this.createUsers()
    const places = await this.createPlaces(users)
    await this.createRealParties(users)
    await this.createFakeParties(users, places)

    await Promise.all(
      users.map(user =>
        places.map(place =>
          Factory.model('App/Models/PlaceRating').create({ user, place }),
        ),
      ),
    )

    printProgress('Done. You can stop the app Ctrl+C \n')
  }
}

module.exports = Seeder

