const User = use('App/Models/User')
/*
|--------------------------------------------------------------------------
| PartySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

function printProgress(text) {
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write(`${text}`)
}

class Seeder {

  async addFood(party) {
    const foodPromises = Array.from(new Array(2), async (v, i) => {
      const user = await Factory.model('App/Models/User').create()
      const food = await Factory.model('App/Models/Food').create({ user, party })
      printProgress(`creating ${i + 1} food...`)

      return food
    })
    printProgress('creating food item list...')
    return Promise.all(foodPromises)
  }

  async createParties() {
    const partyPromises = Array.from(new Array(2), async (val, index) => {
      const admin = await Factory.model('App/Models/User').create()
      const users = await Factory.model('App/Models/User').createMany(5)
      const address = await Factory.model('App/Models/Address').create()
      const party = await Factory.model('App/Models/Party').create({ admin, address })
      party.users().attach(users.map(user => user.id))
      printProgress(`creating ${index + 1} party...`)

      return party
    })

    printProgress('creating parties...')

    return Promise.all(partyPromises)
  }

  async run() {
    printProgress(0)
    const parties = await this.createParties()

    const foodPromises = Array.from(new Array(2), async (v, i) => this.addFood(parties[i]))

    printProgress('waiting for seed to complete...')

    await Promise.all(foodPromises)
    printProgress('done')

    console.log('\n')
  }
}

module.exports = Seeder

