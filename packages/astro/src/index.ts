import { writeFileSync } from 'node:fs'
import type { AstroIntegration } from 'astro'
import { renderFooter } from '../../../shared/render'

export interface AstroFooterOptions {
  /** Show the build date as "Last deployed" */
  deployedAt?: boolean
}

export default function vernaillenFooter({ deployedAt = true }: AstroFooterOptions = {}): AstroIntegration {
  return {
    name: '@vernaillen/astro-footer',
    hooks: {
      'astro:config:setup': ({ addMiddleware, createCodegenDir }) => {
        const html = renderFooter({
          wpnuxt: false,
          deployedAt: deployedAt ? new Date() : undefined
        })
        // Middleware also runs while prerendering, so static pages get the footer in their HTML too
        const entrypoint = new URL('middleware.mjs', createCodegenDir())
        writeFileSync(entrypoint, `const html = ${JSON.stringify(html)}
export const onRequest = async (_context, next) => {
  const response = await next()
  if (!response.headers.get('content-type')?.includes('text/html')) return response
  const body = (await response.text()).replace('</body>', html + '</body>')
  const headers = new Headers(response.headers)
  headers.delete('content-length')
  return new Response(body, { status: response.status, statusText: response.statusText, headers })
}
`)
        addMiddleware({ order: 'post', entrypoint })
      }
    }
  }
}
