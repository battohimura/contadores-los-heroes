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
    baseURL: process.env.NODE_ENV === 'production' ? '/contadores-los-heroes/' : '/',
    head: {
      title: 'Contadores Los Héroes',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Aplicación web para gestionar contadores de Los Héroes. Crea, edita y administra tus contadores de forma fácil y eficiente.' },
        { name: 'keywords', content: 'contadores, los heroes, gestión, aplicación web, contador digital, herramientas' },
        { name: 'author', content: 'Contadores Los Héroes' },
        { name: 'robots', content: 'index, follow' },
        { name: 'language', content: 'es' },
        { name: 'theme-color', content: '#3b82f6' },
        
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Contadores Los Héroes' },
        { property: 'og:description', content: 'Aplicación web para gestionar contadores de Los Héroes. Crea, edita y administra tus contadores de forma fácil y eficiente.' },
        { property: 'og:site_name', content: 'Contadores Los Héroes' },
        { property: 'og:locale', content: 'es_ES' },
        
        // Twitter
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Contadores Los Héroes' },
        { name: 'twitter:description', content: 'Aplicación web para gestionar contadores de Los Héroes. Crea, edita y administra tus contadores de forma fácil y eficiente.' }
      ],
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
        },
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        }
      ]
    }
  }
})