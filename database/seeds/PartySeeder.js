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

function printProgress(progress) {
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write(`created ${progress} parties and users`)
}

class PartySeeder {
  async run() {
    printProgress(0)
    const result = Array.from(new Array(50), async (val, index) => {
      const admin = await Factory.model('App/Models/User').create()
      const address = await Factory.model('App/Models/Address').create()

      const party = await Factory.model('App/Models/Party').create({ admin, address })
      printProgress(index + 1)
      return party
    })

    await Promise.all(result)
    printProgress(50)
    console.log('\n')

  }
}

module.exports = PartySeeder
