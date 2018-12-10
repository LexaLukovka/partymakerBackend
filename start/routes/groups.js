const Route = use('Route')
/**
 *
 * Group routes
 *`
 * */
Route.resource('groups/:group_id/members', 'Group/MemberController')
  .middleware('auth')

Route.resource('groups', 'GroupController')
  .validator([['groups.store', 'Group/Store'], ['groups.update', 'Group/Update']])
  .middleware(new Map([[['store', 'update', 'destroy'], ['auth']]]))
