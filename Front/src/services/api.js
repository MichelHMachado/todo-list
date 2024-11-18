import axios from "axios";
import store from "@/store";
import router from "@/router";

export const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const access_token = store.state.auth.access_token;
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await api.post("/auth/refresh-token", {
          withCredentials: true,
        });
        const newAccessToken = response.data.access_token;
        store.commit("auth/SET_TOKEN", newAccessToken);

        api.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        sessionStorage.setItem("access_token", newAccessToken);
        return api(originalRequest);
      } catch (err) {
        store.commit("auth/logout");
        router.push("/login");
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
