import { basename } from 'path'

import * as minimist from 'minimist'
import buildOptions from 'minimist-options'
import * as readPkgUp from 'read-pkg-up'

import { Options, Context } from './types'

/**
 * parse context from cli argv
 * @param opts cli options
 */
export const parse = async (opts: Options): Promise<Context> => {
  // parse argv by minimist
  const options = minimist(opts.argv, buildOptions(opts.options))

  // row input args
  const input = options._

  // extract arguments
  const [primary, secondary, thirdly, fourthly, ...extras] = input

  // excluding aliases
  Object.values(opts).forEach(item => {
    if (typeof item !== 'string' && item.alias) {
      if (typeof item.alias === 'string') {
        delete options[item.alias]
      } else {
        item.alias.forEach(a => delete options[a])
      }
    }
  })

  // excluding arguments
  delete options._

  // return context
  return {
    // cli brand name
    brand: opts.brand,
    primary,
    secondary,
    thirdly,
    fourthly,
    extras,
    input,
    options,
    // mount package.json
    pkg: readPkgUp({ cwd: opts.src })
  }
}
