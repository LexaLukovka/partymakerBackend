const VanillaSerializer = require('@adonisjs/lucid/src/Lucid/Serializers/Vanilla')

class GeneralSerializer extends VanillaSerializer {
  _getRowJSON(modelInstance) {
    const json = modelInstance.toObject()
    this._attachRelations(modelInstance, json)
    this._attachMeta(modelInstance, json)
    const data = { ...json }
    delete data.__meta__
    delete data.pivot
    return data
  }
}

module.exports = GeneralSerializer
