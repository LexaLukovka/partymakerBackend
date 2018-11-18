const path = require('path')

const myProvider = (providerPath) =>
  path.join(__dirname, '..', 'providers', providerPath)

module.exports = myProvider
