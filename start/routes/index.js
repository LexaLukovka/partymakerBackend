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
 * Upload route
 *`
 * */
Route.resource('upload', 'UploadController').middleware('auth')
