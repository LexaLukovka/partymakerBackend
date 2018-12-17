module.exports = class Update {
  get rules() {
    return {
      title: 'string|max:30|unique:labels',
    }
  }

  get validateAll() {
    return true
  }
}
