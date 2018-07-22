'use strict'

const Model = use('Model')

class Food extends Model {
  static get table() {
    return 'food'
  }
}

module.exports = Food
