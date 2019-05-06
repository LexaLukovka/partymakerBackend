const Route = use('Route')

const ICUD = new Map([[['index', 'store', 'update', 'destroy'], ['auth']]])
const LD = new Map([[['index', 'destroy'], ['auth']]])

Route.group(() => {

  /**
   *
   * Room routes
   *
   * */
  Route.resource('rooms', 'RoomController')
    .validator([['rooms.store', 'Room/Store'], ['rooms.update', 'Room/Update']])
    .middleware(ICUD)
    .apiOnly()

  /**
   *
   * Guest routes
   *
   * */
  Route.resource('rooms.guests', 'GuestController')
    .middleware(LD)
    .apiOnly()

  /**
   *
   * Invite routes
   *
   * */
  Route.resource('rooms.invite', 'InviteController')
    .validator([['rooms.invite.store', 'Invite/Store'], ['rooms.invite.update', 'Invite/Update']])
    .middleware(ICUD)
    .apiOnly()

  Route.put('rooms/:rooms_id/invite', 'InviteController.update')

  /**
   *
   * Place routes
   *
   * */
  Route.resource('rooms.place', 'PlaceController')
    .validator([['rooms.place.store', 'Place/Store'], ['rooms.place.update', 'Place/Update']])
    .middleware(ICUD)
    .apiOnly()

  Route.put('rooms/:rooms_id/place', 'PlaceController.update')

}).namespace('Room')


Route.group(() => {

  /**
   *
   * Message routes
   *
   * */
  Route.put('/rooms/:rooms_id/messages/read', 'ReadController.update')

  Route.resource('rooms.messages', 'MessageController')
    .validator([['rooms.messages.store', 'Message/Store'], ['rooms.messages.update', 'Message/Update']])
    .middleware(ICUD)
    .apiOnly()


}).namespace('Room/Message')
