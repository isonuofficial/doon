import React from 'react';
import { motion } from 'framer-motion';
import {
  Flame,
  ShieldCheck,
  Clock,
  MapPin,
  Radar,
  ArrowRight,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import { useStore } from '../store/useStore';

export const HeroSection: React.FC = () => {
  const {
    language,
    setActivePage,
    setRadarOpen,
    setProfileModalOpen,
    isLoggedIn,
    userProfile,
  } = useStore();

  return (
    <section className="relative bg-[#09090B] pt-28 sm:pt-36 pb-0 overflow-hidden border-b border-[#D4AF37]/25">
      {/* Subtle Ambient Gold Radial Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_25%_25%,rgba(212,175,55,0.14)_0%,transparent_58%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-end">
          {/* Left Column: Minimal Luxury Hero Copy & Actions */}
          <div className="lg:col-span-7 pb-12 lg:pb-20 z-10">
            {/* Eyebrow Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 mb-6 px-4 py-1.5 rounded-full lux-badge-gold"
            >
              <span className="w-2 h-2 rounded-full bg-[#F5C542] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.18em]">
                {language === 'en'
                  ? 'THE HOME OF ROYAL TANDOOR • KRAKÓW'
                  : 'KRÓLEWSKA KUCHNIA INDYJSKA • KRAKÓW'}
              </span>
            </motion.div>

            {/* Luxury Serif Headline (Grillvora Pacing in Black & Gold) */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="font-display text-4xl sm:text-6xl xl:text-[66px] font-bold leading-[1.04] tracking-tight text-[#F5F2EB] mb-6"
            >
              {language === 'en' ? (
                <>
                  HOT CLAY TANDOOR.{' '}
                  <span className="gold-gradient-text italic block sm:inline">
                    ROYAL INDIAN FLAVOR.
                  </span>
                </>
              ) : (
                <>
                  GORĄCY PIEC TANDOOR.{' '}
                  <span className="gold-gradient-text italic block sm:inline">
                    KRÓLEWSKI SMAK INDII.
                  </span>
                </>
              )}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-[#C8C2B4] text-base sm:text-lg max-w-xl mb-8 leading-relaxed"
            >
              {language === 'en'
                ? 'Charred clay-oven garlic naans, 100% gluten-free slow-simmered curries, and fragrant saffron biryani in the heart of Kraków. Pay seamlessly via BLIK or Cash on Delivery.'
                : 'Świeżo wypiekane chlebki naan z glinianego pieca tandoor, bezglutenowe kremowe dania curry oraz aromatyczne biryani z szafranem. Płać wygodnie kodem BLIK lub gotówką przy odbiorze.'}
            </motion.p>

            {/* Minimal Trust Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22 }}
              className="flex flex-wrap items-center gap-3 mb-9"
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14141A] border border-[#D4AF37]/30 text-xs font-semibold text-[#F5F2EB]">
                <ShieldCheck className="w-4 h-4 text-[#F5C542]" />
                {language === 'en'
                  ? '100% Certified Halal'
                  : '100% Certyfikowane Halal'}
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14141A] border border-white/10 text-xs font-semibold text-[#C8C2B4]">
                <Flame className="w-4 h-4 text-[#D4AF37]" />
                {language === 'en' ? '480°C Clay Tandoor' : 'Tradycyjny Piec Tandoor'}
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14141A] border border-white/10 text-xs font-semibold text-[#C8C2B4]">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                {language === 'en'
                  ? '35–45 min Kraków Delivery'
                  : 'Dostawa 35–45 min w Krakowie'}
              </span>
            </motion.div>

            {/* Primary & Secondary CTAs (Grillvora Hero Buttons) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <button
                onClick={() => setActivePage('menu')}
                className="lux-btn-gold px-8 py-4 text-sm sm:text-base uppercase tracking-wider flex items-center gap-2.5 cursor-pointer"
              >
                <span>
                  {language === 'en' ? 'Explore the Menu' : 'Odkryj Pełne Menu'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setRadarOpen(true)}
                className="lux-btn-outline px-6 py-4 text-sm sm:text-base uppercase tracking-wider flex items-center gap-2 cursor-pointer"
              >
                <Radar className="w-4 h-4 text-[#F5C542]" />
                <span>
                  {language === 'en' ? 'Track Live Order' : 'Śledź Zamówienie'}
                </span>
              </button>
            </motion.div>

            {/* Minimal Location & Member Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#C8C2B4]"
            >
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>
                  <strong className="text-[#F5F2EB]">ul. Zwierzyniecka, Kraków</strong>{' '}
                  (Near Wawel Castle) • Open 11:30 – 22:30
                </span>
              </div>

              <button
                onClick={() => setProfileModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-[#F5C542] hover:underline font-semibold cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>
                  {isLoggedIn
                    ? language === 'en'
                      ? `Logged in as ${userProfile.name} • View Order History →`
                      : `Zalogowano: ${userProfile.name} • Historia Zamówień →`
                    : language === 'en'
                    ? 'Sign in for Order History & Saved Addresses →'
                    : 'Zaloguj się do Historii Zamówień →'}
                </span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Grillvora Arch Visual in Obsidian & Gold */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-end">
            {/* Rotating Gold Badge Sticker (Grillvora Hero Sticker) */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: -10 }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.3 }}
              onClick={() => setActivePage('menu')}
              className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#F5C542] via-[#D4AF37] to-[#9A7418] text-[#09090B] border-2 border-[#FFF3C4] shadow-[0_15px_35px_rgba(0,0,0,0.85)] absolute top-4 left-2 sm:-left-6 z-20 flex flex-col items-center justify-center text-center p-3 cursor-pointer select-none"
            >
              <Sparkles className="w-4 h-4 text-[#09090B] mb-1" />
              <span className="font-royal text-[10px] font-extrabold uppercase tracking-widest">
                FRESH OFF THE
              </span>
              <span className="font-display text-base sm:text-lg font-extrabold italic leading-tight">
                Clay Tandoor
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider mt-0.5 bg-[#09090B] text-[#F5C542] px-2 py-0.5 rounded-full">
                100% HALAL
              </span>
            </motion.div>

            {/* Arch-Topped Hero Image Container */}
            <motion.div
              initial={{ opacity: 0, y: 90, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lux-hero-arch w-full max-w-[470px] h-[400px] sm:h-[510px] bg-[#111115] overflow-hidden relative group"
            >
              <img
                src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=85"
                alt="Doon Valley Royal Tandoor Feast"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/25 to-transparent" />

              {/* Bottom Glass Card inside Arch */}
              <div className="absolute bottom-5 left-5 right-5 bg-[#09090B]/90 backdrop-blur-md border border-[#D4AF37]/40 rounded-2xl p-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src="./images/brand/logo.jpg"
                    alt="Doon Valley Logo"
                    className="w-11 h-11 rounded-full object-cover border border-[#D4AF37] shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] block">
                      {language === 'en' ? 'Signature Dish' : 'Specjał Szefa'}
                    </span>
                    <p className="font-display text-sm sm:text-base font-bold text-[#F5F2EB]">
                      Murgh Makhani & Garlic Naan
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActivePage('menu')}
                  className="lux-btn-gold px-3.5 py-1.5 text-xs uppercase shrink-0 cursor-pointer"
                >
                  45 zł
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
