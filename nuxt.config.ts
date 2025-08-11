// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  ssr: false,
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
  runtimeConfig: {
    youtubeApiKey: process.env.YT_API_KEY, // private
    youtubeChannelId: process.env.YT_CHANNEL_ID, // private
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:5000'
    }
  },
   nitro: {
    routeRules: {
      '/api/**': { headers: { 'cache-control': 'no-store, no-cache, must-revalidate, proxy-revalidate' } }
    }
  }

})