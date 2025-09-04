const state = () => ({
  contadores: [],
});

const mutations = {
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

const actions = {
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

const getters = {
  totalContadores: (state) => state.contadores.reduce((acc, contador) => acc + contador.valor, 0),
};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
