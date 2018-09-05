/* eslint-disable max-len */
const Route = use('Route')

const SUD = new Map([[['store', 'update', 'destroy'], ['auth']]])

/**
 *
 * Check if server is running
 *
 * */
Route.get('/', () => 'Server is running')
/**
 *
 * Authentication routes
 *
 * */
Route.post('login', 'AuthController.login').validator('Auth/Login')
Route.post('register', 'AuthController.register').validator('Auth/Register')

Route.post('login/facebook', 'SocialController.facebook')
Route.post('login/google', 'SocialController.google')
/**
 *
 * User routes
 *
 * */
Route.resource('user/:id', 'User/UserController')
Route.resource('user/:id/parties', 'User/PartyController')
/**
 *
 * Party routes
 *`
 * */
Route.resource('party/:party_id/users', 'Party/UserController').middleware('auth')
Route.resource('party', 'Party/PartyController')
  .validator(new Map([['party.store', 'Party/Store']]))
  .middleware(SUD)

/**
 *
 * Places routes
 *
 * */

Route.resource('places/:place_id/votes', 'Place/RatingController').middleware('auth')
Route.resource('places', 'Place/PlaceController').middleware(SUD)

Route.put('settings', 'SettingsController.update').middleware('auth')

Route.resource('upload', 'UploadController')
