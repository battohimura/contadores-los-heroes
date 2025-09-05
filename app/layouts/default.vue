<template>
  <div class="layout">
    <PageLoader v-if="isPageLoading" />
    <div v-show="!isPageLoading" class="layout__content">
      <AppHeader />
      <main class="layout__main">
        <div class="u-container">
          <slot />
        </div>
      </main>
      <footer class="layout__footer">
        <ContadoresResumen 
          :total-contadores="totalContadores"
          :suma-total="sumaTotal"
          :contadores-filtrados="totalContadores"
        />
      </footer>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageLoader from '~/components/ui/PageLoader.vue'
import AppHeader from '~/components/app/Header.vue'
import ContadoresResumen from '~/components/ContadoresResumen.vue'

export default {
  components: {
    PageLoader,
    AppHeader,
    ContadoresResumen
  },
  data() {
    return {
      isPageLoading: true
    }
  },
  computed: {
    ...mapGetters('contadores', {
      listaContadores: 'listaContadores',
      sumaTotal: 'sumaTotal'
    }),
    totalContadores() {
      return this.listaContadores.length
    }
  },
  mounted() {
    // Show body immediately with loader
    document.body.classList.add('page-ready')
    // Wait for fonts and styles to load
    this.waitForPageReady()
  },
  methods: {
    async waitForPageReady() {
      // Wait for document to be ready
      if (document.readyState !== 'complete') {
        await new Promise(resolve => {
          window.addEventListener('load', resolve, { once: true })
        })
      }

      // Wait for fonts to load
      if (document.fonts) {
        await document.fonts.ready
      }

      // Additional delay to ensure CSS is fully applied
      await new Promise(resolve => setTimeout(resolve, 300))

      // Hide loader
      this.isPageLoading = false
    }
  }
}
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout__content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.layout__main {
  flex: 1;
  padding-bottom: 120px; /* Space for fixed footer */
}

.layout__footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--card-bg);
  border-top: 1px solid var(--border);
  padding: 0;
  z-index: 50;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
}
</style>
