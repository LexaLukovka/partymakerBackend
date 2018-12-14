const VanillaSerializer = require('@adonisjs/lucid/src/Lucid/Serializers/Vanilla')

class PictureSerializer extends VanillaSerializer {
  _getRowJSON(modelInstance) {
    const json = modelInstance.toObject()
    return json.url
  }
}

module.exports = PictureSerializer
