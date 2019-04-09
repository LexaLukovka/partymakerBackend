const Route = use('Route')

/**
 *
 * Place routes
 *
 * */
Route.resource('places', 'PlaceController')
  .validator([['places.store', 'Place/Store'], ['places.update', 'Place/Update']])
  .middleware(new Map([[['index', 'store', 'update', 'destroy'], ['auth']]]))
  .apiOnly()
