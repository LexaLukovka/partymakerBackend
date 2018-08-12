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
Route.post('login', 'AuthController.login')
  .validator('Auth/Login')

Route.post('register', 'AuthController.register')
  .validator('Auth/Register')
/**
 *
 * User routes
 *
 * */
Route.resource('user/parties', 'User/PartyController')
  .apiOnly()
  .middleware('auth')
/**
 *
 * Party routes
 *`
 * */
Route.resource('party/:party_id/users', 'Party/UserController')
  .apiOnly()
  .middleware('auth')

Route.resource('party/:party_id/food', 'Party/FoodController')
  .apiOnly()
  .middleware(SUD)

Route.resource('party', 'Party/PartyController')
  .validator(new Map([['party.store', 'Party/Store']]))
  .apiOnly()
  .middleware(SUD)

/**
 *
 * Places routes
 *
 * */
Route.resource('places', 'Place/PlaceController')
  .apiOnly()
  .middleware(SUD)

Route.put('settings', 'SettingsController.update')
  .middleware('auth')

Route.resource('upload', 'UploadController')

