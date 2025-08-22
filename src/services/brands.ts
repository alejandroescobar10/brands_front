import { api } from "../lib/api";
import type { Brand, BrandCreate, BrandList, BrandUpdate } from "../types/brand";

export async function listBrands(params?: { q?: string; limit?: number; offset?: number }) {
  const { data } = await api.get<BrandList>("/brands", { params });
  return data;
}

export async function getBrand(id: string) {
  const { data } = await api.get<Brand>(`/brands/${id}`);
  return data;
}

export async function createBrand(payload: BrandCreate) {
  const { data } = await api.post<Brand>("/brands", payload);
  return data;
}

export async function updateBrand(id: string, payload: BrandUpdate) {
  const { data } = await api.put<Brand>(`/brands/${id}`, payload);
  return data;
}

export async function deleteBrand(id: string) {
  await api.delete(`/brands/${id}`);
}
