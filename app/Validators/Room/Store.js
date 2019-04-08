module.exports = class Store {
  get rules() {
    return {
      title: 'string|max:30',
      date: 'date',
      private: 'boolean',
      description: 'string',
    }
  }

  get validateAll() {
    return true
  }
}
