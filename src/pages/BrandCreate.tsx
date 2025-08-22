import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandForm from "../components/BrandForm";
import { createBrand } from "../services/brands";
import type { BrandCreate } from "../types/brand";

export default function BrandCreate() {
  const navigate = useNavigate();

  // loading UX avanzado
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);

  // anima la barra mientras está guardando
  useEffect(() => {
    if (saving) {
      setProgress(12); // arranca visible
      timerRef.current = window.setInterval(() => {
        setProgress((p) => (p < 90 ? p + Math.max(1, (90 - p) * 0.08) : p));
      }, 120);
    } else {
      // completar y ocultar suave
      setProgress(100);
      const t = window.setTimeout(() => setProgress(0), 350);
      return () => window.clearTimeout(t);
    }
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [saving]);

  return (
    <div className="space-y-6">
      {/* Encabezado tipo breadcrumb */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-xl bg-rose-100 text-rose-900 px-4 py-2 font-semibold">
          <span className="opacity-70">Servicios</span>
          <span className="opacity-40">/</span>
          <span>Registro de Marca</span>
        </div>
      </div>

      {/* Card con barra de progreso arriba */}
      <div className="relative rounded-2xl border bg-white shadow-sm overflow-hidden">
        {/* Barra superior de progreso */}
        {progress > 0 && (
          <div className="absolute top-0 left-0 h-1 w-full bg-transparent">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 via-sky-400 to-fuchsia-400 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Contenido de la card */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Stepper simple */}
          <div className="flex items-center justify-center gap-6">
            <Step number={1} active />
            <Line />
            <Step number={2} />
            <Line />
            <Step number={3} />
          </div>

          <h2 className="text-center text-lg italic text-gray-600">
            Información de la Marca
          </h2>

          {/* Formulario */}
          <div className="flex justify-center">
            <div className="w-full max-w-xl">
              <BrandForm
                onSubmit={async (values: BrandCreate) => {
                  try {
                    setSaving(true);
                    // limpia titular vacío por si llega "", deja undefined
                    const payload: BrandCreate = {
                      ...values,
                      
                      titular: values?.["titular"]?.trim() || undefined,
                    };
                    await createBrand(payload);
                    setSaving(false);
                    navigate("/");
                  } catch (err) {
                    console.error(err);
                    setSaving(false);
                    alert("No se pudo crear la marca (¿nombre duplicado?).");
                  }
                }}
                onCancel={() => navigate("/")}
                submitLabel="Continuar →"
              />
            </div>
          </div>

          {/* Botón separado con estilo del mockup (si prefieres un CTA extra) */}
          <div className="flex justify-end">
            <button
              form="" // no asocia a otro form; dejamos el del BrandForm
              disabled={saving}
              onClick={() => {
                // dispara submit del formulario programáticamente:
                const form = document.querySelector("form");
                if (form) (form as HTMLFormElement).requestSubmit();
              }}
              className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition
                ${saving ? "bg-red-500/70 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"} shadow`}
            >
              {saving && (
                <span className="inline-block h-4 w-4 rounded-full border-2 border-white/60 border-t-transparent animate-spin" />
              )}
              {saving ? "Guardando..." : "Continuar →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Paso del stepper */
function Step({ number, active = false }: { number: number; active?: boolean }) {
  return (
    <div
      className={`h-10 w-10 rounded-full grid place-items-center text-sm font-semibold
        ${active ? "bg-rose-500 text-white shadow" : "bg-white border text-gray-700"}`}
    >
      {number}
    </div>
  );
}

/** Línea entre pasos */
function Line() {
  return <div className="h-0.5 w-12 bg-gray-300" />;
}
