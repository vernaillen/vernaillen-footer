export interface FooterContent {
  wpnuxt: boolean
  deployedAt?: Date
}

const dateFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'Europe/Brussels'
})

// Inherits the site's text color so it fits both light and dark themes without knowing either
const style = `.vernaillen-footer{display:flex;flex-wrap:wrap;justify-content:center;gap:.25rem .75rem;padding:.5rem 1rem;border-top:1px solid color-mix(in srgb,currentColor 12%,transparent);font:400 .75rem/1.4 system-ui,sans-serif;opacity:.65;text-align:center}`
  + `.vernaillen-footer a{color:inherit;text-decoration:underline;text-underline-offset:2px}`
  + `.vernaillen-footer a:hover{opacity:.8}`

export function renderFooter({ wpnuxt, deployedAt }: FooterContent): string {
  const parts = ['<span>Created &amp; maintained by <a href="https://vernaillen.dev">Wouter Vernaillen</a></span>']
  if (wpnuxt) {
    parts.push('<span>Powered by <a href="https://wpnuxt.com">WPNuxt</a></span>')
  }
  if (deployedAt) {
    parts.push(`<span>Last deployed <time datetime="${deployedAt.toISOString()}">${dateFormat.format(deployedAt)}</time></span>`)
  }
  return `<style>${style}</style><div class="vernaillen-footer">${parts.join('')}</div>`
}
