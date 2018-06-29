/* eslint-disable camelcase,no-underscore-dangle,no-return-await,consistent-return */

const Model = use('Model')
const Helpers = use('Helpers')
const FileJar = require('@adonisjs/bodyparser/src/Multipart/FileJar')

function generateName(name, extension) {
  return `${new Date().getTime()}-${name}.${extension}`
}

class Picture extends Model {

  static get hidden() {
    return ['created_at', 'updated_at', 'id', 'pivot']
  }

  static async upload(profilePics, cargo_id) {
    const uploads = Helpers.publicPath('uploads')
    if (profilePics instanceof FileJar) { return await Picture._movePictures(profilePics, uploads, cargo_id) }
    return await Picture._movePicture(profilePics, uploads, cargo_id)
  }

  static async _movePicture(profilePics, uploads, cargo_id) {
    const name = generateName(profilePics.clientName, profilePics.subtype)
    await profilePics.move(uploads, { name })

    const picture = new Picture()
    picture.cargo_id = cargo_id
    picture.url = `/uploads/${name}`
    picture.save()

    if (!profilePics.moved()) return [profilePics.error()]

  }

  static async _movePictures(profilePics, uploads, cargo_id) {
    await profilePics.moveAll(uploads, (file) => {
      const name = generateName(file.clientName, file.subtype)
      const picture = new Picture()
      picture.cargo_id = cargo_id
      picture.url = `/uploads/${name}`
      picture.save()
      return ({ name })
    })

    if (!profilePics.movedAll()) return [profilePics.error()]

  }
}

module.exports = Picture
