import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: '通吕运河',
    emptyOutDir: false,
  },
  server: {
    port: 3000,
    open: true
  }
})
