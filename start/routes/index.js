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
 * Upload routes
 *`
 * */
Route.resource('upload', 'UploadController').middleware('auth')
