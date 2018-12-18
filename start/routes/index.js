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
 * Places routes
 *
 * */
require('./places')

/**
 *
 * Event routes
 *`
 * */
require('./events')


/**
 *
 * Label routes
 *`
 * */
require('./labels')

/**
 *
 * Invite routes
 *`
 * */
require('./invites')

/**
 *
 * Upload routes
 *`
 * */
Route.resource('upload', 'UploadController').middleware('auth')
