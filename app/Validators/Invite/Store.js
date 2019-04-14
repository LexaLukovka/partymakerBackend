module.exports = class Store {
  get rules() {
    return {
      headline: 'required|string',
      background_id: 'exists:assets,id',
    }
  }

  get messages() {
    return {
      'background_id.exists': 'Please provider valid asset_id which already exists in our database'
    }
  }
}
