const Env = use('Env')
const Pictures = use('App/Models/Picture')

class PicturesController {
  // noinspection JSUnusedGlobalSymbols
  async destroy({ params }) {
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
