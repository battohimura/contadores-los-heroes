// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: [
    '~/assets/css/theme.css',
    '~/assets/css/buttons.css',
    '~/assets/css/forms.css',
    '~/assets/css/cards.css',
    '~/assets/css/responsive.css'
  ],
  modules: ['@nuxt/eslint', '@nuxt/icon'],
  ssr: true,
  plugins: [
    '~/plugins/vuex.js'
  ]
})