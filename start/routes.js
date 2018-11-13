/* eslint-disable max-len */
const Route = use('Route')

const SUD = new Map([[['store', 'update', 'destroy'], ['auth']]])

Route.get('/', 'DocsController.index')
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

Route.resource('users', 'UserController')
  .validator([['users.store', 'User/Create'], ['users.update', 'User/Edit']])
  .middleware(SUD)

/**
 *
 * Places routes
 *
 * */

Route.resource('places', 'PlaceController')
  .validator([['places.store', 'Place/Create'], ['places.update', 'Place/Edit']])
  .middleware(SUD)

/**
 *
 * Group routes
 *`
 * */
Route.resource('groups/:group_id/members', 'Group/MemberController')
  .middleware('auth')
  // .validator([['groups/:group_id/members.store', 'Group/Member/Create']])

Route.resource('groups', 'GroupController')
  .validator([['groups.store', 'Group/Create'], ['groups.update', 'Group/Edit']])
  .middleware(SUD)

/**
 *
 * Events routes
 *`
 * */
Route.resource('events', 'EventController')
  .validator([['events.store', 'Event/Create']])
  .middleware(SUD)

/**
 *
 * Places routes
 *
 * */

Route.resource('places/:place_id/votes', 'Place/RatingController')
  .middleware('auth')

// Route.resource('places', 'Place/PlaceController')
//   .middleware(SUD)

Route.resource('upload', 'UploadController')
