const Event = use('Event')

Event.on('message:send', 'Message.send')
Event.on('message:read', 'Message.read')
Event.on('guest:add', 'Guest.add')
Event.on('guest:remove', 'Guest.remove')
