/* eslint-disable consistent-return */
const Picture = use('App/Models/Picture')
const Helpers = use('Helpers')
const fs = require('fs')
const difference = require('lodash/difference')
const intersection = require('lodash/intersection')
const path = require('path')

const removeFile = Helpers.promisify(fs.unlink)
const readDir = Helpers.promisify(fs.readdir)

class PictureRepository {

  constructor() {
    this.add = this.add.bind(this)
    this.remove = this.remove.bind(this)
    this.clean = this.clean.bind(this)
    this.addTo = this.addTo.bind(this)
    this.update = this.update.bind(this)

  }

  add(urls) {
    const imagePromises = urls.map(url => Picture.create({ url }))

    return Promise.all(imagePromises)
  }

  remove(urls) {
    const imagePromises = urls.map(async url => ({
      id: await Picture.query().where('url', url).delete(),
    }))

    return Promise.all(imagePromises)
  }

  async clean() {
    const uploads = Helpers.publicPath('uploads')
    const allPictures = (await Picture.all()).toJSON().map(picture => path.basename(picture.url))
    const files = await readDir(uploads)
    const toRemove = difference(files, intersection(allPictures, files))

    return Promise.all(toRemove.map(file => removeFile(`${uploads}/${file}`)))
  }

  async addTo(model, pictures_urls) {
    const pictures = await this.add(pictures_urls)
    return model.pictures().attach(pictures.map(p => p.id))
  }

  async update(model, pictures_urls) {
    const oldPicturesModels = (await model.pictures().fetch()).toJSON()
    const oldPictures = oldPicturesModels.map(picture => picture.url)

    const toAdd = difference(pictures_urls, oldPictures)
    const toRemove = difference(oldPictures, intersection(pictures_urls, oldPictures))

    const toRemoveModels = await this.remove(toRemove)
    const toAddModels = await this.add(toAdd)

    await model.pictures().attach(toAddModels.map(p => p.id))
    await model.pictures().detach(toRemoveModels.map(p => p.id))

    await this.clean()

    return model.pictures()
  }

}

module.exports = PictureRepository
