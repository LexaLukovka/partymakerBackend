const Route = use('Route')
const SUD = new Map([[['store', 'update', 'destroy'], ['auth']]])

/**
 *
 * Invite routes
 *`
 * */

Route.resource('invites', 'InviteController').middleware(SUD).only(['show', 'destroy'])
