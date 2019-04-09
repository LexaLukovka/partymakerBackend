const Route = use('Route')

/**
 *
 * Authentication routes
 *
 * */

Route.post('auth/login', 'AuthController.login').validator('Auth/Login')

Route.post('auth/register', 'AuthController.register').validator('Auth/Register')

Route.post('auth/social', 'AuthController.social').validator('Auth/Social')

Route.post('auth/activate/:hash', 'AuthController.activate')

Route.post('auth/password/forgot', 'AuthController.forgotPassword').validator('Auth/Password/Forgot')

Route.post('auth/password/reset/:hash', 'AuthController.resetPassword').validator('Auth/Password/Reset')

Route.get('auth/user', 'AuthController.user').middleware('auth')
