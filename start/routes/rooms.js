const Route = use('Route')

const ICUD = new Map([[['index', 'store', 'update', 'destroy'], ['auth']]])
const CUD = new Map([[['store', 'update', 'destroy'], ['auth']]])
const LD = new Map([[['index', 'destroy'], ['auth']]])

Route.group(() => {

  /**
   *
   * Room routes
   *
   * */
  Route.resource('rooms', 'RoomController')
    .middleware(ICUD)
    .apiOnly()
    .validator([
      ['rooms.index', 'Room/Index'],
      ['rooms.store', 'Room/Store'],
      ['rooms.update', 'Room/Update'],
      ['rooms.destroy', 'Room/Destroy']
    ])

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
   * Place routes
   *
   * */
  Route.resource('rooms.place', 'PlaceController')
    .middleware(CUD)
    .apiOnly()
    .validator([
      ['rooms.place.store', 'Place/Store'],
      ['rooms.place.update', 'Place/Update']
    ])

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
    .middleware(CUD)
    .apiOnly()
    .validator([
      ['rooms.messages.store', 'Message/Store'],
      ['rooms.messages.update', 'Message/Update']
    ])


}).namespace('Room/Message')
