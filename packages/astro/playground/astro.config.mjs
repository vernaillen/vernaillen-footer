import { defineConfig } from 'astro/config'
import vernaillenFooter from '../src/index'

export default defineConfig({
  integrations: [vernaillenFooter()]
})
