'use strict'

const Model = use('Model')

class PlaceRating extends Model {
  static get table() {
    return 'place_rating'
  }
}

module.exports = PlaceRating
