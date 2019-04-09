module.exports = class Store {
  get rules() {
    return {
      title: 'required|string',
      address: 'required|string',
    }
  }

  get validateAll() {
    return true
  }
}
