import axios from "axios";

// URL base tomada de la variable de entorno VITE_API_URL
// Se limpia el "/" final si existe para evitar duplicados
const BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

// Cliente Axios configurado
export const api = axios.create({
  baseURL: BASE_URL,              // Ej: https://tu-backend.vercel.app/api
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: false,         // Poner true SOLO si usas cookies/sesión
  timeout: 15000,                 // Timeout de 15s
});

// Interceptor de request: loguea cada petición
api.interceptors.request.use((config) => {
  console.debug(
    "[API] ->",
    config.method?.toUpperCase(),
    `${config.baseURL}${config.url}`
  );
  return config;
});

// Interceptor de response: loguea errores de forma más clara
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
