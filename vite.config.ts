import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    includeAssets: [
      'favicon.ico',
      'favicon.svg',
      'apple-touch-icon-180x180.png',
      'maskable-icon-512x512.png',
      'pwa-192x192.png',
      'pwa-512x512.png',
      'pwa-64x64.png',
    ],

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
      display: "fullscreen",
      theme_color: '#ffffff',
      icons: [
        {
          src: "cherami.svg",
          sizes: "192x192 512x512",
          type: "image/svg+xml",
          purpose: "any"
        },
        {
          src: "pwa-64x64.png",
          sizes: "64x64",
          type: "image/png",
          purpose: "any"

        },
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any"
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any"
        }
      ],
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
      let hash = process.env.COMMIT_REF;
      try {
        if (hash == null) {
          hash = fs.readFileSync('./.git/refs/heads/main', 'utf8');
        }
        hash = hash.slice(-6);
      } catch (e) {
        console.error(e);
        hash = String(new Date().getTime());
      }

      return contents.replace('</body>', `<hr/><span class="fs-6 float-center" style="color:#ddd;">${hash}</span> </body>`)
    }
  }
  ],
})