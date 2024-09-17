import { createReadStream, Stats } from 'fs'
import {} from '@koishijs/plugin-server'
import { stat } from 'fs/promises'
import { Context, escapeRegExp, noop, sanitize, z } from 'koishi'
import { extname, resolve } from 'path'

export const name = 'public'
export const inject = ['server']
export const reusable = true

export interface Config {
  root: string
  path: string
}

export const Config: z<Config> = z.object({
  root: z.path({
    filters: ['directory'],
    allowCreate: true,
  }).default('data/public').description('存放文件的根目录。'),
  path: z.string().default('/').description('部署文件的路径。'),
})

export function apply(ctx: Context, config: Config) {
  const root = resolve(ctx.baseDir, config.root)
  const path = sanitize(config.path)

  ctx.server.get(path + '(.*)', async (ctx, next) => {
    const filename = resolve(root, ctx.path.slice(path.length).replace(/^\/+/, ''))
    if (!filename.startsWith(root)) return next()
    const stats = await stat(filename).catch<Stats>(noop)
    if (stats?.isFile()) {
      ctx.type = extname(filename)
      return ctx.body = createReadStream(filename)
    }
    return next()
  })
}
