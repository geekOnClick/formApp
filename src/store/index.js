import Vue from 'vue';
import Vuex from 'vuex';
import doctorsStore from "./module/doctorsStore"

Vue.use(Vuex);

export default new Vuex.Store({

  modules: {
    doctorsStore
  },
});
