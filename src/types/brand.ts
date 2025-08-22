export type UUID = string;

export type BrandStatus = "active" | "inactive" | "draft";

export interface Brand {
  id: UUID;
  brand_name: string;
  titular?:string;
  status: BrandStatus;
}

export interface BrandCreate {
  brand_name: string;
  titular?:string;
}

export interface BrandUpdate {
  brand_name?: string;
  titular?:string;
  status?: BrandStatus;
}

export interface BrandList {
  total: number;
  items: Brand[];
}
