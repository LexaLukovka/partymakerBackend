/* eslint-disable camelcase,no-underscore-dangle,no-return-await,consistent-return */

const Model = use('Model')
const VideoSerializer = require('./Serializers/VideoSerializer')

class Video extends Model {

  static get Serializer() {
    return VideoSerializer
  }

  static get hidden() {
    return ['created_at', 'updated_at', 'id', 'pivot']
  }

  getUrl(url) {
    if (!url) return null
    return url
  }
}

module.exports = Video
