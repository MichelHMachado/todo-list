import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchQuery: "",
  },
  getters: {},
  mutations: {
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },
  },
  actions: {
    setSearchQuery({ commit }, query) {
      commit("setSearchQuery", query);
    },
  },
  modules: {},
});