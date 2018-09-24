/* eslint-disable max-len */
const Route = use('Route')

const SUD = new Map([[['store', 'update', 'destroy'], ['auth']]])

const resource = (path, controller, middleware) => {
  const name = controller.replace('Controller', '')
  return Route.resource(path, controller)
    .validator([[`${path}.store`, `${name}/Create`], [`${path}.update`, `${name}/Edit`]])
    .middleware(middleware)
}

resource('/', 'DocsController')

/**
 *
 * Authentication routes
 *
 * */
Route.post('login', 'AuthController.login').validator('Auth/Login')
Route.post('register', 'AuthController.register').validator('Auth/Register')
Route.post('login/facebook', 'AuthController.facebook')
Route.post('login/google', 'AuthController.google')
Route.get('user', 'AuthController.user').middleware('auth')

/**
 *
 * User routes
 *
 * */

resource('users', 'UserController', SUD)

/**
 *
 * Places routes
 *
 * */

resource('places', 'PlaceController', SUD)

/**
 *
 * Group routes
 *`
 * */

resource('groups/:group_id/members', 'Group/MemberController', 'auth')
resource('groups', 'Group/MemberController', SUD)

/**
 *
 * Events routes
 *`
 * */
resource('events', 'EventController', SUD)

/**
 *
 * Places routes
 *
 * */

resource('places/:place_id/votes', 'Place/RatingController', SUD)
resource('places', 'PlaceController', SUD)

/**
 *
 * Upload routes
 *
 * */
resource('upload', 'UploadController', SUD)
