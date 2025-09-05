export default {
  addContador({ commit }, payload) {
    commit('addContador', payload);
  },
  removeContador({ commit }, id) {
    commit('removeContador', id);
  },
  incrementarContador({ commit }, id) {
    commit('incrementarContador', id);
  },
  decrementarContador({ commit }, id) {
    commit('decrementarContador', id);
  },
  editarNombreContador({ commit }, { id, nombre }) {
    commit('editarNombreContador', { id, nombre });
  },
  loadContadores({ commit }) {
    commit('loadContadores');
  },
};
