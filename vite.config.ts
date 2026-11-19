import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          // Split heavy third-party libraries into separate chunks so the
          // initial JS payload is smaller and loads faster (improves LCP).
          manualChunks(id) {
            if (id.includes('node_modules/three')) return 'vendor-three';
            if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion')) return 'vendor-motion';
            if (id.includes('node_modules/firebase')) return 'vendor-firebase';
            if (id.includes('node_modules/lucide-react')) return 'vendor-lucide';
            if (id.includes('node_modules/react-router')) return 'vendor-router';
            if (id.includes('node_modules/@clerk')) return 'vendor-clerk';
            if (id.includes('node_modules/twilio') || id.includes('node_modules/nodemailer')) return 'vendor-notify';
          },
        },
      },
    },
    server: {
      host: true,
      allowedHosts: true as const,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true' ? { port: 24679, clientPort: 24679 } : false,
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    preview: {
      host: true,
      allowedHosts: true as const,
    },
  };
});
