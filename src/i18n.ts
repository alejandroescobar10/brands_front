export type Lang = "es" | "en";

type Dict = Record<string, string>;

const es: Dict = {
  "header.panel": "Panel",
  "header.brandRegistry": "Registro de Marca",
  "header.test": "Prueba Técnica",

  "breadcrumb.services": "Servicios",
  "breadcrumb.separator": "/",
  "breadcrumb.brandRegistry": "Registro de Marca",

  "actions.newRecord": "Nuevo Registro",
  "actions.update": "Actualizar",
  "actions.delete": "Eliminar",
  "actions.back": "Atrás",
  "actions.goToList": "Ir al listado",
  "actions.registerAnother": "Registrar otra",

  "list.search.placeholder": "Buscar por marca o titular…",
  "list.showing": "Mostrando {count} de {total}",
  "list.pageOf": "Página {current} de {pages}",
  "list.empty": "Sin resultados.",

  "table.number": "#",
  "table.brand": "Marca",
  "table.owner": "Titular",
  "table.status": "Estado",
  "table.actions": "Acciones",

  "status.active": "Activa",
  "status.inactive": "Inactiva",
  "status.draft": "Borrador",

  "create.step1.title": "Información de la Marca",
  "create.step1.label.brand": "Marca a registrar",
  "create.step1.placeholder.brand": "Ej: Sony",
  "create.step1.cta": "Continuar →",

  "create.step2.title": "Titular de la Marca",
  "create.step2.label.owner": "Titular",
  "create.step2.placeholder.owner": "Ej: Juan Pérez",
  "create.step2.cta": "Continuar →",
  "create.step2.saving": "Guardando...",

  "summary.success.title": "¡Registro exitoso!",
  "summary.success.subtitle": "La marca fue creada correctamente en el sistema.",
};

const en: Dict = {
  "header.panel": "Panel",
  "header.brandRegistry": "Brand Registry",
  "header.test": "Technical Test",

  "breadcrumb.services": "Services",
  "breadcrumb.separator": "/",
  "breadcrumb.brandRegistry": "Brand Registry",

  "actions.newRecord": "New Record",
  "actions.update": "Update",
  "actions.delete": "Delete",
  "actions.back": "Back",
  "actions.goToList": "Go to list",
  "actions.registerAnother": "Register another",

  "list.search.placeholder": "Search by brand or owner…",
  "list.showing": "Showing {count} of {total}",
  "list.pageOf": "Page {current} of {pages}",
  "list.empty": "No results.",

  "table.number": "#",
  "table.brand": "Brand",
  "table.owner": "Owner",
  "table.status": "Status",
  "table.actions": "Actions",

  "status.active": "Active",
  "status.inactive": "Inactive",
  "status.draft": "Draft",

  "create.step1.title": "Brand Information",
  "create.step1.label.brand": "Brand to register",
  "create.step1.placeholder.brand": "e.g., Sony",
  "create.step1.cta": "Continue →",

  "create.step2.title": "Brand Owner",
  "create.step2.label.owner": "Owner",
  "create.step2.placeholder.owner": "e.g., John Smith",
  "create.step2.cta": "Continue →",
  "create.step2.saving": "Saving...",

  "summary.success.title": "Registration successful!",
  "summary.success.subtitle": "The brand has been created successfully.",
};

export const messages: Record<Lang, Dict> = { es, en };

export function translate(lang: Lang, key: string, vars?: Record<string, string | number>) {
  const dict = messages[lang] ?? messages.es;
  let out = dict[key] ?? key; // si falta la clave, muestra la clave
  if (vars) {
    for (const k of Object.keys(vars)) {
      out = out.replace(new RegExp(`{${k}}`, "g"), String(vars[k]));
    }
  }
  return out;
}
