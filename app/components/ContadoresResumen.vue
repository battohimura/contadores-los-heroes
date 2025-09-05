<template>
  <div class="resumen">
    <div class="resumen__content">
      <div class="resumen__stats">
        <div class="resumen__item">
          <Icon name="heroicons:chart-bar" class="resumen__icon" />
          <span class="resumen__valor">{{ totalContadores }}</span>
          <span class="resumen__label">Contadores</span>
        </div>
        <div class="resumen__item">
          <Icon name="heroicons:calculator" class="resumen__icon" />
          <span class="resumen__valor">{{ sumaTotal }}</span>
          <span class="resumen__label">Suma Total</span>
        </div>
        <div v-if="contadoresFiltrados < totalContadores" class="resumen__item resumen__item--filter">
          <Icon name="heroicons:funnel" class="resumen__icon" />
          <span class="resumen__valor">{{ contadoresFiltrados }}</span>
          <span class="resumen__label">Filtrados</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContadoresResumen',
  props: {
    totalContadores: {
      type: Number,
      required: true
    },
    sumaTotal: {
      type: Number,
      required: true
    },
    contadoresFiltrados: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
.resumen {
  background: var(--card-bg);
  border-top: 1px solid var(--border);
  padding: var(--space-md) 0;
  margin-top: 0;
}

.resumen__content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-md);
}

.resumen__stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-lg);
  flex-wrap: wrap;
}

.resumen__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-md);
  background: var(--bg-secondary);
  border-radius: var(--radius);
  min-width: 100px;
  transition: transform var(--transition-fast);
}

.resumen__item:hover {
  transform: translateY(-2px);
}

.resumen__item--filter {
  background: var(--primary-light);
  color: var(--primary-dark);
}

.resumen__icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--primary);
}

.resumen__item--filter .resumen__icon {
  color: var(--primary-dark);
}

.resumen__valor {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
}

.resumen__item--filter .resumen__valor {
  color: var(--primary-dark);
}

.resumen__label {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 500;
  text-align: center;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .resumen__content {
    padding: 0 1rem;
  }
  
  .resumen__stats {
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .resumen {
    padding: 1rem 0;
  }
  
  .resumen__content {
    padding: 0 0.75rem;
  }
  
  .resumen__stats {
    gap: 0.75rem;
    justify-content: space-around;
  }
  
  .resumen__item {
    flex: 1;
    min-width: 90px;
    max-width: 120px;
    padding: 0.75rem 0.5rem;
  }
  
  .resumen__icon {
    width: 1.125rem;
    height: 1.125rem;
  }
  
  .resumen__valor {
    font-size: 1.125rem;
  }
  
  .resumen__label {
    font-size: 0.6875rem;
  }
}

@media (max-width: 480px) {
  .resumen {
    padding: 0.75rem 0;
  }
  
  .resumen__content {
    padding: 0 0.5rem;
  }
  
  .resumen__stats {
    gap: 0.5rem;
    flex-direction: column;
  }
  
  .resumen__item {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: none;
    padding: 0.75rem 1rem;
    text-align: left;
  }
  
  .resumen__item--filter {
    order: -1;
  }
  
  .resumen__icon {
    width: 1rem;
    height: 1rem;
    order: 1;
  }
  
  .resumen__valor {
    font-size: 1.25rem;
    font-weight: 600;
    order: 3;
  }
  
  .resumen__label {
    font-size: 0.75rem;
    font-weight: 500;
    order: 2;
    flex: 1;
    margin-left: 0.75rem;
    text-align: left;
  }
}

@media (max-width: 320px) {
  .resumen__content {
    padding: 0 0.25rem;
  }
  
  .resumen__item {
    padding: 0.5rem 0.75rem;
  }
  
  .resumen__valor {
    font-size: 1.125rem;
  }
  
  .resumen__label {
    font-size: 0.6875rem;
  }
}
</style>
