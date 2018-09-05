/* eslint-disable camelcase,no-underscore-dangle,no-return-await,consistent-return */
const Model = use('Model')
const Helpers = use('Helpers')
const Env = use('Env')
const FileJar = require('@adonisjs/bodyparser/src/Multipart/FileJar')
const fs = require('fs')
const difference = require('lodash/difference')
const intersection = require('lodash/intersection')
const path = require('path')

const removeFile = Helpers.promisify(fs.unlink)
const readDir = Helpers.promisify(fs.readdir)

function generateName(name, extension) {
  return `${new Date().getTime()}-${name}.${extension}`
}

class Picture extends Model {

  static get hidden() {
    return ['created_at', 'updated_at', 'id', 'pivot']
  }

  getUrl(url) {
    if (!url) return null
    if (url.includes('//')) return url
    return `${Env.get('APP_URL')}${url}`
  }

  static async upload(profilePics, party_id) {
    const uploads = Helpers.publicPath('uploads')
    if (profilePics instanceof FileJar) { return await Picture._movePictures(profilePics, uploads, party_id) }
    return await Picture._movePicture(profilePics, uploads, party_id)
  }

  static async _movePicture(profilePics, uploads, party_id) {
    const name = generateName(profilePics.clientName, profilePics.subtype)
    await profilePics.move(uploads, { name })

    const picture = new Picture()
    picture.party_id = party_id
    picture.url = `/uploads/${name}`
    picture.save()

    if (!profilePics.moved()) return [profilePics.error()]

  }

  static async _movePictures(profilePics, uploads, party_id) {
    await profilePics.moveAll(uploads, (file) => {
      const name = generateName(file.clientName, file.subtype)
      const picture = new Picture()
      picture.party_id = party_id
      picture.url = `/uploads/${name}`
      picture.save()
      return ({ name })
    })

    if (!profilePics.movedAll()) return [profilePics.error()]

  }

  static async clean() {
    const uploads = Helpers.publicPath('uploads')

    const allPictures = (await Picture.all()).toJSON().map(picture => path.basename(picture.url))
    const files = await readDir(uploads)

    const toRemove = difference(files, intersection(allPictures, files))

    return Promise.all(toRemove.map(file => removeFile(`${uploads}/${file}`)))
  }

  static async add(pictures) {
    const imagePromises = pictures.map(async picture =>
      await Picture.create({ url: picture }))

    return await Promise.all(imagePromises)
  }

  static async remove(pictures) {
    const imagePromises = pictures.map(async picture => ({
      id: await Picture.query().where('url', picture).delete(),
    }))

    return await Promise.all(imagePromises)
  }
}

module.exports = Picture
