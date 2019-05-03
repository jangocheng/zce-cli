import { Context, Command } from './types'

/**
 * invoke command
 * @param cmd command
 * @param ctx context
 */
export const invoke = async (cmd: Command, ctx: Context): Promise<any> => {
  return await cmd.action(ctx)
}