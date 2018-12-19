const Model = use('Model')
const LabelSerializer = require('./Serializers/LabelSerializer')
const difference = require('lodash/difference')
const to = require('util-to')

class Label extends Model {

  static get policy() {
    return 'App/Policies/Label'
  }

  static get Serializer() {
    return LabelSerializer
  }

  static async tryCreateMany(labels) {
    const promises = labels.map(async label => {
      const [err, model] = await to(this.create({ title: label }))
      if (err) return null
      return model
    })
    const models = await Promise.all(promises)

    return models.filter(m => !!m)
  }

  static findAll(labels) {
    const models = labels.map(label => Label.findBy('title', label))
    return Promise.all(models)
  }

  static async createManyIfNotExists(labels) {
    const models = await this.findAll(labels)
    const labelsLeft = difference(labels, models)
    const createdModels = await this.tryCreateMany(labelsLeft)

    return [...models.filter(m => !!m), ...createdModels]
  }

}

module.exports = Label
