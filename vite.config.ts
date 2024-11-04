import * as path from 'path';
import svg from '@neodx/svg/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { default as vitePluginChecker } from 'vite-plugin-checker';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      react(),
      vitePluginChecker({ typescript: true }),
      VitePWA({
        includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
        // switch to "true" to enable sw on development
        devOptions: {
          enabled: false
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html}', '**/*.{svg,png,jpg,gif}']
        }
      }),
      svg({
        root: 'public/icons',
        group: true,
        output: 'public/sprites',
        fileName: '{name}.{hash:8}.svg',
        metadata: {
          path: 'src/shared/ui/icon/sprite.gen.ts',
          runtime: {
            size: true,
            viewBox: true
          }
        },
        resetColors: {
          exclude: [/^flags/, /^logos/],
          replace: ['#000', '#eee', '#6C707E'],
          replaceUnknown: 'var(--icon-color)'
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  });
};
