<template>
  <div class="lista-contadores">
    <div class="card u-p--md">

      <!-- Componente de filtros -->
      <ContadoresFiltros
        v-if="listaContadores.length > 0"
        :filtro-nombre="filtroNombre"
        :ordenar-por="ordenarPor"
        :direccion-orden="direccionOrden"
        :tipo-filtro-valor="tipoFiltroValor"
        :valor-filtro="valorFiltro"
        @filters-change="handleFiltersChange"
        @clear-filters="limpiarTodosFiltros"
      />

      <!-- Estado vacío -->
      <div v-if="listaContadores.length === 0" class="empty-state u-text--center u-py--lg">
        <div class="empty-state__icon u-mb--md">
          <Icon name="heroicons:plus-circle-16-solid" size="64" style="color: var(--secondary)" />
        </div>
        <h5 class="u-text--muted">No hay contadores disponibles</h5>
        <p class="u-text--muted">Usa el botón "Agregar Contador" en el header para comenzar</p>
      </div>
      
      <!-- Lista de contadores -->
      <ul class="contador-item__list">
        <li 
          v-for="contador in contadoresFiltrados" 
          :key="contador.id"
          class="contador-item"
        >
          <div class="contador-item__content">
            <div class="contador-item__nombre">
              <div 
                v-if="!contador.editando"
                class="contador-item__name-display"
                @click="startEdit(contador.id)"
              >
                {{ contador.nombre }}
              </div>
              <input
                v-else
                v-model="contador.nombre"
                class="contador-item__input"
                type="text"
                @blur="finishEdit(contador.id)"
                @keydown.enter="finishEdit(contador.id)"
                @keydown.escape="cancelEdit(contador.id)"
              >
            </div>
            
            <button 
              class="btn btn--outline-warning btn--sm"
              :disabled="contador.valor === 0"
              @click="decrementarContador(contador.id)"
            >
              <Icon name="heroicons:minus" />
            </button>
            
            <div class="contador-item__valor">
              {{ contador.valor }}
            </div>
            
            <button 
              class="btn btn--outline-success btn--sm"
              @click="incrementarContador(contador.id)"
            >
              <Icon name="heroicons:plus" />
            </button>
            
            <button 
              class="btn btn--outline-danger btn--sm"
              @click="eliminarContador(contador.id)"
            >
              <Icon name="heroicons:trash" />
            </button>
          </div>
        </li>
      </ul>

    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      filtroNombre: '',
      ordenarPor: '',
      direccionOrden: 'asc',
      tipoFiltroValor: '',
      valorFiltro: null
    }
  },
  computed: {
    ...mapGetters('contadores', {
      listaContadores: 'listaContadores',
      puedeAgregarContador: 'puedeAgregarContador',
      cantidadContadores: 'cantidadContadores',
      maxContadores: 'maxContadores',
      maxValorContador: 'maxValorContador',
      maxCaracteresNombre: 'maxCaracteresNombre'
    }),
    contadoresFiltrados() {
      let resultado = [...this.listaContadores]

      // Filtrar por nombre
      if (this.filtroNombre.trim()) {
        resultado = resultado.filter(contador =>
          contador.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
        )
      }

      // Filtrar por valor
      if (this.tipoFiltroValor && this.valorFiltro !== null) {
        if (this.tipoFiltroValor === 'mayor') {
          resultado = resultado.filter(contador => contador.valor > this.valorFiltro)
        } else if (this.tipoFiltroValor === 'menor') {
          resultado = resultado.filter(contador => contador.valor < this.valorFiltro)
        }
      }

      // Ordenar
      if (this.ordenarPor) {
        resultado.sort((a, b) => {
          let valorA, valorB
          
          if (this.ordenarPor === 'nombre') {
            valorA = a.nombre.toLowerCase()
            valorB = b.nombre.toLowerCase()
          } else if (this.ordenarPor === 'valor') {
            valorA = a.valor
            valorB = b.valor
          }

          if (this.direccionOrden === 'asc') {
            return valorA < valorB ? -1 : valorA > valorB ? 1 : 0
          } else {
            return valorA > valorB ? -1 : valorA < valorB ? 1 : 0
          }
        })
      }

      return resultado
    },
    sumaTotal() {
      return this.listaContadores.reduce((suma, contador) => suma + contador.valor, 0)
    },
    hayFiltrosActivos() {
      return this.filtroNombre.trim() || this.ordenarPor || this.tipoFiltroValor
    }
  },
  mounted() {
    // Cargar contadores desde localStorage al iniciar
    this.loadContadores()
    // Cargar filtros desde sessionStorage
    this.loadFiltersFromSession()
  },
  methods: {
    ...mapActions('contadores', {
      removeContador: 'removeContador',
      incrementarContador: 'incrementarContador',
      decrementarContador: 'decrementarContador',
      editarNombreContador: 'editarNombreContador',
      loadContadores: 'loadContadores'
    }),
    eliminarContador(id) {
      this.removeContador(id)
    },
    startEdit(id) {
      const contador = this.listaContadores.find(c => c.id === id)
      if (contador) {
        contador.editando = true
      }
    },
    finishEdit(id) {
      const contador = this.listaContadores.find(c => c.id === id)
      if (contador) {
        this.editarNombreContador({ id, nombre: contador.nombre })
        contador.editando = false
      }
    },
    cancelEdit(id) {
      const contador = this.listaContadores.find(c => c.id === id)
      if (contador) {
        // Restaurar nombre original desde store
        this.loadContadores()
        contador.editando = false
      }
    },
    handleFiltersChange(filtros) {
      this.filtroNombre = filtros.filtroNombre
      this.ordenarPor = filtros.ordenarPor
      this.direccionOrden = filtros.direccionOrden
      this.tipoFiltroValor = filtros.tipoFiltroValor
      this.valorFiltro = filtros.valorFiltro
      this.saveFiltersToSession()
    },
    limpiarTodosFiltros() {
      this.filtroNombre = ''
      this.ordenarPor = ''
      this.direccionOrden = 'asc'
      this.tipoFiltroValor = ''
      this.valorFiltro = null
      sessionStorage.removeItem('contadores_filtros')
    },
    saveFiltersToSession() {
      const filtros = {
        filtroNombre: this.filtroNombre,
        ordenarPor: this.ordenarPor,
        direccionOrden: this.direccionOrden,
        tipoFiltroValor: this.tipoFiltroValor,
        valorFiltro: this.valorFiltro
      }
      sessionStorage.setItem('contadores_filtros', JSON.stringify(filtros))
    },
    loadFiltersFromSession() {
      const savedFilters = sessionStorage.getItem('contadores_filtros')
      if (savedFilters) {
        try {
          const filtros = JSON.parse(savedFilters)
          this.filtroNombre = filtros.filtroNombre || ''
          this.ordenarPor = filtros.ordenarPor || ''
          this.direccionOrden = filtros.direccionOrden || 'asc'
          this.tipoFiltroValor = filtros.tipoFiltroValor || ''
          this.valorFiltro = filtros.valorFiltro || null
        } catch (error) {
          console.warn('Error al cargar filtros desde sessionStorage:', error)
        }
      }
    }
  }
}
</script>
