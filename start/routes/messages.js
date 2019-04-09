const Route = use('Route')

/**
 *
 * Message routes
 *
 * */
Route.resource('rooms.messages', 'MessageController')
  .validator([['messages.store', 'Message/Store'], ['messages.update', 'Message/Update']])
  .middleware(new Map([[['index', 'store', 'update', 'destroy'], ['auth']]]))
  .apiOnly()
