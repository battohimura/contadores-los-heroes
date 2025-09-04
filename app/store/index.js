import { createStore } from "vuex";
import contadores from "./contadores";

export default createStore({
  modules: {
    contadores,
  },
});

