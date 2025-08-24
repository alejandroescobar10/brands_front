import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBrand } from "../services/brands";
import type { BrandCreate } from "../types/brand";
import { useLanguage } from "../context/LanguageContext";

// Validación: titular opcional, si viene debe tener 2–120 caracteres
const schema = z.object({
  titular: z
    .string()
    .min(2, "Mínimo 2 caracteres")
    .max(120, "Máximo 120")
    .optional(),
});
type FormValues = z.infer<typeof schema>;

export default function BrandCreateStep2() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Recibe el brand_name desde el paso anterior
  const location = useLocation() as { state?: { brand_name?: string } };
  const brand_name = location.state?.brand_name;

  // Si entran directo (sin step1), redirige
  useEffect(() => {
    if (!brand_name) navigate("/brands/new", { replace: true });
  }, [brand_name, navigate]);

  // Form con validación
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { titular: "" },
  });

  // Loader de guardado con barra de progreso
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (saving) {
      setProgress(12);
      timerRef.current = window.setInterval(() => {
        setProgress((p) => (p < 90 ? p + Math.max(1, (90 - p) * 0.08) : p));
      }, 120);
    } else {
      setProgress(0);
    }
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [saving]);

  if (!brand_name) return null; // evita render si no hay nombre

  return (
    <div className="space-y-6">
      {/* Breadcrumb superior */}
      <div className="inline-flex items-center gap-2 rounded-xl bg-rose-100 text-rose-900 px-4 py-2 font-semibold">
        <span className="opacity-70">{t("breadcrumb.services")}</span>
        <span className="opacity-40">{t("breadcrumb.separator")}</span>
        <span>{t("breadcrumb.brandRegistry")}</span>
      </div>

      {/* Card principal */}
      <div className="relative rounded-2xl border bg-white shadow-sm overflow-hidden">
        {/* Barra de progreso */}
        {progress > 0 && (
          <div className="absolute top-0 left-0 h-1 w-full">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 via-sky-400 to-fuchsia-400 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <div className="p-6 md:p-8 space-y-6">
          {/* Stepper */}
          <div className="flex items-center justify-center gap-6">
            <Step number={1} />
            <Line />
            <Step number={2} active />
            <Line />
            <Step number={3} />
          </div>

          <h2 className="text-center text-lg italic text-gray-600">
            {t("create.step2.title")}
          </h2>

          {/* Formulario */}
          <form
            className="max-w-xl mx-auto space-y-4"
            onSubmit={handleSubmit(async (v) => {
              try {
                setSaving(true);
                // Payload de creación
                const payload: BrandCreate = {
                  brand_name,
                  titular: v.titular?.trim() || undefined,
                };
                const brand = await createBrand(payload);
                setSaving(false);
                // Avanza al resumen (step3)
                navigate("/brands/new/resumen", { state: { brand } });
              } catch (err) {
                console.error(err);
                setSaving(false);
                alert(t("error.createBrand") || "No se pudo crear la marca.");
              }
            })}
          >
            {/* Campo titular */}
            <div>
              <label className="block text-sm font-medium">
                {t("create.step2.label.owner")}
              </label>
              <input
                className="mt-1 w-full border rounded px-3 py-2 text-white"
                placeholder={t("create.step2.placeholder.owner")}
                aria-label={t("create.step2.label.owner")}
                {...register("titular")}
              />
              {errors.titular && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.titular.message}
                </p>
              )}
            </div>

            {/* Botones navegación */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => navigate("/brands/new")}
                className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-50"
              >
                ← {t("actions.back")}
              </button>

              <button
                type="submit"
                className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition
                  ${
                    saving
                      ? "bg-red-500/70 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  } shadow`}
                disabled={saving}
              >
                {saving && (
                  <span className="inline-block h-4 w-4 rounded-full border-2 border-white/60 border-t-transparent animate-spin" />
                )}
                {saving ? t("create.step2.saving") : t("create.step2.cta")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Componente visual de stepper
function Step({
  number,
  active = false,
}: {
  number: number;
  active?: boolean;
}) {
  return (
    <div
      className={`h-10 w-10 rounded-full grid place-items-center text-sm font-semibold
      ${
        active
          ? "bg-rose-500 text-white shadow"
          : "bg-white border text-gray-700"
      }`}
    >
      {number}
    </div>
  );
}

// Línea entre pasos
function Line() {
  return <div className="h-0.5 w-12 bg-gray-300" />;
}
