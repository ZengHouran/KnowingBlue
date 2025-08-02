import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/KnowingBlue/',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist'
  }
})