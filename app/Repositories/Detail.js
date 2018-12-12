/* eslint-disable consistent-return */
const autoBind = require('auto-bind')
const Detail = use('App/Models/Detail')
const differenceBy = require('lodash/differenceBy')
const intersectionBy = require('lodash/intersectionBy')

class DetailRepository {

  constructor() {
    autoBind(this)
  }

  remove(details, model) {
    return Promise.all(details.map(async url => ({
      id: await model.query().where('label', details).delete(),
    })))
  }

  async update(model, details) {
    const oldDetails = (await model.details().fetch()).toJSON()

    model.details().createMany(details)

    const toRemove = differenceBy(oldDetails, intersectionBy(details, oldDetails, 'label'), 'label')

    await this.remove(toRemove, model)

    return model.details()
  }

}

module.exports = DetailRepository
