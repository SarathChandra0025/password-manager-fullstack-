import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'vite-plugin-tailwind';


// https://vite.dev/config/
export default defineConfig({
  plugins: [    tailwindcss(),
    ,react()],
})
