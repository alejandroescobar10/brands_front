// Alias para UUID (tipo string)
export type UUID = string;

// Posibles estados de una marca
export type BrandStatus = "active" | "inactive" | "draft";

// Representa una marca completa (como viene del backend)
export interface Brand {
  id: UUID;
  brand_name: string;
  titular?: string;     // opcional
  status: BrandStatus;
}

// Payload para crear una marca (POST)
export interface BrandCreate {
  brand_name: string;
  titular?: string;
}

// Payload para actualizar una marca (PUT/PATCH)
export interface BrandUpdate {
  brand_name?: string;
  titular?: string;
  status?: BrandStatus;
}

// Respuesta paginada de listado de marcas
export interface BrandList {
  total: number;
  items: Brand[];
}
