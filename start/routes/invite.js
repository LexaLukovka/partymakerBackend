const Route = use('Route')

Route.get('/invite/:token', 'InviteController.show')
Route.post('/invite/accept/:room_id', 'InviteController.accept')
