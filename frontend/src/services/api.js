import axios from "axios";
import refreshToken from "./refreshToken";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(async (config) => {

  const token = localStorage.getItem("access");

  if (
    token &&
    !config.url.includes("login") &&
    !config.url.includes("register") &&
    !config.url.includes("token")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});

api.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    if (
    error.response?.status === 401 &&
    !originalRequest._retry &&
    !originalRequest.url.includes("token/refresh")
  ) {

      originalRequest._retry = true;

      const newAccess = await refreshToken();

      if (newAccess) {

        originalRequest.headers.Authorization =
          `Bearer ${newAccess}`;

        return api(originalRequest);

      }

    }

    return Promise.reject(error);

  }

);

export default api;