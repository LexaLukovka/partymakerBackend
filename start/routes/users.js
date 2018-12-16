const Route = use('Route')

/**
 *
 * User routes
 *
 * */
Route.resource('users', 'UserController')
  .validator([['users.store', 'User/Store'], ['users.update', 'User/Update']])
  .middleware(new Map([[['store', 'update', 'destroy'], ['auth']]]))
  .apiOnly()
