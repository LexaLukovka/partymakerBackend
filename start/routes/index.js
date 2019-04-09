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
 * Room routes
 *
 * */
require('./rooms')

/**
 *
 * Message routes
 *
 * */
require('./messages')


/**
 *
 * Upload routes
 *`
 * */
Route.resource('upload', 'UploadController').middleware('auth')
