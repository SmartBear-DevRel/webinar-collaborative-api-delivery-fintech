import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
      commonjsOptions: { transformMixedEsModules: true }
    },
    plugins: [react()],
    define: {
        'process.env.VITE_APP_API_BASE_URL': process.env.VITE_APP_API_BASE_URL
      }
  };
});