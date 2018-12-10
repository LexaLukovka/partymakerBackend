const Route = use('Route')

/**
 *
 * Places routes
 *
 * */

Route.resource('places', 'PlaceController')
  .validator([['places.store', 'Place/Store'], ['places.update', 'Place/Update']])
  .middleware(new Map([[['store', 'update', 'destroy'], ['auth']]]))

Route.resource('places/:place_id/votes', 'Place/RatingController')
  .middleware(new Map([[['store', 'update', 'destroy'], ['auth']]]))
