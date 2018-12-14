const VanillaSerializer = require('@adonisjs/lucid/src/Lucid/Serializers/Vanilla')

class VideoSerializer extends VanillaSerializer {
  _getRowJSON(modelInstance) {
    const json = modelInstance.toObject()
    return json.url
  }
}

module.exports = VideoSerializer
