import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Phone,
  Radar,
  User,
  LogIn,
  Menu as MenuIcon,
  X,
  Globe,
} from 'lucide-react';
import { useStore, PageView } from '../store/useStore';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    activePage,
    setActivePage,
    cart,
    setCartOpen,
    setRadarOpen,
    setProfileModalOpen,
    isLoggedIn,
    userProfile,
  } = useStore();

  const [mobileOpen, setMobileOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks: { id: PageView; labelEn: string; labelPl: string }[] = [
    { id: 'home', labelEn: 'Home', labelPl: 'Start' },
    { id: 'menu', labelEn: 'Menu', labelPl: 'Menu' },
    { id: 'story', labelEn: 'Our Story', labelPl: 'O Nas' },
    { id: 'contact', labelEn: 'Contact', labelPl: 'Kontakt' },
  ];

  const handleNavClick = (page: PageView) => {
    setActivePage(page);
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full lux-nav">
      {/* Full-Width Stretched Header Container with Pixel-Perfect Alignment */}
      <div className="w-full px-4 sm:px-8 xl:px-14 h-20 flex items-center justify-between gap-4">
        {/* Left: Brand Emblem & Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3.5 text-left group cursor-pointer shrink-0"
        >
          <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] bg-[#09090B] overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.25)] group-hover:scale-105 transition-transform shrink-0">
            <img
              src="./images/brand/logo.jpg"
              alt="Doon Valley Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <span className="font-royal text-lg sm:text-xl font-bold tracking-wider text-[#F5F2EB] leading-none">
                DOON VALLEY
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#D4AF37]/15 text-[#F5C542] border border-[#D4AF37]/40">
                HALAL
              </span>
            </div>
            <span className="text-[11px] font-medium text-[#C8C2B4] tracking-widest uppercase mt-1">
              {language === 'en'
                ? 'Indian Restaurant & Bar • Kraków'
                : 'Indyjska Restauracja & Bar • Kraków'}
            </span>
          </div>
        </button>

        {/* Center: Clean Minimal Navigation Links */}
        <nav className="hidden lg:flex items-center justify-center gap-1 bg-[#141419] border border-white/10 rounded-full p-1.5">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#D4AF37] text-[#09090B] shadow-[0_4px_14px_rgba(212,175,55,0.4)]'
                    : 'text-[#C8C2B4] hover:text-[#F5F2EB] hover:bg-white/5'
                }`}
              >
                {language === 'en' ? link.labelEn : link.labelPl}
              </button>
            );
          })}
        </nav>

        {/* Right: Perfectly Aligned Action Controls (All h-10) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* 1. Phone Number Pill */}
          <a
            href="tel:+48691234567"
            title="Call Doon Valley Kraków: +48 691 234 567"
            className="hidden xl:inline-flex items-center gap-2 h-10 px-4 rounded-full bg-[#141419] hover:bg-[#1E1E26] border border-white/10 hover:border-[#D4AF37]/50 text-xs font-semibold text-[#F5F2EB] transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="tracking-wide whitespace-nowrap">+48 691 234 567</span>
          </a>

          {/* 2. Live Order Tracking Button */}
          <button
            onClick={() => setRadarOpen(true)}
            className="inline-flex items-center gap-2 h-10 px-3.5 sm:px-4 rounded-full bg-[#141419] hover:bg-[#1E1E26] border border-[#D4AF37]/35 hover:border-[#D4AF37] text-xs font-bold uppercase tracking-wider text-[#F5C542] transition-all cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5C542] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F5C542]"></span>
            </span>
            <Radar className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {language === 'en' ? 'Track Order' : 'Śledź'}
            </span>
          </button>

          {/* 3. Language Toggle (EN / PL) */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'pl' : 'en')}
            className="inline-flex items-center justify-center gap-1.5 h-10 px-3 rounded-full bg-[#141419] hover:bg-[#1E1E26] border border-white/10 hover:border-[#D4AF37]/40 text-xs font-bold uppercase text-[#C8C2B4] hover:text-[#F5F2EB] transition-all cursor-pointer"
            title="Switch Language (EN / PL)"
          >
            <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{language.toUpperCase()}</span>
          </button>

          {/* 4. Login / Customer Account Profile Button */}
          <button
            onClick={() => setProfileModalOpen(true)}
            className="inline-flex items-center gap-2 h-10 px-3.5 sm:px-4 rounded-full bg-[#141419] hover:bg-[#1E1E26] border border-white/15 hover:border-[#D4AF37] text-xs font-bold text-[#F5F2EB] transition-all cursor-pointer"
            title={
              isLoggedIn
                ? 'View Profile, Order History, Phone & Saved Addresses'
                : 'Login to Account'
            }
          >
            {isLoggedIn ? (
              <>
                <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden md:inline max-w-[96px] truncate">
                  {userProfile.name.split(' ')[0]}
                </span>
              </>
            ) : (
              <>
                <LogIn className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden md:inline">
                  {language === 'en' ? 'Login' : 'Zaloguj'}
                </span>
              </>
            )}
          </button>

          {/* 5. Royal Gold Order Bag Button */}
          <button
            onClick={() => setCartOpen(true)}
            className="lux-btn-gold h-10 px-4 sm:px-5 inline-flex items-center gap-2 text-xs uppercase tracking-wider cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {language === 'en' ? 'Order' : 'Koszyk'}
            </span>
            <span className="bg-[#09090B] text-[#F5C542] px-2 py-0.5 rounded-full text-[11px] font-extrabold">
              {totalItems}
            </span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 rounded-full bg-[#141419] border border-white/15 text-[#F5F2EB] flex items-center justify-center cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0E0E12] border-b border-[#D4AF37]/30 px-4 py-4 space-y-2 overflow-hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center justify-between ${
                  activePage === link.id
                    ? 'bg-[#D4AF37] text-[#09090B]'
                    : 'text-[#F5F2EB] hover:bg-white/5'
                }`}
              >
                <span>{language === 'en' ? link.labelEn : link.labelPl}</span>
              </button>
            ))}

            <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2">
              <a
                href="tel:+48691234567"
                className="lux-btn-outline py-2.5 px-3 text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>+48 691 234 567</span>
              </a>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setProfileModalOpen(true);
                }}
                className="lux-btn-outline py-2.5 px-3 text-xs flex items-center justify-center gap-2"
              >
                <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>
                  {isLoggedIn
                    ? language === 'en'
                      ? 'My Account & Orders'
                      : 'Moje Konto'
                    : language === 'en'
                    ? 'Login'
                    : 'Zaloguj'}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
