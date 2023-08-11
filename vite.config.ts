import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import Kits from './build/kits.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), Kits(["@google-labs/llm-starter"])]
})
