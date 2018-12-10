/* eslint-disable no-return-await */
const Helpers = use('Helpers')
const fs = use('fs')
const readFile = Helpers.promisify(fs.readFile)

/**
 * Resourceful controller for interacting with users
 */
class IndexController {

  async index() {
    return await readFile(Helpers.publicPath('index.html'))
  }
}

module.exports = IndexController
