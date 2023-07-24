import { createReadStream, Stats } from 'fs'
import { stat } from 'fs/promises'
import { Context, noop, sanitize, z } from 'koishi'
import { extname, resolve } from 'path'

export const name = 'public'
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
  ctx.router.get(path + '(/.+)+', async (ctx, next) => {
    const filename = resolve(root, ctx.path.slice(path.length))
    if (!filename.startsWith(root)) {
      return ctx.status = 403
    }
    const stats = await stat(filename).catch<Stats>(noop)
    if (stats?.isFile()) {
      ctx.type = extname(filename)
      return ctx.body = createReadStream(filename)
    }
    return next()
  })
}
