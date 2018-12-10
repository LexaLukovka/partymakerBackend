/* eslint-disable consistent-return */
const autoBind = require('auto-bind')
const difference = require('lodash/difference')
const intersection = require('lodash/intersection')

class LabelRepository {

  constructor() {
    autoBind(this)
  }

  set(labels, model) {
    return model.labels().createMany(labels.map(label => ({ title: label })))
  }

  remove(labels, model) {
    return Promise.all(labels.map(label => model.labels().where('title', label).delete()))
  }

  async update(model, labels) {
    const oldLabels = (await model.labels().fetch()).toJSON()

    await this.set(labels, model)
    const toRemove = difference(oldLabels, intersection(labels, oldLabels))

    await this.remove(toRemove, model)

    return model.labels()
  }

}

module.exports = LabelRepository
