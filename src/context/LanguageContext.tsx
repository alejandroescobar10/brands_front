import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { translate, type Lang } from "../i18n";

// Tipo del contexto: idioma actual, setter y función de traducción
type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

// Contexto inicial (puede ser undefined si no está dentro del provider)
const LanguageContext = createContext<Ctx | undefined>(undefined);

// ----------------------------------------------------------------------------
// Proveedor del contexto de idioma
// ----------------------------------------------------------------------------
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Estado: idioma actual (inicializado desde localStorage, por defecto "es")
  const [lang, setLangState] = useState<Lang>(
    () => (localStorage.getItem("lang") as Lang) || "es"
  );

  // Guarda el idioma en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  // Setter público que actualiza el estado
  const setLang = (l: Lang) => setLangState(l);

  // Función de traducción (usa helper translate con lang actual)
  const t = (key: string, vars?: Record<string, string | number>) =>
    translate(lang, key, vars);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ----------------------------------------------------------------------------
// Hook para consumir el contexto
// ----------------------------------------------------------------------------
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be inside LanguageProvider");
  return ctx;
}
