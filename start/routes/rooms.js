const Route = use('Route')

/**
 *
 * Room routes
 *
 * */
Route.resource('rooms', 'RoomController')
  .validator([['rooms.store', 'Room/Store'], ['rooms.update', 'Room/Update']])
  .middleware(new Map([[['index', 'store', 'update', 'destroy'], ['auth']]]))
  .apiOnly()

/**
 *
 * Message routes
 *
 * */
Route.resource('rooms.messages', 'MessageController')
  .validator([['messages.store', 'Message/Store'], ['messages.update', 'Message/Update']])
  .middleware(new Map([[['index', 'store', 'update', 'destroy'], ['auth']]]))
  .apiOnly()


/**
 *
 * Guest routes
 *
 * */
Route.resource('rooms.guests', 'GuestController')
  .middleware(new Map([[['index', 'destroy'], ['auth']]]))
  .apiOnly()

