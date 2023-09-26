import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin, swcPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [vue({ template: { transformAssetUrls } }), vueJsx(), swcPlugin(), quasar({})]
  }
})
