/* eslint-disable consistent-return */

const Video = use('App/Models/Video')

class VideoRepository {
  constructor() {
    this.add = this.add.bind(this)
    this.remove = this.remove.bind(this)
    this.addTo = this.addTo.bind(this)

  }

  add(urls) {
    const videoPromises = urls.map(url => Video.create({ url: url.split('=')[1].split('?')[0].split('&')[0] }))

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
}

module.exports = VideoRepository
