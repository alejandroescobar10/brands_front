# Frontend – Brands (Vite + React + Tailwind)

Proyecto **SPA** para gestionar marcas. Construido con **Vite + React**, estilizado con **Tailwind**, y desplegado en **Vercel**. Consume un backend FastAPI en `brands-back`.

---

## 🚀 Stack

- React 18 + Vite
- TypeScript
- Tailwind CSS (con modo oscuro por clase)
- React Router
- Axios

---

## ✅ Requisitos

- Node.js 18 o superior
- npm / pnpm / yarn
- URL pública del backend (FastAPI) ya desplegado (ej.: `https://brands-back.vercel.app/api`)

---

## 🔧 Variables de entorno

Crea un archivo **`.env.local`** en la raíz del frontend:

```env
# URL base del backend (sin slash final)
VITE_API_URL=https://brands-back.vercel.app/api
```
