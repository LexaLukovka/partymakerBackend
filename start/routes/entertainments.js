const Route = use('Route')

/**
 *
 * Entertainment routes
 *
 * */
Route.resource('entertainments', 'EntertainmentController')
  .validator([
    ['entertainments.store', 'Entertainment/Store'],
    ['entertainments.update', 'Entertainment/Update'],
    ['entertainments.destroy', 'Entertainment/Destroy'],
  ])
  .middleware(new Map([[['store', 'update', 'destroy'], ['auth']]]))
  .apiOnly()
