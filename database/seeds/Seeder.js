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
const Factory = use('Factory')
const User = use('App/Models/User')

const PlaceRepository = use('App/Repositories/Place')
const GroupRepository = use('App/Repositories/Group')

function printProgress(text) {
  console.log(text)
  return text
}

class Seeder {

  constructor() {
    this.chance = new Chance()
    this.placeRepo = new PlaceRepository()
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

  createRealGroups(users) {
    printProgress('creating real groups...')
    return Promise.all(GROUPS.map(group =>
      this.groupRepo.create({
        admin: this.chance.pickone(users),
        ...group,
      }),
    ))
  }

  createFakeGroups(users, places) {
    printProgress('creating fake groups...')

    const promises = Array.from(new Array(20), async () => {
      const admin = this.chance.pickone(users)
      const address = await Factory.model('App/Models/Address').create()
      const group = await Factory.model('App/Models/Group').create({
        admin,
        address,
        place: this.chance.pickone(places),
      })

      await group.users().attach([admin.id])
      await group.users().attach(users.map(user => user.id))

      return group
    })

    return Promise.all(flatten(promises))
  }


  async run() {
    const users = await this.createUsers()
    await this.createRealGroups(users)

    return true
  }
}

module.exports = Seeder

