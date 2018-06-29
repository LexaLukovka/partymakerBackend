'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/
const Route = use('Route')

Route.get('/', () => 'Server is running')

Route.post('login', 'UserController.login').validator('LoginUser')
Route.post('register', 'UserController.register').validator('RegisterUser')
Route.get('user', 'UserController.user')

Route.get('users/:id', 'UserController.show').middleware('auth')

Route.resource('cargo', 'CargoController').middleware(new Map([
  [['store', 'update', 'destroy'], ['auth']]
]))
Route.resource('upload', 'UploadController')
