export default {
  addContador(state) {
    state.contadores.push({
      id: state.contadores.length,
      valor: 0,
    });
  },
  removeContador(state, index) {
    state.contadores.splice(index, 1);
  },
  incrementarContador(state, index) {
    state.contadores[index].valor++;
  },
};
