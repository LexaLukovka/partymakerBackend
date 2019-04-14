const Route = use('Route')


Route.group(() => {
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
    .validator([['rooms.messages.store', 'Message/Store'], ['rooms.messages.update', 'Message/Update']])
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


  /**
   *
   * Invite routes
   *
   * */
  Route.resource('rooms.invites', 'InviteController')
    .validator([['rooms.invites.store', 'Invite/Store'], ['rooms.invites.update', 'Invite/Update']])
    .middleware(new Map([[['index', 'store', 'update', 'destroy'], ['auth']]]))
    .apiOnly()

}).namespace('Room')
