import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path';

export default defineConfig({
  publicDir: './public',
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    /*
     *Uncomment the following line to enable solid-devtools.
     *For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
     */
    // devtools(),
    solidPlugin()
  ],
  server: {
    port: 3000
  },
  build: {
    target: 'esnext'
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  }
});