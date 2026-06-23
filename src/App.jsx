import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import WhatsAppFloat from './components/ui/WhatsAppFloat';
import ProtectedRoute, { DashboardLayout } from './components/auth/ProtectedRoute';
import HomePage from './pages/Public/HomePage';
import ProductsPage from './pages/Public/ProductsPage';
import ProductDetailPage from './pages/Public/ProductDetailPage';
import MaintenancePage from './pages/Public/MaintenancePage';
import ContactPage from './pages/Public/ContactPage';
import LoginPage from './pages/Public/LoginPage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminCategories from './pages/Admin/AdminCategories';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminSales from './pages/Admin/AdminSales';
import AdminReports from './pages/Admin/AdminReports';
import AdminLogs from './pages/Admin/AdminLogs';
import AdminBackup from './pages/Admin/AdminBackup';
import AdminSettings from './pages/Admin/AdminSettings';
import CajeroPOS from './pages/Cajero/CajeroPOS';
import CajeroHistory from './pages/Cajero/CajeroHistory';

const PublicLayout = () => (
  <div className="corex-page flex min-h-screen flex-col">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
    <WhatsAppFloat />
  </div>
);

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

function App() {
  return (
    <BrowserRouter
      basename={basename}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="maintenance" element={<MaintenancePage />} />
          <Route path="maintenance/:type" element={<MaintenancePage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route element={<DashboardLayout />}>
            <Route path="admin/dashboard" element={<AdminDashboard />} />
            <Route path="admin/products" element={<AdminProducts />} />
            <Route path="admin/categories" element={<AdminCategories />} />
            <Route path="admin/users" element={<AdminUsers />} />
            <Route path="admin/sales" element={<AdminSales />} />
            <Route path="admin/reports" element={<AdminReports />} />
            <Route path="admin/logs" element={<AdminLogs />} />
            <Route path="admin/backup" element={<AdminBackup />} />
            <Route path="admin/settings" element={<AdminSettings />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['cajero', 'admin']} />}>
          <Route element={<DashboardLayout />}>
            <Route path="cajero/pos" element={<CajeroPOS />} />
            <Route path="cajero/history" element={<CajeroHistory />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
