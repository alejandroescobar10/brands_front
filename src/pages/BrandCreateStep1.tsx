import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguage } from "../context/LanguageContext";

const schema = z.object({
  brand_name: z.string().min(2, "Mínimo 2 caracteres").max(120, "Máximo 120"),
});

type FormValues = z.infer<typeof schema>;

export default function BrandCreateStep1() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { brand_name: "" },
  });

  // loader barra superior
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

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="inline-flex items-center gap-2 rounded-xl bg-rose-100 text-rose-900 px-4 py-2 font-semibold">
        <span className="opacity-70">{t("breadcrumb.services")}</span>
        <span className="opacity-40">{t("breadcrumb.separator")}</span>
        <span>{t("breadcrumb.brandRegistry")}</span>
      </div>

      <div className="relative rounded-2xl border bg-white shadow-sm overflow-hidden">
        {progress > 0 && (
          <div className="absolute top-0 left-0 h-1 w-full bg-transparent">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 via-sky-400 to-fuchsia-400 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <div className="p-6 md:p-8 space-y-6">
          {/* Stepper */}
          <div className="flex items-center justify-center gap-6">
            <Step number={1} active />
            <Line />
            <Step number={2} />
            <Line />
            <Step number={3} />
          </div>

          <h2 className="text-center text-lg italic text-gray-600">
            {t("create.step1.title")}
          </h2>

          <form
            className="max-w-xl mx-auto space-y-4"
            onSubmit={handleSubmit(async (v) => {
              setSaving(true);
              navigate("/brands/new/titular", {
                state: { brand_name: v.brand_name },
              });
            })}
          >
            <div>
              <label className="block text-sm font-medium">
                {t("create.step1.label.brand")}
              </label>
              <input
                className="mt-1 w-full border rounded px-3 py-2"
                placeholder={t("create.step1.placeholder.brand")}
                aria-label={t("create.step1.label.brand")}
                {...register("brand_name")}
              />
              {errors.brand_name && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.brand_name.message}
                </p>
              )}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => navigate("/brands/")}
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
                {t("create.step1.cta")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

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
function Line() {
  return <div className="h-0.5 w-12 bg-gray-300" />;
}
