import { describe, expect, it } from 'vitest'
import { renderFooter } from '../shared/render'

describe('renderFooter', () => {
  it('always credits vernaillen.dev', () => {
    const html = renderFooter({ wpnuxt: false })
    expect(html).toContain('href="https://vernaillen.dev"')
    expect(html).not.toContain('WPNuxt')
    expect(html).not.toContain('Last deployed')
  })

  it('mentions WPNuxt when used', () => {
    expect(renderFooter({ wpnuxt: true })).toContain('href="https://wpnuxt.com"')
  })

  it('shows the deploy date', () => {
    const html = renderFooter({ wpnuxt: false, deployedAt: new Date('2026-10-25T08:00:00Z') })
    expect(html).toContain('<time datetime="2026-10-25T08:00:00.000Z">25 Oct 2026</time>')
  })
})
