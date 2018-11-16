/* eslint-disable consistent-return */
const autoBind = require('auto-bind')
const Detail = use('App/Models/Detail')
const differenceBy = require('lodash/differenceBy')
const intersectionBy = require('lodash/intersectionBy')

class DetailRepository {

  constructor() {
    autoBind(this)
  }

  set(details, model) {
    const pa = details.map(({ label, value }) =>
      Detail.updateOrCreate({ label, place_id: model.id }, { label, value, place_id: model.id }))

    return Promise.all(pa)
  }

  remove(details, model) {
    const promiseArray = details.map(detail =>
      Detail.query().where({ label: detail.label, place_id: model.id }).delete())

    return Promise.all(promiseArray)
  }

  async update(model, details) {
    const oldDetails = (await model.details().fetch()).toJSON()

    await this.set(details, model)

    const toRemove = differenceBy(oldDetails, intersectionBy(details, oldDetails, 'label'), 'label')

    await this.remove(toRemove, model)

    return model.details()
  }

}

module.exports = DetailRepository
