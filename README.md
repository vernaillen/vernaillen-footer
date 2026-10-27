# vernaillen-footer

A thin "Created & maintained by Wouter Vernaillen" footer, with "Powered by WPNuxt" on WPNuxt sites and the date of the last deploy.

| Package | For |
|---|---|
| `@vernaillen/nuxt-footer` | Nuxt 4 |
| `@vernaillen/astro-footer` | Astro 7 |

The footer is added to the server-rendered HTML (also when prerendering), right before `</body>`. It inherits the site's text color, so it fits light and dark themes.

## Installing

The packages are private, on GitHub Packages. Every site needs this in its `.npmrc`:

```ini
@vernaillen:registry=https://npm.pkg.github.com
```

The token goes in the **user-level** `~/.npmrc`, never in the site's: pnpm 12 ignores credentials in a repository's `.npmrc`, and on Linux it also ignores them as an `npm_config_` environment variable. Locally:

```ini
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
```

`GITHUB_PACKAGES_TOKEN` is a classic personal access token with only the `read:packages` scope, exported in your shell profile.

In GitHub Actions, store it as the repository secret `PACKAGES_TOKEN` (secret names can't start with `GITHUB_`) and write it to the runner's `~/.npmrc` before installing:

```yaml
- name: Install dependencies
  env:
    PACKAGES_TOKEN: ${{ secrets.PACKAGES_TOKEN }}
  run: |
    echo "//npm.pkg.github.com/:_authToken=${PACKAGES_TOKEN}" >> ~/.npmrc
    pnpm install --frozen-lockfile
```

In a Docker build, pass it as a BuildKit secret (`github_packages_token=${{ secrets.PACKAGES_TOKEN }}`) and write it to `~/.npmrc` in the install step only, so it never lands in a layer:

```dockerfile
RUN --mount=type=secret,id=github_packages_token,env=GITHUB_PACKAGES_TOKEN,required=true \
    echo "//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}" > /root/.npmrc \
    && pnpm install --frozen-lockfile \
    && rm /root/.npmrc
```

Sites using `vernaillen/workflows` get the Actions part from the shared pipeline; the Docker secret goes in `BUILD_SECRETS`.

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

The release workflow publishes every package whose version is not in the registry yet.
