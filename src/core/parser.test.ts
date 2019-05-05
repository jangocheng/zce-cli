import * as parser from './parser'
import { Options } from 'minimist-options'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name } = require('../../package.json')

test('unit:core:parser', async () => {
  expect(parser.parse).toBeTruthy()
})

test('unit:core:parser:parse', async () => {
  const ctx = await parser.parse(['foo', '--bar'])

  expect(ctx.brand).toBe('zce')
  expect(ctx.primary).toBe('foo')
  expect(ctx.secondary).toBe(undefined)
  expect(ctx.thirdly).toBe(undefined)
  expect(ctx.fourthly).toBe(undefined)
  expect(ctx.extras.length).toBe(0)
  expect(ctx.input[0]).toBe('foo')
  expect(ctx.options.bar).toBe(true)
  expect(ctx.pkg.name).toBe(name)
})

test('unit:core:parser:parse:with-options', async () => {
  const opts: Options = {
    foo: {
      alias: 'f'
    },
    bar: {
      alias: ['b', 'z']
    },
    baz: {},
    hi: 'string'
  }

  const ctx = await parser.parse(['-b'], opts)

  expect(ctx.options.bar).toBe(true)
})
