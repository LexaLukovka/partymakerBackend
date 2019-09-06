const Route = use('Route')


/**
 *
 * Order routes
 *
 * */

Route.get('/order/:token', 'OrderController.token')
Route.put('/order/:token/confirm', 'OrderController.confirm')
Route.put('/order/:token/reject', 'OrderController.reject')


Route.resource('orders', 'OrdersController')
  .apiOnly()
  .validator([['orders.store', 'Order/Store']])
