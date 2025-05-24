import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/token': 'http://20.244.56.144',
      '/evaluation-service': 'http://20.244.56.144',
      '/stocks': 'http://20.244.56.144'
    }
  }
})