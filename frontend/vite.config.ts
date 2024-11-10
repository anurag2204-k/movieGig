import { defineConfig } from 'vite'
import dotenv from 'dotenv';
import path from 'path';
import react from '@vitejs/plugin-react'

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api': {
        target: 'http://localhost:5001',
      }
    }
  },
  define: {
    'import.meta.env.VITE_API_KEY': JSON.stringify(process.env.VITE_API_KEY),
    __VITE_ENV__: JSON.stringify(process.env),
  },
})
