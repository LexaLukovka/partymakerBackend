/* eslint-disable global-require */
const Env = use('Env')
const Helpers = use('Helpers')

const Pictures = use('App/Models/Picture')

class PicturesController {
  // noinspection JSUnusedGlobalSymbols
  async destroy({ request, params }) {
    const fs = require('fs')
    const removeFile = Helpers.promisify(fs.unlink)
    const location = Helpers.publicPath('uploads')

    removeFile(`${location}\\${params.picture}`)

    await Pictures
      .query()
      .where({ url: `${Env.get('APP_URL')}/uploads/${params.picture}` })
      .delete()

    return {
      message: 'Pictures deleted'
    }
  }
}

module.exports = PicturesController
