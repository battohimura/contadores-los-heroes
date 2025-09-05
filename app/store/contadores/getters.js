export default {
  sumaTotal: (state) => state.contadores.reduce((acc, contador) => acc + contador.valor, 0),
  listaContadores: (state) => state.contadores,
  cantidadContadores: (state) => state.contadores.length,
  puedeAgregarContador: (state) => state.contadores.length < state.maxContadores,
  maxContadores: (state) => state.maxContadores,
  maxValorContador: (state) => state.maxValorContador,
  maxCaracteresNombre: (state) => state.maxCaracteresNombre,
};
