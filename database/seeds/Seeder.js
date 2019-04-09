/*
eslint-disable import/no-unresolved,
import/no-extraneous-dependencies,
import/newline-after-import,
function-paren-newline,
no-console,
*/

const USERS = require('./users')
const Factory = use('Factory')
const User = use('App/Models/User')


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


  async run() {
    await this.createUsers()
    return true
  }
}

module.exports = Seeder

