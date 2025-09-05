export default {
  addContador(state, payload) {
    // Validar límite máximo de contadores
    if (state.contadores.length >= state.maxContadores) {
      return;
    }
    
    // Validar nombre no vacío y longitud
    const nombre = payload.nombre?.trim();
    if (!nombre || nombre.length === 0 || nombre.length > state.maxCaracteresNombre) {
      return;
    }
    
    // Validar valor inicial
    const valor = Math.max(0, Math.min(payload.cantidad || 0, state.maxValorContador));
    
    const newId = state.contadores.length > 0 ? Math.max(...state.contadores.map(c => c.id)) + 1 : 0;
    state.contadores.push({
      id: newId,
      nombre,
      valor,
    });
    
    // Guardar en localStorage
    localStorage.setItem('contadores', JSON.stringify(state.contadores));
  },
  incrementarContador(state, id) {
    const contador = state.contadores.find(c => c.id === id);
    if (contador && contador.valor < state.maxValorContador) {
      contador.valor++;
      // Guardar en localStorage
      localStorage.setItem('contadores', JSON.stringify(state.contadores));
    }
  },
  decrementarContador(state, id) {
    const contador = state.contadores.find(c => c.id === id);
    if (contador && contador.valor > 0) {
      contador.valor--;
      // Guardar en localStorage
      localStorage.setItem('contadores', JSON.stringify(state.contadores));
    }
  },
  editarNombreContador(state, { id, nombre }) {
    const contador = state.contadores.find(c => c.id === id);
    const nombreTrimmed = nombre?.trim();
    if (contador && nombreTrimmed && nombreTrimmed.length > 0 && nombreTrimmed.length <= state.maxCaracteresNombre) {
      contador.nombre = nombreTrimmed;
      // Guardar en localStorage
      localStorage.setItem('contadores', JSON.stringify(state.contadores));
    }
  },
  removeContador(state, id) {
    const index = state.contadores.findIndex(contador => contador.id === id);
    if (index !== -1) {
      state.contadores.splice(index, 1);
      // Guardar en localStorage
      localStorage.setItem('contadores', JSON.stringify(state.contadores));
    }
  },
  loadContadores(state) {
    try {
      const saved = localStorage.getItem('contadores');
      if (saved) {
        const contadores = JSON.parse(saved);
        // Validar que los datos cargados sean válidos
        if (Array.isArray(contadores)) {
          state.contadores = contadores.filter(c => 
            c && 
            typeof c.id === 'number' && 
            typeof c.nombre === 'string' && 
            c.nombre.length > 0 && 
            c.nombre.length <= state.maxCaracteresNombre &&
            typeof c.valor === 'number' && 
            c.valor >= 0 && 
            c.valor <= state.maxValorContador
          ).slice(0, state.maxContadores);
        }
      }
    } catch (error) {
      console.error('Error loading contadores from localStorage:', error);
      state.contadores = [];
    }
  },
};
