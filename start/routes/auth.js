const Route = use('Route')

/**
 *
 * Authentication routes
 *
 * */

Route.post('auth/login', 'AuthController.login').validator('Auth/Login')

Route.post('auth/register', 'AuthController.register').validator('Auth/Register')

Route.post('auth/social', 'AuthController.social').validator('Auth/Social')

Route.get('auth/activate/:hash', 'AuthController.activate')

Route.post('auth/password/forgot', 'AuthController.forgotPassword').validator('Auth/ForgotPassword')

Route.post('auth/password/restore/:hash', 'AuthController.restorePassword').validator('Auth/RestorePassword')

Route.get('auth/user', 'AuthController.user').middleware('auth')
