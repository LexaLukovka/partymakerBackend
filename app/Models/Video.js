/* eslint-disable camelcase,no-underscore-dangle,no-return-await,consistent-return */

const Model = use('Model')

class Video extends Model {
  static get hidden() {
    return ['created_at', 'updated_at', 'id', 'pivot']
  }

  getUrl(url) {
    if (!url) return null
    return url
  }
}

module.exports = Video
