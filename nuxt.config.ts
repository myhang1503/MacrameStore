// https://nuxt.com/docs/api/configuration/nuxt-config

import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  ssr: false, //SEO
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui'
  ],
  css: ['~/assets/css/main.css'],
  ui: {
    prefix: 'Nuxt',
  },
   build: {
    // Bắt Nuxt transpile toàn bộ packages CKEditor (để Vite xử lý)
    transpile: [/^@ckeditor\/.*/]
  },
  runtimeConfig: {
    youtubeApiKey: process.env.YT_API_KEY, // private
    youtubeChannelId: process.env.YT_CHANNEL_ID, // private
    public: {
    apiBaseUrl: '/api'
    }
  },
  nitro: {
    routeRules: {
      '/api/**': {
        headers: {
          'cache-control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
        }
      }
    },
    prerender: {
      routes: [
        '/',
        '/about-us',
        '/blog',
        '/service',
        '/buying-guide',
        '/product-care',
        '/policy',
      ],
      ignore: ['/admin', '/admin/**'], 
    }
  },
  vite: {
    plugins: [
      ckeditor5({ theme: require.resolve('@ckeditor/ckeditor5-theme-lark') })
    ],
    ssr: {
      // Quan trọng: Đừng externalize CKEditor lúc SSR
      noExternal: [/^@ckeditor\/.*/]
    },
   
    
  }
})