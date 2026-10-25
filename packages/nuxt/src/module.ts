import { addServerPlugin, addTemplate, defineNuxtModule, hasNuxtModule } from '@nuxt/kit'
import type { NuxtModule } from '@nuxt/schema'
import { renderFooter } from '../../../shared/render'

export interface ModuleOptions {
  enabled: boolean
  /** Show the build date as "Last deployed" */
  deployedAt: boolean
}

const module: NuxtModule<ModuleOptions> = defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@vernaillen/nuxt-footer',
    configKey: 'vernaillenFooter',
    compatibility: {
      nuxt: '>=4.0.0'
    }
  },
  defaults: {
    enabled: true,
    deployedAt: true
  },
  setup(options, nuxt) {
    if (!options.enabled) {
      return
    }

    // Generated after all modules are installed, so @wpnuxt/core is detected regardless of
    // module order, and the date is the moment this build ran
    const plugin = addTemplate({
      filename: 'vernaillen-footer/nitro-plugin.mjs',
      write: true,
      getContents: () => {
        const html = renderFooter({
          wpnuxt: hasNuxtModule('@wpnuxt/core', nuxt),
          deployedAt: options.deployedAt ? new Date() : undefined
        })
        // A plain function instead of defineNitroPlugin: nitropack is not resolvable from the app under strict pnpm
        return `const html = ${JSON.stringify(html)}
export default (nitroApp) => {
  nitroApp.hooks.hook('render:html', (ctx) => { ctx.bodyAppend.push(html) })
}`
      }
    })
    // Appended after the app root, so it never takes part in hydration
    addServerPlugin(plugin.dst)
  }
})

export default module
