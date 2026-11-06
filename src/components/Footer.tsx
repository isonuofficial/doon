import React from 'react';
import {
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  CreditCard,
  Banknote,
  Radar,
  ExternalLink,
  User,
} from 'lucide-react';
import { useStore } from '../store/useStore';

export const Footer: React.FC = () => {
  const {
    language,
    setActivePage,
    setRadarOpen,
    setCartOpen,
    setProfileModalOpen,
  } = useStore();

  return (
    <footer className="bg-[#060608] text-[#F5F2EB] border-t border-[#D4AF37]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Emblem */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-full border-2 border-[#D4AF37] bg-[#09090B] overflow-hidden shrink-0">
                <img
                  src="./images/brand/logo.jpg"
                  alt="Doon Valley Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-royal text-2xl font-bold tracking-wider text-[#F5F2EB] leading-none">
                  DOON VALLEY
                </h3>
                <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mt-1">
                  Indian Restaurant & Bar • Halal • Kraków
                </p>
              </div>
            </div>

            <p className="text-sm text-[#C8C2B4] max-w-md leading-relaxed">
              {language === 'en'
                ? 'Big royal flavor. No boring bites. Authentic North & South Indian cuisine, clay tandoor breads, and Indo-Chinese wok fusion crafted fresh daily near Wawel Castle.'
                : 'Autentyczny królewski smak Indii w sercu Krakowa. Świeżo pieczone chlebki naan z glinianego pieca tandoor, bezglutenowe dania curry i aromatyczne biryani.'}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 bg-[#141419] text-[#F5F2EB] border border-[#D4AF37]/30 px-3 py-1 rounded-full text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F5C542]" />
                100% Certified Halal
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#141419] text-[#F5C542] border border-white/10 px-3 py-1 rounded-full text-xs font-semibold">
                <CreditCard className="w-3.5 h-3.5" />
                BLIK Instant Pay
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#141419] text-[#C8C2B4] border border-white/10 px-3 py-1 rounded-full text-xs font-semibold">
                <Banknote className="w-3.5 h-3.5 text-[#D4AF37]" />
                Cash on Delivery (COD)
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              {language === 'en' ? 'Explore' : 'Nawigacja'}
            </h4>
            <ul className="space-y-2.5 text-sm text-[#C8C2B4]">
              <li>
                <button
                  onClick={() => setActivePage('home')}
                  className="hover:text-[#F5C542] transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Home' : 'Strona Główna'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('menu')}
                  className="hover:text-[#F5C542] transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Full Menu' : 'Pełne Menu'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('story')}
                  className="hover:text-[#F5C542] transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Our Story & Halal' : 'O Nas & Halal'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('contact')}
                  className="hover:text-[#F5C542] transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Location & Contact' : 'Lokalizacja & Kontakt'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setProfileModalOpen(true)}
                  className="hover:text-[#F5C542] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>
                    {language === 'en'
                      ? 'My Account & Order History'
                      : 'Moje Konto i Zamówienia'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setRadarOpen(true)}
                  className="text-[#F5C542] hover:underline flex items-center gap-1.5 cursor-pointer font-semibold"
                >
                  <Radar className="w-3.5 h-3.5" />
                  <span>
                    {language === 'en' ? 'Live Order Radar' : 'Radar Zamówienia'}
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Kraków Coordinates & Hours */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              {language === 'en'
                ? 'Kraków Restaurant & Delivery'
                : 'Restauracja i Dostawa w Krakowie'}
            </h4>
            <div className="space-y-2.5 text-sm text-[#C8C2B4]">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                <span>
                  <strong className="text-[#F5F2EB]">
                    ul. Zwierzyniecka, 31-103 Kraków
                  </strong>
                  <br />
                  Near Wawel Castle • 50.0579° N, 19.9311° E
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Monday – Sunday: 11:30 – 22:30</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a
                  href="tel:+48691234567"
                  className="font-bold text-base text-[#F5C542] hover:underline"
                >
                  +48 691 234 567
                </a>
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-2.5">
              <button
                onClick={() => setCartOpen(true)}
                className="lux-btn-gold px-5 py-2.5 text-xs uppercase tracking-wider cursor-pointer"
              >
                {language === 'en' ? 'Order Online' : 'Zamów Online'}
              </button>
              <a
                href="https://www.google.com/maps/search/?api=1&query=50.0579,19.9311"
                target="_blank"
                rel="noopener noreferrer"
                className="lux-btn-outline px-4 py-2.5 text-xs uppercase tracking-wider inline-flex items-center gap-1.5"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#C8C2B4]/70">
          <p>© 2026 Doon Valley — Indian Restaurant & Bar • Halal. All rights reserved.</p>
          <p className="uppercase tracking-widest text-[#D4AF37]">
            ul. Zwierzyniecka • Kraków, Poland
          </p>
        </div>
      </div>
    </footer>
  );
};
