export default {
  addContador({ commit }) {
    commit('addContador');
  },
  removeContador({ commit }, index) {
    commit('removeContador', index);
  },
  incrementarContador({ commit }, index) {
    commit('incrementarContador', index);
  },
};
