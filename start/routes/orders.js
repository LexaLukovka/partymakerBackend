const Route = use('Route')


/**
 *
 * Order routes
 *
 * */

Route.get('/order/:token', 'OrdersController.token')

Route.resource('orders', 'OrdersController')
  .apiOnly()
  .validator([
    ['orders.store', 'Order/Store'],
  ])
