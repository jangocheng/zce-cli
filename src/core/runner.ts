import { load } from './loader'
import { parse } from './parser'
import { invoke } from './invoker'
import { Options } from './types'

/**
 * Run the CLI
 * @param {string} opts cli brand | argv | options
 */
export const run = async (opts?: string | string[] | Options) => {
  // arguments
  if (opts === undefined) {
    opts = { brand: '', src: '' }
  } else if (typeof opts === 'string') {
    opts = { brand: opts, src: '' }
  } else if (opts instanceof Array) {
    opts = { brand: '', src: '', argv: opts }
  }

  // default brand
  // TODO: default brand
  opts.brand = opts.brand || 'zce'

  // default src
  opts.src = opts.src || global['parentDir']

  // default argv
  opts.argv = opts.argv || process.argv.slice(2)

  // load command by name
  const cmd = await load(opts.argv[0])

  // command flags options
  opts.options = cmd.options

  // remove sub command first argv
  if (!['default', 'help', 'version'].includes(cmd.name)) {
    opts.argv.pop() // sub command name
  }

  // parse cli context
  const ctx = await parse(opts)

  // invoke command
  return await invoke(cmd, ctx)
}
