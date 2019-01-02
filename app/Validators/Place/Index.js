/* eslint-disable quote-props */
module.exports = class Index {
  get rules() {
    return {
      page: 'integer',
      limit: 'integer|max:10',
      filter: 'string',
      sort: 'in:asc,desc',
      sortBy: 'in:updated_at,created_at,title,description',
    }
  }

  get messages() {
    return {
      'sort.in': 'Only asc or desc are allowed',
      'sortBy.in': 'Only updated_at,created_at,title,description are allowed',
    }
  }

  get validateAll() {
    return true
  }
}
