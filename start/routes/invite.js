const Route = use('Route')

Route.get('/invite/:token', 'InviteController.show')
Route.post('/invite/:token', 'InviteController.accept').middleware('auth')
