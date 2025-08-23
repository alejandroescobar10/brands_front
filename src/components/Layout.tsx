import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useLanguage } from "../context/LanguageContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  // Hook de tema (dark/light)
  const { theme, toggle } = useTheme();

  // Contexto de idioma (lang actual, setter y función de traducción t)
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header superior */}
      <header className="sticky top-0 z-30 w-full bg-gradient-to-r from-black via-neutral-800 to-black text-white shadow">
        <div className="w-full px-6 py-4 flex items-center justify-between">
          {/* Logo / enlace principal */}
          <Link to="/" className="font-semibold text-lg tracking-tight">
            {t("header.panel")}
          </Link>

          {/* Navegación (oculta en móvil) */}
          <nav className="hidden md:flex items-center gap-4 text-sm text-white/80">
            <Link to="/" className="hover:text-white">
              {t("header.brandRegistry")}
            </Link>
            <span className="opacity-30">•</span>
            <span className="opacity-60">{t("header.test")}</span>
          </nav>

          {/* Controles (tema + idioma) */}
          <div className="flex items-center gap-3">
            {/* Botón de toggle de tema */}
            <button
              onClick={toggle}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
              title="Cambiar tema"
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button>

            {/* Selector de idioma */}
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as any)}
              className="bg-white/10 hover:bg-white/20 rounded-lg px-2 py-1 text-sm"
            >
              <option value="es">ES</option>
              <option value="en">EN</option>
            </select>
          </div>
        </div>
      </header>

      {/* Contenedor principal con aside + main */}
      <div className="w-full flex">
        {/* Sidebar (oculta en móvil) */}
        <aside className="hidden md:block w-64 shrink-0 border-r bg-white dark:bg-gray-800">
          <nav className="p-4 space-y-1">
            <div className="px-3 text-xs uppercase tracking-wide text-gray-400 mb-1">
              Dashboard
            </div>
            {/* Link con estilo activo/inactivo */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-sm font-medium ${
                  isActive
                    ? "bg-black text-white dark:bg-gray-700 dark:text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              {t("header.brandRegistry")}
            </NavLink>
          </nav>
        </aside>

        {/* Contenido dinámico */}
        <main className="flex-1 p-4 md:p-8 max-w-none">{children}</main>
      </div>
    </div>
  );
}
