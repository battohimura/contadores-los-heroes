<template>
  <header class="header">
    <div class="header__container">
      <div class="header__brand">
        <Icon name="heroicons:trophy" class="header__icon" />
        <h1 class="header__title">Contadores Los Héroes</h1>
      </div>
      <nav class="header__nav">
        <button 
          class="btn btn--primary" 
          @click="openModal"
        >
          <Icon name="heroicons:plus" />
          Agregar Contador
        </button>
      </nav>
    </div>
    <!-- Modal para agregar contador -->
    <Teleport to="body">
      <ContadorModal 
        v-if="isModalOpen"
        :is-open="isModalOpen" 
        title="Agregar Contador"
        @close="closeModal"
        @submit="handleNewContador"
      />
    </Teleport>
  </header>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      isModalOpen: false
    }
  },
  methods: {
    ...mapActions('contadores', {
      addContador: 'addContador'
    }),
    openModal() {
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
    },
    handleNewContador(formData) {
      this.addContador(formData)
    }
  }
}
</script>

<style scoped>
.header {
  background: var(--card-bg);
  border-bottom: 1px solid var(--border);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header__icon {
  width: 2rem;
  height: 2rem;
  color: var(--primary);
}

.header__title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.header__nav {
  display: flex;
  align-items: center;
}

.header__nav .btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  gap: 0.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .header__container {
    padding: 0 0.75rem;
  }
  
  .header__title {
    font-size: 1.25rem;
  }
  
  .header__icon {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .header__nav .btn {
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
  }
}
</style>
