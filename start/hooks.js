/* eslint-disable func-names */
const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersRegistered(() => {

  const Response = use('Adonis/Src/Response')

  Response.macro('forbidden', function (data) {
    this.status(403).json({
      status: 403,
      error: 'Forbidden',
      message: 'You not authorized to perform this action',
      ...data,
    })
  })

  Response.macro('notFound', function (data) {
    this.status(404).json({
      status: 404,
      error: 'Not Found',
      message: 'Cannot find any data',
      ...data,
    })
  })

  Response.macro('created', function (data) {
    this.status(201).json(data)
  })

})
