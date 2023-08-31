import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `
          @import "@/assets/styles/mixin.less";
        `
      }
    }
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': 'http://localhost:9001'
    }
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
