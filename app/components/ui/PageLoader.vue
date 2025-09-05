<template>
  <div v-if="isLoading" class="page-loader">
    <div class="page-loader__content">
      <div class="page-loader__spinner">
        <div class="spinner" />
      </div>
      <div class="page-loader__text">
        <h3 class="page-loader__title">Contadores Los Héroes</h3>
        <p class="page-loader__subtitle">Cargando aplicación...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageLoader',
  props: {
    isLoading: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.page-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: opacity 0.5s ease, visibility 0.5s ease;
}

.page-loader__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xl);
  text-align: center;
}

.page-loader__spinner {
  position: relative;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(59, 130, 246, 0.1);
  border-left: 4px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.page-loader__text {
  max-width: 300px;
}

.page-loader__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 var(--space-sm) 0;
  line-height: 1.2;
}

.page-loader__subtitle {
  font-size: 1rem;
  color: var(--text-muted);
  margin: 0;
  font-weight: 400;
}

/* Fade out animation */
.page-loader.fade-out {
  opacity: 0;
  visibility: hidden;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .page-loader__title {
    font-size: 1.25rem;
  }
  
  .page-loader__subtitle {
    font-size: 0.875rem;
  }
  
  .spinner {
    width: 50px;
    height: 50px;
  }
}
</style>
