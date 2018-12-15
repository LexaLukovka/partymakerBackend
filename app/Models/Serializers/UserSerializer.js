const VanillaSerializer = require('@adonisjs/lucid/src/Lucid/Serializers/Vanilla')

function clean(value) {
  const obj = { ...value }
  for (const propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined || obj[propName] === 0) {
      delete obj[propName]
    }
  }
  return obj
}

class UserSerializer extends VanillaSerializer {
  _getRowJSON(modelInstance) {
    const json = modelInstance.toObject()
    this._attachRelations(modelInstance, json)
    this._attachMeta(modelInstance, json)
    const result = clean(json)
    delete result.pivot
    return result
  }
}

module.exports = UserSerializer
