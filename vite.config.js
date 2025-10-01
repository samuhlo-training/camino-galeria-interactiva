import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  build: {
    // Configuración para SPA (Single Page Application)
    rollupOptions: {
      output: {
        // Asegurar que los assets se nombren correctamente
        assetFileNames: 'assets/[name].[ext]',
        chunkFileNames: 'assets/[name].js',
        entryFileNames: 'assets/[name].js'
      }
    },
    // Generar archivos fuente map para debugging si es necesario
    sourcemap: false,
    // Optimizar para producción
    minify: 'esbuild',
    // Target moderno para mejor compatibilidad
    target: 'esnext',
    // Asegurar que se genere el manifest
    manifest: false,
    // Configuración de assets
    assetsDir: 'assets',
    // Out dir
    outDir: 'dist'
  },
  // Configuración del servidor de desarrollo
  server: {
    port: 3000,
    host: true
  },
  // Base path - usar relativo para máxima compatibilidad con diferentes plataformas de despliegue
  base: './',
  // Resolver para evitar problemas con rutas
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
