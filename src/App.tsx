import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import CityPage from "@/pages/CityPage";
import CatalogPage from "@/pages/CatalogPage";
import DeliveryPage from "@/pages/DeliveryPage";
import AboutPage from "@/pages/AboutPage";
import ContactsPage from "@/pages/ContactsPage";
import CalculatorPage from "@/pages/CalculatorPage";
import ReviewsPage from "@/pages/ReviewsPage";
import BlogPage from "@/pages/BlogPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppContent() {
  const [currentCity, setCurrentCity] = useState<string>(() => {
    return localStorage.getItem("selectedCity") || "moskva";
  });

  const handleCityChange = (slug: string) => {
    setCurrentCity(slug);
    localStorage.setItem("selectedCity", slug);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--brand-navy)" }}>
      <Header currentCity={currentCity} onCityChange={handleCityChange} />
      <main className="flex-1">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage currentCity={currentCity} />} />
          <Route path="/catalog" element={<CatalogPage currentCity={currentCity} />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacts" element={<ContactsPage currentCity={currentCity} />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/city/:slug" element={<CityPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
