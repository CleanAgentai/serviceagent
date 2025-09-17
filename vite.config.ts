import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const isProduction = mode === 'production';
  const frontEndHostName = env.VITE_APP_DOMAIN;
  console.log(frontEndHostName)
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    base: '/',
    server: {
      port: 5173,
      host: true,
      hmr: {
        overlay: true,
      },
      allowedHosts: [
        frontEndHostName,
      ],
    },
    build: {
      outDir: 'dist',
      sourcemap: !isProduction,
      minify: isProduction ? 'terser' : false,
      terserOptions: isProduction ? {
        compress: {
          drop_console: true,
          drop_debugger: true,
        }
      } : undefined,
      // Skip TypeScript checking during build for now
      typescript: {
        ignoreBuildErrors: true,
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['@radix-ui/react-slot', 'class-variance-authority', 'clsx', 'tailwind-merge'],
            'chart-vendor': ['recharts'],
            'date-vendor': ['date-fns', 'react-day-picker'],
            'supabase': ['@supabase/supabase-js', '@supabase/postgrest-js']
          },
          entryFileNames: isProduction ? 'assets/[name].[hash].js' : 'assets/[name].js',
          chunkFileNames: isProduction ? 'assets/[name].[hash].js' : 'assets/[name].js',
          assetFileNames: isProduction ? 'assets/[name].[hash].[ext]' : 'assets/[name].[ext]',
        },
      },
      chunkSizeWarningLimit: 1000,
      cssCodeSplit: true,
      reportCompressedSize: false, // Speeds up build time
    },
    optimizeDeps: {
      include: [
        'react', 
        'react-dom', 
        'react-router-dom',
        '@supabase/supabase-js',
        '@supabase/postgrest-js',
        'lucide-react',
        'sonner',
        'date-fns',
        'uuid'
      ],
      exclude: [
        'chunk-KGX24KK4',
        'chunk-JLZYMQ2Y'
      ],
      esbuildOptions: {
        target: 'esnext'
      }
    },
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' }
    },
    preview: {
      port: 5001,
      host: true,
    },
  }
}) 