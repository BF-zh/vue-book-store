import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Inspector from 'vite-plugin-vue-inspector'
import Layouts from 'vite-plugin-vue-layouts'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      /* options */
      dts: 'types/vue-router.d.ts',
      logs: true,
    }),
    Layouts(),
    // Vue 必须在 Layouts、VueRouter 之后
    vue(),
    Inspector({
      enabled: false,
      toggleButtonVisibility: 'active',
      launchEditor: 'cursor',
    }),
    Inspect(),
    UnoCSS(),
    AutoImport({
      dirs: ['src/store', 'src/hooks'],
      resolvers: [ElementPlusResolver({
        importStyle: 'sass',
      })],
      imports: ['vue', VueRouterAutoImports, 'pinia', '@vueuse/core', '@vueuse/head'],
      vueTemplate: true,
      dts: 'types/auto-imports.d.ts',
    }),
    Components({
      dirs: ['src/components'],
      dts: 'types/components.d.ts',
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
      deep: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.vue\?vue-component/, /src\/.*\.ts$/],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
  server: {
    // port: 8001,
    // open: true,
    host: true,
    proxy: {
      '/app-dev': {
        target: 'http://localhost:8080/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/app-dev/, ''),
      },
    },
  },
})
