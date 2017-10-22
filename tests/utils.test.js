const test = require('ava')
const { capitalize, checkParameters } = require('../src/utils')

test('should return the capitalized word', t => {
  t.is(capitalize('cAsa'), 'Casa')
})

test('should check parameters and match in specific type', t => {
  const app = checkParameters('add').matchWith({
    Build: () => {},

    Add: () => 'add',

    NotExist: () => {}
  })

  t.is(app, 'add')
})
