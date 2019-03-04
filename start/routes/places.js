const Route = use('Route')

/**
 *
 * Places routes
 *
 * */

Route.group(() => {

  Route.resource('places', 'PlaceController')
    .validator([['places.index', 'Place/Index', 'places.store', 'Place/Store'], ['places.update', 'Place/Update']])
    .middleware(new Map([[['store', 'update', 'destroy'], ['auth']]]))
    .apiOnly()

}).namespace('Place')
