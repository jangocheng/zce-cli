import { dirname } from 'path'
import { sniff } from './sniffer'

// // Prevent caching of this module so module.parent is always accurate
delete require.cache[__filename]
global['parentDir'] = module.parent ? dirname(module.parent.filename) : ''

// check the node version
sniff()

// we want to see real exceptions with backtraces and stuff
process.removeAllListeners('unhandledRejection').on('unhandledRejection', e => {
  throw e
})

export { run } from './runner'
export { logger, template } from './helpers'
export { unknownCommand, missingArgument } from './error'
export { Command, Context } from './types'
