import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'Cher Ami',
      short_name: 'cherami',
      description: 'One click personal QR sharing',
      theme_color: '#ffffff',

    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      sourcemap: true
    },

    devOptions: {
      enabled: true,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  }),
  {
    name: 'stampy',
    transformIndexHtml: (contents, _filePath) => {
      const hash = fs.readFileSync('./.git/refs/heads/main', 'utf8');
      return contents.replace('</body>', `<hr/><span class="fs-6 float-center" style="color:#ddd;">${hash}</span> </body>`)
    }
  }
  ],
})