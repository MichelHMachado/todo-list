import { login, signup } from "../../services/auth";

const state = {
  access_token: localStorage.getItem("access_token") || "",
  user: null,
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
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
      localStorage.setItem("access_token", data.access_token);
      commit("SET_USER", data.user);
    } catch (error) {
      console.error("Login failed:  ", error);
    }
  },

  async signup({ commit }, credentials) {
    try {
      const data = await signup(credentials);
      commit("SET_TOKEN", data.access_token);
      localStorage.setItem("access_token", data.access_token);
      commit("SET_USER", data.user);
    } catch (error) {
      console.error("Signup failed: ", error);
    }
  },
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  user: (state) => state.user,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
