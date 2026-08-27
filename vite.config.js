import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// 배포 대상에 따라 base 경로가 달라진다.
// - GitHub Pages : https://<user>.github.io/<repo>/ 하위 경로 → '/skala-vue/'
// - Vercel       : https://<project>.vercel.app/ 루트        → '/'
// Vercel 은 빌드 환경에 VERCEL 환경변수를 자동으로 넣어주므로 이것으로 구분한다.
const isVercel = Boolean(process.env.VERCEL)

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' && !isVercel ? '/skala-vue/' : '/',
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}))
