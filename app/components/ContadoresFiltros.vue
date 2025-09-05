<template>
  <div class="filtros">
    <!-- Toggle para mostrar/ocultar filtros -->
    <div class="u-flex u-flex--justify-between u-flex--center u-mb--md">
      <h6 class="u-mb--none u-text--muted">
        <Icon name="heroicons:funnel" class="u-me--sm" />
        Filtros y Ordenamiento
      </h6>
      <button 
        class="btn btn--outline-secondary btn--sm"
        :aria-expanded="mostrarFiltros"
        aria-controls="filtros-content"
        @click="toggleFiltros"
      >
        <Icon :name="mostrarFiltros ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" />
        {{ mostrarFiltros ? 'Ocultar' : 'Mostrar' }}
      </button>
    </div>

    <!-- Contenido de filtros colapsable -->
    <div 
      id="filtros-content"
      class="filtros__content"
      :class="{ 'filtros__content--show': mostrarFiltros }"
    >
      <!-- Búsqueda por nombre -->
      <div class="u-mb--md">
        <label class="form__label u-text--sm u-text--semibold">
          <Icon name="heroicons:magnifying-glass" class="u-me--xs" />
          Buscar por nombre
        </label>
        <input
          :value="filtroNombre"
          type="text"
          class="form__input"
          placeholder="Escriba el nombre del contador..."
          @input="updateFiltroNombre"
        >
      </div>

      <!-- Controles de filtrado y ordenamiento -->
      <div class="filtros__grid u-mb--md">
        <!-- Ordenamiento -->
        <div class="form__field">
          <label class="form__label u-text--sm u-text--semibold">
            <Icon name="heroicons:bars-arrow-up" class="u-me--xs" />
            Ordenar por
          </label>
          <div class="u-flex u-gap--sm">
            <select 
              :value="ordenarPor" 
              class="form__input form__input--sm" 
              @change="updateOrdenarPor"
            >
              <option value="">Sin ordenar</option>
              <option value="nombre">Nombre</option>
              <option value="valor">Valor</option>
            </select>
            <select 
              :value="direccionOrden" 
              :disabled="!ordenarPor" 
              class="form__input form__input--sm" 
              @change="updateDireccionOrden"
            >
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </div>
        </div>

        <!-- Filtro por valor -->
        <div class="form__field">
          <label class="form__label u-text--sm u-text--semibold">
            <Icon name="heroicons:adjustments-horizontal" class="u-me--xs" />
            Filtrar por valor
          </label>
          <div class="u-flex u-gap--sm">
            <select 
              :value="tipoFiltroValor" 
              class="form__input form__input--sm" 
              @change="updateTipoFiltroValor"
            >
              <option value="">Sin filtro</option>
              <option value="mayor">Mayor a</option>
              <option value="menor">Menor a</option>
            </select>
            <input
              :value="valorFiltro"
              type="number"
              class="form__input form__input--sm"
              placeholder="Valor"
              min="0"
              max="20"
              :disabled="!tipoFiltroValor"
              @input="updateValorFiltro"
            >
          </div>
        </div>
      </div>

      <!-- Indicadores de filtros activos y botón limpiar -->
      <div v-if="hayFiltrosActivos" class="u-flex u-flex--justify-between u-flex--center">
        <div class="filtros__activos">
          <small class="u-text--muted">
            <Icon name="heroicons:information-circle" class="u-me--xs" />
            {{ conteoFiltrosActivos }} filtro(s) aplicado(s)
          </small>
        </div>
        <button 
          class="btn btn--outline-danger btn--sm" 
          title="Limpiar todos los filtros"
          @click="limpiarFiltros"
        >
          <Icon name="heroicons:x-mark" class="u-me--xs" />
          Limpiar filtros
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContadoresFiltros',
  props: {
    filtroNombre: {
      type: String,
      default: ''
    },
    ordenarPor: {
      type: String,
      default: ''
    },
    direccionOrden: {
      type: String,
      default: 'asc'
    },
    tipoFiltroValor: {
      type: String,
      default: ''
    },
    valorFiltro: {
      type: [Number, null],
      default: null
    }
  },
  emits: ['filters-change', 'clear-filters'],
  data() {
    return {
      mostrarFiltros: false
    }
  },
  computed: {
    hayFiltrosActivos() {
      return this.filtroNombre.trim() || this.ordenarPor || this.tipoFiltroValor
    },
    conteoFiltrosActivos() {
      let count = 0
      if (this.filtroNombre.trim()) count++
      if (this.ordenarPor) count++
      if (this.tipoFiltroValor) count++
      return count
    }
  },
  mounted() {
    // Cargar estado del toggle desde sessionStorage
    const savedToggleState = sessionStorage.getItem('contadores_filtros_toggle')
    if (savedToggleState !== null) {
      this.mostrarFiltros = JSON.parse(savedToggleState)
    }
  },
  methods: {
    toggleFiltros() {
      this.mostrarFiltros = !this.mostrarFiltros
      // Guardar estado del toggle en sessionStorage
      sessionStorage.setItem('contadores_filtros_toggle', JSON.stringify(this.mostrarFiltros))
    },
    updateFiltroNombre(event) {
      this.emitFiltersChange({ filtroNombre: event.target.value })
    },
    updateOrdenarPor(event) {
      this.emitFiltersChange({ ordenarPor: event.target.value })
    },
    updateDireccionOrden(event) {
      this.emitFiltersChange({ direccionOrden: event.target.value })
    },
    updateTipoFiltroValor(event) {
      this.emitFiltersChange({ tipoFiltroValor: event.target.value })
    },
    updateValorFiltro(event) {
      const value = event.target.value ? Number(event.target.value) : null
      this.emitFiltersChange({ valorFiltro: value })
    },
    emitFiltersChange(changes = {}) {
      this.$emit('filters-change', {
        filtroNombre: changes.filtroNombre ?? this.filtroNombre,
        ordenarPor: changes.ordenarPor ?? this.ordenarPor,
        direccionOrden: changes.direccionOrden ?? this.direccionOrden,
        tipoFiltroValor: changes.tipoFiltroValor ?? this.tipoFiltroValor,
        valorFiltro: changes.valorFiltro ?? this.valorFiltro
      })
    },
    limpiarFiltros() {
      this.$emit('clear-filters')
    }
  }
}
</script>

<style scoped>
.filtros {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.filtros__content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
  opacity: 0;
}

.filtros__content--show {
  max-height: 500px;
  opacity: 1;
}

.form__label {
  margin-bottom: 0.25rem;
  color: var(--text-muted);
}

.form__label .icon {
  font-size: 0.875rem;
}

.filtros__activos {
  display: flex;
  align-items: center;
}

.btn--sm .icon {
  font-size: 0.75rem;
}

</style>
