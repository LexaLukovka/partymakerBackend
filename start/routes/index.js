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
 * Room routes
 *
 * */
require('./rooms')


/**
 *
 * Upload routes
 *`
 * */
Route.resource('upload', 'UploadController').middleware('auth')
