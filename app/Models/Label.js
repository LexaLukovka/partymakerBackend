'use strict'

const Model = use('Model')
const LabelSerializer = require('./Serializers/LabelSerializer')

class Label extends Model {

  static get Serializer() {
    return LabelSerializer
  }

}

module.exports = Label
