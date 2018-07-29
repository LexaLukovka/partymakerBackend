'use strict'

const { test } = use('Test/Suite')('Example')

test('make sure 2 + 2 is 4', async ({ assert, expect }) => {

  assert.property({ tea: { green: 'matcha' } }, 'tea')
  assert.equal(2 + 2, 4)
})
