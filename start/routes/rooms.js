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
