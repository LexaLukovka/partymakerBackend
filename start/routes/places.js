const Route = use('Route')
const { SUD } = require('./index')

/**
 *
 * Places routes
 *
 * */

Route.resource('places', 'PlaceController')
  .validator([['places.store', 'Place/Create'], ['places.update', 'Place/Edit']])
  .middleware(new Map([[['store', 'update', 'destroy'], ['auth']]]))

Route.resource('places/:place_id/votes', 'Place/RatingController')
  .middleware(new Map([[['store', 'update', 'destroy'], ['auth']]]))
