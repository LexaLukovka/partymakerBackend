module.exports = class Store {
  get rules() {
    return {
      title: 'required|string|max:30|unique:labels',
    }
  }

  get validateAll() {
    return true
  }
}
