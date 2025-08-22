import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import BrandsList from "./pages/BrandsList";
import BrandCreateStep1 from "./pages/BrandCreateStep1";
import BrandCreateStep2 from "./pages/BrandCreateStep2";
import BrandCreateStep3 from "./pages/BrandCreateStep3";
import BrandEdit from "./pages/BrandEdit";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<BrandsList />} />
        <Route path="/brands/new" element={<BrandCreateStep1 />} />
        <Route path="/brands/new/titular" element={<BrandCreateStep2 />} />
        <Route path="/brands/new/resumen" element={<BrandCreateStep3 />} />
        <Route path="/brands/:id/edit" element={<BrandEdit />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
