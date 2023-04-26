import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import svgSpritePlugin from "vite-plugin-svg-sprite-component"
import htmlPurge from 'vite-plugin-purgecss'

export default defineConfig(({ command, mode }) => {
  const path = require('path')
  const env = loadEnv(mode, process.cwd(), '')
  const isBuild = command === 'build'

  return {
    // vite config
    root: path.resolve(__dirname, 'src'),
    build: {
      outDir: '../dist'
    },
    resolve: {
      alias: {
        '~@fancyapps': path.resolve(__dirname, 'node_modules/@fancyapps'),
        '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
        '~swiper': path.resolve(__dirname, 'node_modules/swiper'),
      }
    },
    plugins: [
      svgSpritePlugin({ symbolId: (name) => name }),
      isBuild ? htmlPurge({safelist: [/hs-*/, /fancybox-*/, /js-*/, /swiper-*/]}) : null,
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            base_url: env.BASE_URL,
            title: env.VITE_APP_NAME,
            description: env.VITE_APP_DESCRIPTION,
            og_site_name: env.VITE_OG_SITE_NAME,
            og_title: env.VITE_OG_TITLE ?? env.VITE_APP_NAME,
            og_description: env.VITE_OG_DESCRIPTION ?? env.VITE_APP_DESCRIPTION,
            gtm: env.VITE_GTM_CODE,
          }
        }
      })
    ],
    server: {
      port: 8080,
      hot: true
    }
  }
})
