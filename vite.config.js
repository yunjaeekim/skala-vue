import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages 는 https://<user>.github.io/<repo>/ 하위 경로로 서비스된다.
  // 빌드할 때만 저장소 이름을 base 로 지정하고, 로컬 개발 서버는 '/' 를 유지한다.
  base: command === 'build' ? '/skala-vue/' : '/',
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}))
