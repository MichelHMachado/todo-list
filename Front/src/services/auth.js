import { api } from "./api";

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
