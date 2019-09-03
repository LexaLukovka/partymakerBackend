const Route = use('Route')

const CUD = new Map([[['store', 'update', 'destroy'], ['auth']]])
const LD = new Map([[['index', 'destroy'], ['auth']]])

Route.group(() => {

  /**
   *
   * Room routes
   *
   * */
  Route.resource('rooms', 'RoomController')
    .middleware(CUD)
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
      ['rooms.place.update', 'Place/Update'],
      ['rooms.place.destroy', 'Place/Destroy']
    ])

  Route.put('rooms/:rooms_id/place', 'PlaceController.update')

  /**
   *
   * Message routes
   *
   * */
  Route.put('/rooms/:rooms_id/messages/read', 'Message/ReadController.update')

  Route.resource('rooms.messages', 'Message/MessageController')
    .middleware(CUD)
    .apiOnly()
    .validator([
      ['rooms.messages.store', 'Room/Message/Store'],
      ['rooms.messages.update', 'Room/Message/Update'],
      ['rooms.messages.destroy', 'Room/Message/Destroy']
    ])


  /**
   *
   * Order routes
   *
   * */
  Route.resource('rooms.orders', 'OrderController')
    .middleware(['auth'])
    .apiOnly()
    .validator([
      ['rooms.orders.store', 'Room/Order/Store'],
      ['rooms.orders.update', 'Room/Order/Update'],
      ['rooms.orders.destroy', 'Room/Order/Destroy'],
    ])


}).namespace('Room')

