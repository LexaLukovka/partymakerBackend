module.exports = class Store {
  get rules() {
    return {
      title: 'string|max:30',
      date: 'date',
      place_id: 'exists:places,id'
    }
  }

  get validateAll() {
    return true
  }
}
