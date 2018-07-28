const postRegisterFails = require('./response.post.register.fails')

const { test, trait } = use('Test/Suite')('auth')
trait('Test/ApiClient')
trait('Auth/Client')

test('make sure register works', async ({ client, assert }) => {
  const response = await client.post('/register')
    .field('name', 'Pavel Kostyuk')
    .field('email', 'pavliha@mailinator.com')
    .field('phone', '0683188524')
    .field('password', 'qwerty123')
    .end()

  assert.property(response.body, 'token')
  assert.property(response.body, 'refreshToken')
  response.assertStatus(200)
  response.assertJSONSubset({
    type: 'bearer',
  })
})

test('make sure register validation fails', async ({ client, assert }) => {
  const response = await client.post('/register')
    .accept('json')
    .field('name', 'Pavel Kostyuk')
    .field('email', 'pavliha@mailinator.com')
    .field('phone', '0683188524')
    .field('password', 'qwerty123')
    .end()

  response.assertStatus(400)

  assert.deepEqual(response.body, postRegisterFails)
})

test('make sure login works', async ({ client, assert }) => {

  const response = await client.post('/login')
    .field('email', 'pavliha@mailinator.com')
    .field('password', 'qwerty123')
    .end()

  assert.property(response.body, 'token')
  assert.property(response.body, 'refreshToken')
  response.assertStatus(200)
  response.assertJSONSubset({
    type: 'bearer',
  })
})
