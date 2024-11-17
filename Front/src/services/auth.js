import axios from "axios";

console.log("Base URL:", process.env.VUE_APP_API_URL);

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw new Error(`Login failed: ${error}`);
  }
};

export const signup = async (credentials) => {
  try {
    const response = await api.post("/auth/signup", credentials);
    return response.data;
  } catch (error) {
    throw new Error(`Signup failed: ${error}`);
  }
};

export default api;
