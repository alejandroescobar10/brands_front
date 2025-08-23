import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listBrands, deleteBrand } from "../services/brands";
import type { Brand } from "../types/brand";
import ConfirmDelete from "../components/ConfirmDelete";
import { useLanguage } from "../context/LanguageContext";

export default function BrandsList() {
  const { t } = useLanguage();

  // Estado de la tabla
  const [items, setItems] = useState<Brand[]>([]);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState(""); // búsqueda
  const [limit, setLimit] = useState(10); // tamaño página
  const [offset, setOffset] = useState(0); // inicio de página
  const [toDelete, setToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Carga datos desde backend
  async function load() {
    setLoading(true);
    const data = await listBrands({ q, limit, offset });
    setItems(data.items);
    setTotal(data.total);
    setLoading(false);
  }
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, limit, offset]);

  const currentPage = Math.floor(offset / limit) + 1;
  const pages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="space-y-6 w-full">
      {/* Header con breadcrumb y botón de nuevo registro */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="inline-flex items-center gap-2 rounded-xl bg-rose-100 text-rose-900 px-4 py-2 font-semibold">
          <span className="opacity-70">{t("breadcrumb.services")}</span>
          <span className="opacity-40">{t("breadcrumb.separator")}</span>
          <span>{t("breadcrumb.brandRegistry")}</span>
        </div>

        <Link
          to="/brands/new"
          className="inline-flex w-fit items-center justify-center rounded-xl bg-red-600 px-5 py-2.5 text-white font-semibold shadow-sm hover:bg-red-700 transition"
        >
          {t("actions.newRecord")}
        </Link>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 w-full">
        <input
          className="w-full border rounded-lg px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10"
          placeholder={t("list.search.placeholder")}
          value={q}
          onChange={(e) => {
            setOffset(0);
            setQ(e.target.value);
          }}
          aria-label={t("list.search.placeholder")}
        />
        <select
          className="border rounded-lg px-3 py-2 bg-white shadow-sm"
          value={limit}
          onChange={(e) => {
            setOffset(0);
            setLimit(parseInt(e.target.value));
          }}
          aria-label="Page size"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      {/* ====== MOBILE (cards) ====== */}
      <div className="md:hidden space-y-3">
        {items.map((b, i) => (
          <div key={b.id} className="rounded-xl border bg-white shadow-sm p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="font-semibold truncate">{b.brand_name}</div>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold
                ${
                  b.status === "active"
                    ? "bg-emerald-100 text-emerald-800"
                    : b.status === "inactive"
                    ? "bg-gray-200 text-gray-700"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {b.status === "active"
                  ? t("status.active")
                  : b.status === "inactive"
                  ? t("status.inactive")
                  : t("status.draft")}
              </span>
            </div>

            <div className="mt-1 text-sm text-gray-600">
              <span className="font-medium">{t("table.owner")}:</span>{" "}
              {b.titular ?? "-"}
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="text-xs text-gray-500">#{offset + i + 1}</div>
              <div className="inline-flex gap-3">
                <button
                  className="text-red-600 hover:text-red-700 font-semibold"
                  onClick={() => setToDelete(b.id)}
                >
                  {t("actions.delete")}
                </button>
                <Link
                  to={`/brands/${b.id}/edit`}
                  className="text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  {t("actions.update")}
                </Link>
              </div>
            </div>
          </div>
        ))}

        {!loading && items.length === 0 && (
          <div className="rounded-xl border bg-white p-6 text-center text-gray-500">
            {t("list.empty")}
          </div>
        )}
      </div>

      {/* ====== DESKTOP (tabla) ====== */}
      <div className="hidden md:block rounded-2xl border bg-white shadow-sm overflow-hidden w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm table-auto">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-3 text-left font-semibold w-24">
                  {t("table.number")}
                </th>
                <th className="p-3 text-left font-semibold">
                  {t("table.brand")}
                </th>
                <th className="p-3 text-left font-semibold">
                  {t("table.owner")}
                </th>
                <th className="p-3 text-left font-semibold">
                  {t("table.status")}
                </th>
                <th className="p-3 text-right font-semibold w-56">
                  {t("table.actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((b, i) => (
                <tr key={b.id} className="border-t">
                  <td className="p-3 text-gray-500">#{offset + i + 1}</td>
                  <td className="p-3 font-medium">{b.brand_name}</td>
                  <td className="p-3">{b.titular ?? "-"}</td>
                  <td className="p-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold
                      ${
                        b.status === "active"
                          ? "bg-emerald-100 text-emerald-800"
                          : b.status === "inactive"
                          ? "bg-gray-200 text-gray-700"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {b.status === "active"
                        ? t("status.active")
                        : b.status === "inactive"
                        ? t("status.inactive")
                        : t("status.draft")}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="inline-flex gap-2">
                      <button
                        className="text-red-600 hover:text-red-700 font-semibold"
                        onClick={() => setToDelete(b.id)}
                      >
                        {t("actions.delete")}
                      </button>
                      <span className="text-gray-300">/</span>
                      <Link
                        to={`/brands/${b.id}/edit`}
                        className="text-emerald-600 hover:text-emerald-700 font-semibold"
                      >
                        {t("actions.update")}
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}

              {!loading && items.length === 0 && (
                <tr>
                  <td className="p-6 text-center text-gray-500" colSpan={5}>
                    {t("list.empty")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginación (común a mobile/desktop) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-gray-50 rounded-xl">
        <div className="text-sm text-gray-600">
          {t("list.showing", { count: items.length, total })}
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled={offset === 0}
            onClick={() => setOffset(Math.max(0, offset - limit))}
            className="px-3 py-1.5 rounded-lg border bg-white disabled:opacity-50"
          >
            {t("list.prev") ?? "Anterior"}
          </button>
          <span className="text-sm text-gray-600">
            {t("list.pageOf", { current: currentPage, pages })}
          </span>
          <button
            disabled={offset + limit >= total}
            onClick={() => setOffset(offset + limit)}
            className="px-3 py-1.5 rounded-lg border bg-white disabled:opacity-50"
          >
            {t("list.next") ?? "Siguiente"}
          </button>
        </div>
      </div>

      {/* Modal de confirmación de borrado */}
      <ConfirmDelete
        open={!!toDelete}
        onCancel={() => setToDelete(null)}
        onConfirm={async () => {
          if (toDelete) {
            await deleteBrand(toDelete);
            setToDelete(null);
            await load();
          }
        }}
        text={t("actions.delete")}
      />
    </div>
  );
}
