import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import WhatsAppFloat from './components/ui/WhatsAppFloat';
import HomePage from './pages/Public/HomePage';
import ProductsPage from './pages/Public/ProductsPage';
import ProductDetailPage from './pages/Public/ProductDetailPage';
import MaintenancePage from './pages/Public/MaintenancePage';
import ContactPage from './pages/Public/ContactPage';

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
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="maintenance" element={<MaintenancePage />} />
          <Route path="maintenance/:type" element={<MaintenancePage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
