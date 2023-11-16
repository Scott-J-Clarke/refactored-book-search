import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      // Uncomment '/graphql': { once 'queries' and 'mutations' are built in 'client' folder:
      '/graphql': {
      // Comment out '/api': { once 'queries' and 'mutations' are built in 'client' folder:
      // '/api': {
        target: 'http://localhost:3001',
        secure: false,
        changeOrigin: true
      }
    }
  }
})
