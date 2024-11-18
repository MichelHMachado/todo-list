import { login, signup } from "../../services/auth";

const state = {
  access_token: localStorage.getItem("access_token") || "",
  user: null,
};

const mutations = {
  SET_TOKEN(state, access_token) {
    state.access_token = access_token;
    localStorage.setItem("access_token", access_token);
  },
  CLEAR_TOKEN(state) {
    state.access_token = null;
    localStorage.removeItem("access_token");
  },
  SET_USER(state, user) {
    state.user = user;
  },
};

const actions = {
  async login({ commit }, credentials) {
    try {
      const data = await login(credentials);
      commit("SET_TOKEN", data.access_token);
      commit("SET_USER", data.user);
    } catch (error) {
      console.error("Login failed:  ", error);
    }
  },

  async signup({ commit }, credentials) {
    try {
      const data = await signup(credentials);
      commit("SET_TOKEN", data.access_token);
      commit("SET_USER", data.user);
    } catch (error) {
      console.error("Signup failed: ", error);
    }
  },
  logout({ commit }) {
    commit("CLEAR_TOKEN");
  },
};

const getters = {
  isAuthenticated: (state) => !!state.access_token,
  user: (state) => state.user,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
