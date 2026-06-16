import apiClient from "./apiClient";

export const login = (credentials) => apiClient.post("/token/", credentials);

export const logout = (refresh) => apiClient.post("/logout/", { refresh });
