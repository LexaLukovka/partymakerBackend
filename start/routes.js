/* eslint-disable max-len */

const Route = use('Route')

Route.get('/', () => 'Server is running')

Route.post('login', 'UserController.login').validator('LoginUser')
Route.post('register', 'UserController.register').validator('RegisterUser')
Route.get('user', 'UserController.user')

Route.get('users/:id', 'UserController.show').middleware('auth')

Route.resource('party/:party_id/users', 'Party/UserController').middleware('auth')
Route.resource('party/:party_id/food', 'Party/FoodController').middleware(new Map([['store', 'update', 'destroy'], ['auth']]))

Route.resource('party', 'Party/PartyController').middleware(new Map([['store', 'update', 'destroy'], ['auth']]))

Route.resource('upload', 'UploadController')
