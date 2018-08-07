/* eslint-disable max-len */

const Route = use('Route')

Route.get('/', () => 'Server is running')

Route.post('login', 'UserController.login')
  .validator('Auth/Login')

Route.post('register', 'UserController.register')
  .validator('Auth/Register')

Route.get('user', 'UserController.user')

Route.get('users/:id', 'UserController.show')
  .middleware('auth')

Route.get('user/:id/parties', 'Party/UserController.parties')
  .middleware('auth')

Route.resource('party/:party_id/users', 'Party/UserController')
  .middleware('auth')

Route.resource('party/:party_id/food', 'Party/FoodController')
  .middleware(new Map([[['store', 'update', 'destroy'], ['auth']]]))

Route.resource('party', 'Party/PartyController')
  .validator(new Map([
    ['party.store', 'Party/Store']
  ]))
  .apiOnly()
  .validator('Create')
  .middleware(new Map([[['index', 'store'], ['auth']]]))

Route.resource('upload', 'UploadController')
