// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css'
  ],
  icon: {
    size: '20px',
    collections: ['heroicons']
  },
  modules: ['@nuxt/eslint', '@nuxt/icon'],
  ssr: false, // Cambiar a SPA para GitHub Pages
  nitro: {
    prerender: {
      routes: ['/']
    }
  },
  plugins: [
    '~/plugins/vuex.js'
  ],
  app: {
    head: {
      style: [
        {
          innerHTML: `
            body { 
              visibility: hidden; 
              opacity: 0; 
              transition: opacity 0.3s ease;
            }
            .page-ready { 
              visibility: visible !important; 
              opacity: 1 !important; 
            }
          `
        }
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap'
        }
      ]
    }
  }
})