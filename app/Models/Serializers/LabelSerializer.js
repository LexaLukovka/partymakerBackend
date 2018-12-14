const VanillaSerializer = require('@adonisjs/lucid/src/Lucid/Serializers/Vanilla')

class LabelSerializer extends VanillaSerializer {
  _getRowJSON(modelInstance) {
    const json = modelInstance.toObject()
    return json.title
  }
}

module.exports = LabelSerializer
