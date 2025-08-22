import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BrandForm from "../components/BrandForm";
import { getBrand, updateBrand } from "../services/brands";
import type { Brand, BrandCreate } from "../types/brand";

export default function BrandEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!id) return;
      try {
        const data = await getBrand(id);
        if (mounted) setBrand(data);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  if (!id) return null;

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <h1 className="text-2xl font-semibold">Editar marca</h1>

      {loading && <p>Cargando...</p>}

      {!loading && brand && (
        <BrandForm
          initial={brand}
          onSubmit={async (values: BrandCreate) => {
            try {
              await updateBrand(id, values);
              navigate("/");
            } catch (err) {
              console.error(err);
              alert("No se pudo actualizar la marca (¿nombre duplicado?).");
            }
          }}
          onCancel={() => navigate("/")}
          submitLabel="Guardar cambios"
        />
      )}

      {!loading && !brand && (
        <p className="text-red-600">No se encontró la marca.</p>
      )}
    </div>
  );
}
