const VanillaSerializer = require('@adonisjs/lucid/src/Lucid/Serializers/Vanilla')

class PictureSerializer extends VanillaSerializer {
  _getRowJSON(modelInstance) {
    const json = modelInstance.toObject()
    this._attachRelations(modelInstance, json)
    this._attachMeta(modelInstance, json)
    delete json.__meta__
    delete json.pivot
    return json.url
  }
}

module.exports = PictureSerializer
