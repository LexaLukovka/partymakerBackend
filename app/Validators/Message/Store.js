module.exports = class Store {
  get rules() {
    return {
      text: 'string',
      asset_id: 'exists:assets,id',
    }
  }

  get validateAll() {
    return true
  }
}
