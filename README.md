# vernaillen-footer

A thin "Created & maintained by Wouter Vernaillen" footer, with "Powered by WPNuxt" on WPNuxt sites and the date of the last deploy.

| Package | For |
|---|---|
| `@vernaillen/nuxt-footer` | Nuxt 4 |
| `@vernaillen/astro-footer` | Astro 7 |

The footer is added to the server-rendered HTML (also when prerendering), right before `</body>`. It inherits the site's text color, so it fits light and dark themes.

## Installing

The packages are public on npmjs.com, so installing needs no token and no `.npmrc` entry.

### Nuxt

```bash
pnpm add @vernaillen/nuxt-footer
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@vernaillen/nuxt-footer'],
  // optional
  vernaillenFooter: {
    enabled: true,
    deployedAt: true
  }
})
```

"Powered by WPNuxt" appears automatically when `@wpnuxt/core` is installed.

### Astro

```bash
pnpm add @vernaillen/astro-footer
```

```js
// astro.config.mjs
import vernaillenFooter from '@vernaillen/astro-footer'

export default defineConfig({
  integrations: [vernaillenFooter()] // or vernaillenFooter({ deployedAt: false })
})
```

"Last deployed" is the build time. In dev, it is the time the dev server started.

## Development

```bash
pnpm install
pnpm dev:prepare                              # stub the Nuxt module for its playground
pnpm --filter @vernaillen/nuxt-footer dev     # Nuxt playground
pnpm --filter @vernaillen/astro-footer dev    # Astro playground
pnpm lint:fix && pnpm typecheck && pnpm test
```

The footer markup lives in `shared/render.ts` and is bundled into both packages.

## Releasing

1. Bump `version` in the `package.json` of each package that changed.
2. Commit, then tag and push: `git tag -a v0.2.0 -m v0.2.0 && git push --follow-tags`.

The release workflow publishes every package whose version is not on npmjs.com yet. It uses npm trusted publishing: each package lists this repository and `release.yml` as its trusted publisher on npmjs.com, so there is no publish token.
