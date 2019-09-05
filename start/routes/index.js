const Route = use('Route')

/**
 *
 * Swagger route
 *
 * */
Route.get('/', 'IndexController.index')

/**
 *
 * Authentication routes
 *
 * */
require('./auth')

/**
 *
 * User routes
 *
 * */
require('./users')

/**
 *
 * Place routes
 *
 * */
require('./places')

/**
 *
 * Entertainment routes
 *
 * */
require('./entertainments')

/**
 *
 * Room routes
 *
 * */
require('./rooms')

/**
 *
 * Invite routes
 *
 * */
require('./invite')

/**
 *
 * Order routes
 *
 * */
require('./orders')

/**
 *
 * Asset routes
 *
 * */
Route.resource('assets', 'AssetController')
  .validator([['assets.store', 'Asset/Store'], ['assets.update', 'Asset/Update']])
  .middleware(new Map([[['index', 'store', 'update', 'destroy'], ['auth']]]))
  .apiOnly()

