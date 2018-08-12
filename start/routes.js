/* eslint-disable max-len */

const Route = use('Route')

Route.get('/', () => 'Server is running')

Route.post('login', 'AuthController.login')
  .validator('Auth/Login')

Route.post('register', 'AuthController.register')
  .validator('Auth/Register')

Route.get('user', 'AuthController.user')

Route.get('users/:id', 'AuthController.show')
  .middleware('auth')

Route.get('user/parties', 'Party/UserController.parties')
  .middleware('auth')

Route.put('user/parties/:id/edit', 'Party/PartyController.update')
  .middleware('auth')

Route.put('user/parties/:id/edit/address', 'Party/PartyController.updateAddress')
  .middleware('auth')

Route.resource('party/:party_id/users', 'Party/UserController')
  .middleware('auth')

Route.resource('party/:party_id/food', 'Party/FoodController')
  .middleware(new Map([[['store', 'update', 'destroy'], ['auth']]]))

Route.resource('party', 'Party/PartyController')
  .validator(new Map([['party.store', 'Party/Store']]))
  .apiOnly()
  .validator('Create')
  .middleware(new Map([[['store'], ['auth']]]))

Route.resource('places', 'Place/PlaceController').apiOnly()

Route.resource('upload', 'UploadController')

Route.put('settings', 'SettingsController.update')
  .middleware('auth')

