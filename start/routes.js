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

Route.get('get-login-redirect/:provider', 'SocialController.getRedirectUrl')

Route.get('login/:provider', 'SocialController.redirect')
Route.get('/authenticated/:provider/', 'SocialController.callback')
/**
 *
 * User routes
 *
 * */
Route.resource('user/:id', 'User/UserController')
  .apiOnly()

Route.resource('user/:id/parties', 'User/PartyController')
  .apiOnly()
/**
 *
 * Party routes
 *`
 * */
Route.resource('party/:party_id/users', 'Party/UserController')
  .apiOnly()
  .middleware('auth')


Route.resource('party', 'Party/PartyController')
  .validator(new Map([['party.store', 'Party/Store']]))
  .apiOnly()
  .middleware(SUD)

/**
 *
 * Places routes
 *
 * */

Route.resource('places/:place_id/votes', 'Place/RatingController')
  .apiOnly()
  .middleware('auth')

Route.resource('places', 'Place/PlaceController')
  .apiOnly()
  .middleware(SUD)


Route.put('settings', 'SettingsController.update')
  .middleware('auth')

Route.resource('upload', 'UploadController')
