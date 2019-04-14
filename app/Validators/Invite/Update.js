module.exports = class Update {
  get rules() {
    return {
      headline: 'string',
      background_id: 'exists:assets,id',
    }
  }

  get messages() {
    return {
      'background_id.exists': 'Please provider valid asset_id which already exists in our database'
    }
  }

  get validateAll() {
    return true
  }
}
