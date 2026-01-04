import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 4000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks: (id: string) => {
              if (!id.includes('node_modules')) return undefined;

              if (
                id.includes('react') ||
                id.includes('react-dom') ||
                id.includes('react-router-dom')
              ) {
                return 'react';
              }

              if (
                id.includes('@ant-design/icons') ||
                id.includes('@ant-design/colors') ||
                id.includes('@ant-design/cssinjs')
              ) {
                return 'antd-utils';
              }

              if (id.includes('/node_modules/antd/es/')) {
                const match = id.match(/node_modules\/antd\/es\/([^/]+)/);
                return match ? `antd-${match[1]}` : 'antd';
              }

              if (id.includes('dayjs') || id.includes('lucide-react')) {
                return 'utils';
              }

              return undefined;
            }
          }
        }
      }
    };
});
