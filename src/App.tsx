import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MarqueeTicker } from './components/MarqueeTicker';
import {
  FindYourFixSection,
  BrandPromiseSection,
  CrowdFavoritesSection,
  LifestyleBentoSection,
  NewsletterSection,
} from './components/GrillvoraSections';
import { MenuCatalogSection } from './components/MenuCatalogSection';
import { StoryPage } from './components/StoryPage';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import { DishCustomizeModal } from './components/DishCustomizeModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderRadarModal } from './components/OrderRadarModal';
import { ProfileAuthModal } from './components/ProfileAuthModal';
import { ToastPopup } from './components/ToastPopup';
import { useStore } from './store/useStore';
import { Phone, ShoppingBag, Radar } from 'lucide-react';

export function App() {
  const {
    activePage,
    cart,
    setCartOpen,
    orders,
    trackedOrderId,
    setRadarOpen,
    language,
  } = useStore();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const activeOrder = orders.find((o) => o.orderId === trackedOrderId) || orders[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-[#F5F2EB] selection:bg-[#D4AF37] selection:text-[#09090B]">
      {/* Global Pop-Up Notification Banner */}
      <ToastPopup />

      {/* Full-Width Luxury Header Navigation */}
      <Navbar />

      {/* Main Content Router */}
      <main className="flex-1">
        {activePage === 'home' && (
          <>
            <HeroSection />
            <MarqueeTicker />
            <FindYourFixSection />
            <BrandPromiseSection />
            <LifestyleBentoSection />
            <CrowdFavoritesSection />
            <NewsletterSection />
          </>
        )}

        {activePage === 'menu' && (
          <>
            <MenuCatalogSection />
            <MarqueeTicker />
            <NewsletterSection />
          </>
        )}

        {activePage === 'story' && (
          <>
            <StoryPage />
            <MarqueeTicker />
            <NewsletterSection />
          </>
        )}

        {activePage === 'contact' && (
          <>
            <ContactPage />
            <MarqueeTicker />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals & Drawers */}
      <DishCustomizeModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderRadarModal />
      <ProfileAuthModal />

      {/* Floating Quick-Action Bar for Mobile & Order Tracking */}
      <div className="fixed bottom-4 right-4 left-4 sm:left-auto z-40 flex items-center justify-between sm:justify-end gap-2.5 pointer-events-none">
        {/* Direct Phone Call Pill on Mobile */}
        <a
          href="tel:+48691234567"
          className="pointer-events-auto sm:hidden flex items-center gap-2 px-4 py-3 rounded-full bg-[#111116] text-[#F5F2EB] font-bold text-xs shadow-2xl border border-[#D4AF37]/40"
        >
          <Phone className="w-4 h-4 text-[#D4AF37]" />
          <span>{language === 'en' ? 'Call Kitchen' : 'Zadzwoń'}</span>
        </a>

        {/* Live Order Radar Pill */}
        {activeOrder && (
          <button
            onClick={() => setRadarOpen(true, activeOrder.orderId)}
            className="pointer-events-auto flex items-center gap-2 px-4 py-3 rounded-full bg-[#111116] text-[#D4AF37] font-bold text-xs shadow-2xl border border-[#D4AF37]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Radar className="w-4 h-4" />
            <span>
              {language === 'en'
                ? `Track #${activeOrder.orderId}`
                : `Śledź #${activeOrder.orderId}`}
            </span>
          </button>
        )}

        {/* Floating Cart Pill when items exist */}
        {totalItems > 0 && (
          <button
            onClick={() => setCartOpen(true)}
            className="pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-full bg-[#D4AF37] text-[#09090B] font-extrabold text-xs shadow-2xl border border-[#F3E5AB] hover:scale-105 transition-transform"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>
              {totalItems} {language === 'en' ? 'items' : 'poz.'} • {cartTotal.toFixed(2)} zł
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
