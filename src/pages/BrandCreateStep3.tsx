import { useLocation, useNavigate } from "react-router-dom";
import type { Brand } from "../types/brand";
import { useLanguage } from "../context/LanguageContext";

export default function BrandCreateStep3() {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { brand?: Brand } };
  const brand = location.state?.brand;
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="inline-flex items-center gap-2 rounded-xl bg-rose-100 text-rose-900 px-4 py-2 font-semibold">
        <span className="opacity-70">{t("breadcrumb.services")}</span>
        <span className="opacity-40">{t("breadcrumb.separator")}</span>
        <span>{t("breadcrumb.brandRegistry")}</span>
      </div>

      <div className="relative rounded-2xl border bg-white shadow-sm overflow-hidden p-8 space-y-6">
        {/* Stepper */}
        <div className="flex items-center justify-center gap-6">
          <Step number={1} />
          <Line />
          <Step number={2} />
          <Line />
          <Step number={3} active />
        </div>

        {/* Check animado */}
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center">
            <svg
              className="h-10 w-10 text-emerald-600 animate-scale-in"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-center text-xl font-semibold text-gray-800">
          {t("summary.success.title")}
        </h2>
        <p className="text-center text-gray-600">
          {t("summary.success.subtitle")}
        </p>

        {/* Resumen */}
        {brand && (
          <div className="max-w-md mx-auto bg-gray-50 border rounded-xl p-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">{t("table.brand")}:</span>
              <span>{brand.brand_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">{t("table.owner")}:</span>
              <span>{brand.titular || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">{t("table.status")}:</span>
              <span className="capitalize">
                {brand.status === "active"
                  ? t("status.active")
                  : brand.status === "inactive"
                  ? t("status.inactive")
                  : t("status.draft")}
              </span>
            </div>
          </div>
        )}

        {/* Botones */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/brands/")}
            className="px-6 py-2 rounded-xl border bg-white hover:bg-gray-50"
          >
            {t("actions.registerAnother")}
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow"
          >
            {t("actions.goToList")}
          </button>
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
