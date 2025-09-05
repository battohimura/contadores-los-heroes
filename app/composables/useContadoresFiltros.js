import { ref, computed } from 'vue'

export function useContadoresFiltros() {
  // Estado reactivo de los filtros
  const filtroNombre = ref('')
  const ordenarPor = ref('')
  const direccionOrden = ref('asc')
  const tipoFiltroValor = ref('')
  const valorFiltro = ref(null)

  // Computed properties
  const hayFiltrosActivos = computed(() => {
    return filtroNombre.value.trim() || ordenarPor.value || tipoFiltroValor.value
  })

  // Función para aplicar filtros y ordenamiento
  const aplicarFiltros = (listaContadores) => {
    let resultado = [...listaContadores]

    // Filtrar por nombre
    if (filtroNombre.value.trim()) {
      resultado = resultado.filter(contador =>
        contador.nombre.toLowerCase().includes(filtroNombre.value.toLowerCase())
      )
    }

    // Filtrar por valor
    if (tipoFiltroValor.value && valorFiltro.value !== null) {
      if (tipoFiltroValor.value === 'mayor') {
        resultado = resultado.filter(contador => contador.valor > valorFiltro.value)
      } else if (tipoFiltroValor.value === 'menor') {
        resultado = resultado.filter(contador => contador.valor < valorFiltro.value)
      }
    }

    // Ordenar
    if (ordenarPor.value) {
      resultado.sort((a, b) => {
        let valorA, valorB
        
        if (ordenarPor.value === 'nombre') {
          valorA = a.nombre.toLowerCase()
          valorB = b.nombre.toLowerCase()
        } else if (ordenarPor.value === 'valor') {
          valorA = a.valor
          valorB = b.valor
        }

        if (direccionOrden.value === 'asc') {
          return valorA < valorB ? -1 : valorA > valorB ? 1 : 0
        } else {
          return valorA > valorB ? -1 : valorA < valorB ? 1 : 0
        }
      })
    }

    return resultado
  }

  // Función para guardar filtros en sessionStorage
  const guardarFiltrosEnSession = () => {
    const filtros = {
      filtroNombre: filtroNombre.value,
      ordenarPor: ordenarPor.value,
      direccionOrden: direccionOrden.value,
      tipoFiltroValor: tipoFiltroValor.value,
      valorFiltro: valorFiltro.value
    }
    sessionStorage.setItem('contadores_filtros', JSON.stringify(filtros))
  }

  // Función para cargar filtros desde sessionStorage
  const cargarFiltrosDeSession = () => {
    const savedFilters = sessionStorage.getItem('contadores_filtros')
    if (savedFilters) {
      try {
        const filtros = JSON.parse(savedFilters)
        filtroNombre.value = filtros.filtroNombre || ''
        ordenarPor.value = filtros.ordenarPor || ''
        direccionOrden.value = filtros.direccionOrden || 'asc'
        tipoFiltroValor.value = filtros.tipoFiltroValor || ''
        valorFiltro.value = filtros.valorFiltro || null
      } catch (error) {
        console.warn('Error al cargar filtros desde sessionStorage:', error)
      }
    }
  }

  // Función para limpiar todos los filtros
  const limpiarFiltros = () => {
    filtroNombre.value = ''
    ordenarPor.value = ''
    direccionOrden.value = 'asc'
    tipoFiltroValor.value = ''
    valorFiltro.value = null
    sessionStorage.removeItem('contadores_filtros')
  }

  // Función para actualizar filtros desde el componente
  const actualizarFiltros = (nuevosFiltros) => {
    filtroNombre.value = nuevosFiltros.filtroNombre
    ordenarPor.value = nuevosFiltros.ordenarPor
    direccionOrden.value = nuevosFiltros.direccionOrden
    tipoFiltroValor.value = nuevosFiltros.tipoFiltroValor
    valorFiltro.value = nuevosFiltros.valorFiltro
    guardarFiltrosEnSession()
  }

  return {
    // Estado reactivo
    filtroNombre,
    ordenarPor,
    direccionOrden,
    tipoFiltroValor,
    valorFiltro,
    
    // Computed properties
    hayFiltrosActivos,
    
    // Métodos
    aplicarFiltros,
    guardarFiltrosEnSession,
    cargarFiltrosDeSession,
    limpiarFiltros,
    actualizarFiltros
  }
}
