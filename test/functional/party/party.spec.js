/* eslint-disable import/newline-after-import */
const postPartyRequest = require('./request.post.party.json')
const postPartyResponse = require('./response.post.party')

const User = use('App/Models/User')

const { test, trait } = use('Test/Suite')('group')

trait('Test/ApiClient')
trait('Auth/Client')

test('create party', async ({ client, assert }) => {
  const user = await User.find(1)

  const response = await client.post('/group')
    .loginVia(user, 'jwt')
    .type('json')
    .accept('json')
    .send(postPartyRequest)
    .end()

  response.assertStatus(200)
  assert.deepEqual(response.body, postPartyResponse)
})
