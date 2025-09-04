export default {
  totalContadores: (state) => state.contadores.reduce((acc, contador) => acc + contador.valor, 0),
  listaContadores: (state) => state.contadores,
};
