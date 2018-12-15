const VanillaSerializer = require('@adonisjs/lucid/src/Lucid/Serializers/Vanilla')

class LabelSerializer extends VanillaSerializer {
  _getRowJSON(modelInstance) {
    const json = modelInstance.toObject()
    this._attachRelations(modelInstance, json)
    this._attachMeta(modelInstance, json)

    return json.title
  }
}

module.exports = LabelSerializer
