const Route = use('Route')

/**
 *
 * Authentication routes
 *
 * */

Route.group(() => {

  Route.post('auth/login', 'LoginController.login').validator('Auth/Login')
  Route.post('auth/social', 'LoginController.social').validator('Auth/Social')

  Route.post('auth/register', 'RegisterController.register').validator('Auth/Register')
  Route.post('auth/activate/:hash', 'RegisterController.activate')

  Route.post('auth/password/forgot', 'PasswordController.forgot').validator('Auth/Password/Forgot')
  Route.post('auth/password/reset/:hash', 'PasswordController.reset').validator('Auth/Password/Reset')

  Route.get('auth/user', 'UserController.show')
  Route.put('auth/user', 'UserController.update').validator('Auth/UpdateUser')

  Route.get('auth/user/account', 'AccountController.show')
  Route.put('auth/user/account', 'AccountController.update').validator('Auth/UpdateAccount')


}).namespace('Auth')
