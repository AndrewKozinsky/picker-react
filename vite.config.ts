import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      strict: false
    },
    proxy: {
      '/b2api': {
        target: 'https://awx.pro',
        changeOrigin: true,
        secure: false,
      },
      '/b2article': {
        target: 'https://awx.pro',
        changeOrigin: true,
        secure: false,
      },
      '/ru/b2article': {
        target: 'https://awx.pro',
        changeOrigin: true,
        secure: false,
      },
    }
  },
  /*test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTest.ts',
  },*/
  /*optimize: {
    include: ['decimal.js-light']
  }*/
})
