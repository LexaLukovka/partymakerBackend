module.exports = class Store {
  get rules() {
    return {
      text: 'required|string',
      asset_id: 'exists:assets,id',
    }
  }

  get validateAll() {
    return true
  }
}
