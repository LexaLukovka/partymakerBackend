/* eslint-disable consistent-return */
const difference = require('lodash/difference')
const intersection = require('lodash/intersection')

const Video = use('App/Models/Video')

class VideoRepository {
  constructor() {
    this.add = this.add.bind(this)
    this.remove = this.remove.bind(this)
    this.addTo = this.addTo.bind(this)
    this.update = this.update.bind(this)
  }

  add(urls) {
    const videoPromises = urls.map(url => Video.create({ url }))

    return Promise.all(videoPromises)
  }

  remove(urls) {
    const videoPromises = urls.map(async url => ({
      id: await Video.query()
        .where('url', url)
        .delete(),
    }))

    return Promise.all(videoPromises)
  }

  async addTo(model, videos_urls) {
    const videos = await this.add(videos_urls)

    return model.videos()
      .attach(videos.map(video => video.id))
  }

  async update(model, videos_urls) {
    const oldVideosModels = (await model.videos().fetch()).toJSON()
    const oldVideos = oldVideosModels.map(picture => picture.url)

    const toAdd = difference(videos_urls, oldVideos)
    const toRemove = difference(oldVideos, intersection(videos_urls, oldVideos))

    const toRemoveModels = await this.remove(toRemove)
    const toAddModels = await this.add(toAdd)

    await model.videos().attach(toAddModels.map(p => p.id))
    await model.videos().detach(toRemoveModels.map(p => p.id))

    // await this.clean()

    return model.videos()
  }
}

module.exports = VideoRepository
