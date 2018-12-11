const Route = use('Route')
/**
 *
 * Event routes
 *`
 * */
Route.resource('events/:event_id/members', 'Event/MemberController')
  .middleware('auth')

Route.resource('events', 'EventController')
  .validator([['events.store', 'Event/Store'], ['events.update', 'Event/Update']])
  .middleware(new Map([[['store', 'update', 'destroy'], ['auth']]]))
