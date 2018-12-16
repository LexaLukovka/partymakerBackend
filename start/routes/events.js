const Route = use('Route')
const SUD = new Map([[['store', 'update', 'destroy'], ['auth']]])

/**
 *
 * Event routes
 *`
 * */

Route.group(() => {
  Route.resource('events', 'EventController')
    .validator([['events.store', 'Event/Store'], ['events.update', 'Event/Update']])
    .middleware(SUD)

  Route.resource('events.guests', 'EventGuestsController')
    .middleware('auth')

}).namespace('Event')

