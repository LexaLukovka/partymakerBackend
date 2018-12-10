const Route = use('Route')

/**
 *
 * Authentication routes
 *
 * */

Route.post('auth/login', 'AuthController.login').validator('Auth/Login')

Route.post('auth/register', 'AuthController.register').validator('Auth/Register')

Route.post('auth/login/facebook', 'AuthController.facebook')

Route.post('auth/login/google', 'AuthController.google')

Route.get('auth/user', 'AuthController.user').middleware('auth')
