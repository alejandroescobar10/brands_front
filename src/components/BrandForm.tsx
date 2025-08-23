import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Brand, BrandCreate } from "../types/brand";

// Validación con Zod
// - brand_name: obligatorio, entre 2 y 120 caracteres
// - status: enum requerido (active/inactive/draft)
// - titular: opcional, pero si viene debe tener entre 2 y 120 caracteres
const schema = z.object({
  brand_name: z.string().min(2, "Mínimo 2 caracteres").max(120, "Máximo 120"),
  status: z.enum(["active", "inactive", "draft"]),
  titular: z.string().min(2, "Mínimo 2").max(120, "Máx 120").optional(),
});

// Tipo inferido desde el schema
type FormValues = z.infer<typeof schema>;

export default function BrandForm({
  initial,
  onSubmit,
  onCancel,
  submitLabel = "Guardar",
}: {
  initial?: Partial<Brand>;
  onSubmit: (values: BrandCreate) => Promise<void> | void;
  onCancel?: () => void;
  submitLabel?: string;
}) {
  // react-hook-form con Zod como resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    // Valores iniciales (default en create, o datos previos en edit)
    defaultValues: {
      brand_name: initial?.brand_name ?? "",
      status: (initial?.status as FormValues["status"]) ?? "active",
      titular: initial?.titular ?? "",
    },
  });

  // Cuando cambian los datos iniciales, se resetea el form
  useEffect(() => {
    reset({
      brand_name: initial?.brand_name ?? "",
      status: (initial?.status as FormValues["status"]) ?? "active",
      titular: initial?.titular ?? "",
    });
  }, [initial, reset]);

  return (
    <form
      className="max-w-md space-y-4"
      onSubmit={handleSubmit(async (v) => {
        await onSubmit(v); // llama al callback externo con los valores
      })}
    >
      {/* Campo: Nombre de la marca */}
      <div>
        <label className="block text-sm font-medium">Marca</label>
        <input
          className="mt-1 w-full border rounded px-3 py-2"
          {...register("brand_name")}
          placeholder="Ej: Sony"
        />
        {errors.brand_name && (
          <p className="text-sm text-red-600 mt-1">
            {errors.brand_name.message}
          </p>
        )}
      </div>

      {/* Campo: Titular */}
      <div>
        <label className="block text-sm font-medium">Titular</label>
        <input
          className="mt-1 w-full border rounded px-3 py-2"
          {...register("titular")}
          placeholder="Ej: Juan Pérez"
        />
        {errors.titular && (
          <p className="text-red-600 text-sm mt-1">{errors.titular.message}</p>
        )}
      </div>

      {/* Campo: Estado */}
      <div>
        <label className="block text-sm font-medium">Estado</label>
        <select
          className="mt-1 w-full border rounded px-3 py-2"
          {...register("status")}
        >
          <option value="active">Activa</option>
          <option value="inactive">Inactiva</option>
          <option value="draft">Borrador</option>
        </select>
        {errors.status && (
          <p className="text-sm text-red-600 mt-1">
            {errors.status.message as string}
          </p>
        )}
      </div>

      {/* Acciones */}
      <div className="flex gap-2">
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            className="px-4 py-2 border rounded"
            onClick={onCancel}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
