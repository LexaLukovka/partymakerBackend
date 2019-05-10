module.exports = class Update {
  get rules() {
    return {
      headline: 'required|string',
      preposition: 'required|string',
      title: 'required|string',
      background_url: 'required|string',
    }
  }

  get validateAll() {
    return true
  }
}
