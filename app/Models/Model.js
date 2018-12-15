const Env = use('Env')
const BaseModel = use('Model')
const difference = require('lodash/difference')
const intersection = require('lodash/intersection')
const isString = require('lodash/isString')

class Model extends BaseModel {

  // Мои костыли. Но делают крутые вещи

  /**
   * Returns fields in simple format and also removes base from urls
   *
   * @param  {BelongsToMany} relation of current model
   * @return {GeneralSerializer}
   */
  async getJSON(relation) {
    return (await relation.fetch()).toJSON().map(p => (isString(p) ? p.replace(Env.get('APP_URL'), '') : p))
  }


  /**
   * sync request data to the table relations
   *
   * @param  {Object} data from request
   * @param  {BelongsToMany} relation of current model
   * @param  {String} field name in table
   * @return {void}
   */
  async diff({ data, relation, field }) {
    const oldValues = await this.getJSON(relation)
    const toAdd = difference(data, oldValues)
    const addedModels = await relation.createMany(toAdd.map(f => ({ [field]: f })))
    await relation.attach(addedModels.map(m => m.id))
    const toRemove = difference(oldValues, intersection(data, oldValues))
    await Promise.all(toRemove.map(value => relation.where(field, value).delete()))
  }

}

module.exports = Model
