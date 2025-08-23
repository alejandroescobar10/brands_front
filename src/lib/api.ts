// src/lib/api.ts
import axios from "axios";

const BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
// Ej: VITE_API_URL=https://tu-backend.vercel.app/api  (sin slash final)

export const api = axios.create({
  baseURL: BASE_URL,                       // => https://tu-backend.vercel.app/api
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: false,                  // pon true SOLO si usas cookies/sesión
  timeout: 15000,
});

// Logs útiles para depurar en prod
api.interceptors.request.use((config) => {
  console.debug("[API] ->", config.method?.toUpperCase(), `${config.baseURL}${config.url}`);
  return config;
});
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response) {
      console.error("[API ERROR]", err.response.status, err.response.data);
    } else {
      console.error("[API ERROR]", err.message);
    }
    return Promise.reject(err);
  }
);
