import { api } from "../lib/api";
import type { Brand, BrandCreate, BrandList, BrandUpdate } from "../types/brand";

// Obtiene lista de marcas con filtros opcionales (q, limit, offset)
export async function listBrands(params?: { q?: string; limit?: number; offset?: number }) {
  const { data } = await api.get<BrandList>("/brands", { params });
  return data;
}

// Obtiene una marca por ID
export async function getBrand(id: string) {
  const { data } = await api.get<Brand>(`/brands/${id}`);
  return data;
}

// Crea una nueva marca
export async function createBrand(payload: BrandCreate) {
  const { data } = await api.post<Brand>("/brands", payload);
  return data;
}

// Actualiza una marca existente por ID
export async function updateBrand(id: string, payload: BrandUpdate) {
  const { data } = await api.put<Brand>(`/brands/${id}`, payload);
  return data;
}

// Elimina una marca por ID
export async function deleteBrand(id: string) {
  await api.delete(`/brands/${id}`);
}
