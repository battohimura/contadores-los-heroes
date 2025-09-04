import store from '~/app/plugins/store'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store)
})
