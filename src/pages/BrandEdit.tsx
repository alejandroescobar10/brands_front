import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BrandForm from "../components/BrandForm";
import { getBrand, updateBrand } from "../services/brands";
import type { Brand, BrandCreate } from "../types/brand";

export default function BrandEdit() {
  const { id } = useParams(); // id de la marca desde la URL
  const navigate = useNavigate();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);

  // Carga la marca al montar el componente
  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!id) return;
      try {
        const data = await getBrand(id); // obtiene datos del backend
        if (mounted) setBrand(data);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    }; // cleanup si el componente se desmonta
  }, [id]);

  if (!id) return null; // si no hay id en la URL, no renderiza

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <h1 className="text-2xl font-semibold">Editar marca</h1>

      {loading && <p>Cargando...</p>}

      {/* Formulario cuando ya se cargó y existe la marca */}
      {!loading && brand && (
        <BrandForm
          initial={brand} // datos iniciales
          onSubmit={async (values: BrandCreate) => {
            try {
              await updateBrand(id, values); // actualiza en el backend
              navigate("/"); // vuelve a la lista
            } catch (err) {
              console.error(err);
              alert("No se pudo actualizar la marca (¿nombre duplicado?).");
            }
          }}
          onCancel={() => navigate("/")}
          submitLabel="Guardar cambios"
        />
      )}

      {/* Mensaje si no se encontró la marca */}
      {!loading && !brand && (
        <p className="text-red-600">No se encontró la marca.</p>
      )}
    </div>
  );
}
