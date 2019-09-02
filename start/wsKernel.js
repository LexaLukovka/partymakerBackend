const Ws = use('Ws')

const globalMiddleware = [
  'Adonis/Middleware/Session',
  'Adonis/Middleware/AuthInit'
]

const namedMiddleware = {
  auth: 'Adonis/Middleware/Auth'
}

Ws
  .registerGlobal(globalMiddleware)
  .registerNamed(namedMiddleware)
