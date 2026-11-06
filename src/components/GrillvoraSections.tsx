import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  CheckCircle2,
  MapPin,
} from 'lucide-react';
import { MENU_ITEMS } from '../data/menuData';
import { useStore } from '../store/useStore';
import { DishCard } from './DishCard';

export const FindYourFixSection: React.FC = () => {
  const { language, setSelectedCategory, setActivePage } = useStore();

  const showcaseCategories = [
    {
      id: 'tandoori-starters',
      titleEn: 'TANDOORI & CLAY GRILL',
      titlePl: 'PIEC TANDOOR & GRILL',
      descEn: 'Charred edges, juicy centers, and 24-hour yogurt & spice marination.',
      descPl: 'Soczyste kawałki marynowane w jogurcie i przyprawach z glinianego pieca.',
      image:
        'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'chicken-curries',
      titleEn: 'ROYAL CURRIES (GF)',
      titlePl: 'KRÓLEWSKIE DANIA CURRY',
      descEn: 'Velvety Butter Chicken, Tikka Masala & Lamb Rogan Josh — 100% gluten-free.',
      descPl: 'Aksamitny Butter Chicken, Tikka Masala i baranina — 100% bez glutenu.',
      image:
        'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'biryani-rice',
      titleEn: 'SAFFRON DUM BIRYANI',
      titlePl: 'AROMATYCZNE BIRYANI',
      descEn: 'Aged basmati rice slow-steamed with saffron, fresh mint, and whole spices.',
      descPl: 'Długoziarnisty ryż basmati zapiekany z szafranem, miętą i przyprawami.',
      image:
        'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'tandoori-breads',
      titleEn: 'NAAN BREADS & LASSI',
      titlePl: 'CHLEBKI NAAN & LASSI',
      descEn: 'Pillowy garlic & cheese naans paired with chilled Alphonso Mango Lassi.',
      descPl: 'Puszyste chlebki naan z czosnkiem i serem oraz schłodzone Mango Lassi.',
      image:
        'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const handleOpenCategory = (catId: string) => {
    setSelectedCategory(catId);
    setActivePage('menu');
  };

  return (
    <section className="bg-[#09090B] py-24 px-4 sm:px-8 border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Minimal Grillvora Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] block mb-2">
              {language === 'en' ? 'FIND YOUR FIX' : 'ODKRYJ SWÓJ SMAK'}
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#F5F2EB] leading-tight">
              {language === 'en' ? (
                <>
                  GOOD MOOD.{' '}
                  <span className="gold-gradient-text italic">GREAT FOOD.</span>
                </>
              ) : (
                <>
                  DOBRY NASTRÓJ.{' '}
                  <span className="gold-gradient-text italic">KRÓLEWSKA KUCHNIA.</span>
                </>
              )}
            </h2>
          </div>

          <button
            onClick={() => handleOpenCategory('all')}
            className="lux-btn-outline px-6 py-3.5 text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 self-start md:self-end cursor-pointer"
          >
            <span>
              {language === 'en' ? 'See the Full Menu' : 'Zobacz Pełne Menu'}
            </span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </div>

        {/* 4 Category Cards (Exact Grillvora 4-Card Structure) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {showcaseCategories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              onClick={() => handleOpenCategory(cat.id)}
              className="lux-card overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-[#09090B] border-b border-white/10">
                  <img
                    src={cat.image}
                    alt={cat.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-75" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-[#F5F2EB] group-hover:text-[#F5C542] transition-colors">
                    {language === 'en' ? cat.titleEn : cat.titlePl}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C8C2B4] mt-2 leading-relaxed">
                    {language === 'en' ? cat.descEn : cat.descPl}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                <span>{language === 'en' ? 'View Dishes' : 'Zobacz Dania'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const BrandPromiseSection: React.FC = () => {
  const { language, setActivePage } = useStore();

  return (
    <section className="bg-[#111115] py-24 px-4 sm:px-8 border-b border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Visual Frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 relative"
        >
          <div className="rounded-3xl border border-[#D4AF37]/35 overflow-hidden h-[380px] sm:h-[450px] bg-[#09090B] relative shadow-2xl">
            <img
              src="./images/brand/exterior-night.jpg"
              alt="Doon Valley Kraków Exterior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-5 left-5 right-5 bg-[#09090B]/90 backdrop-blur-md border border-[#D4AF37]/35 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="./images/brand/logo.jpg"
                  alt="Doon Valley Logo"
                  className="w-11 h-11 rounded-full border border-[#D4AF37] object-cover"
                />
                <div>
                  <p className="font-display text-sm font-bold text-[#F5F2EB]">
                    Doon Valley • ul. Zwierzyniecka
                  </p>
                  <p className="text-xs text-[#D4AF37]">
                    Old Town Kraków • Near Wawel Castle
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase">
                Open
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Copy Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-6 space-y-6"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] block">
            {language === 'en' ? 'THE DOON VALLEY PROMISE' : 'OBIETNICA DOON VALLEY'}
          </span>

          <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight text-[#F5F2EB]">
            {language === 'en' ? (
              <>
                NO SHORTCUTS.{' '}
                <span className="gold-gradient-text italic">
                  JUST SERIOUS TANDOOR.
                </span>
              </>
            ) : (
              <>
                BEZ KOMPROMISÓW.{' '}
                <span className="gold-gradient-text italic">
                  PRAWDZIWY PIEC TANDOOR.
                </span>
              </>
            )}
          </h2>

          <p className="text-base text-[#C8C2B4] leading-relaxed">
            {language === 'en'
              ? 'Inspired by the royal kitchens of Dehradun (Doon Valley), our Kraków restaurant crafts every dish from scratch. Hand-stretched naans baked against glowing clay walls, freshly ground whole spices, and 100% Certified Halal meats.'
              : 'Zainspirowana królewską kuchnią doliny Dehradun (Doon Valley), nasza krakowska restauracja tworzy każde danie od podstaw — świeżo wypiekane chlebki naan z glinianego pieca, ręcznie mielone przyprawy i 100% certyfikowane mięso Halal.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="bg-[#16161C] border border-white/10 rounded-2xl p-4 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#F5C542] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-[#F5F2EB]">
                  {language === 'en'
                    ? '100% Halal & Gluten-Free Curries'
                    : '100% Halal & Bezglutenowe Curry'}
                </h3>
                <p className="text-xs text-[#C8C2B4] mt-1">
                  {language === 'en'
                    ? 'All curries and biryanis are naturally gluten-free.'
                    : 'Wszystkie nasze dania curry i biryani są bezglutenowe.'}
                </p>
              </div>
            </div>

            <div className="bg-[#16161C] border border-white/10 rounded-2xl p-4 flex items-start gap-3">
              <Award className="w-5 h-5 text-[#F5C542] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-[#F5F2EB]">
                  {language === 'en'
                    ? 'BLIK & Cash on Delivery'
                    : 'BLIK i Płatność przy Odbiorze'}
                </h3>
                <p className="text-xs text-[#C8C2B4] mt-1">
                  {language === 'en'
                    ? 'Seamless checkout & live 5-stage Kraków GPS tracking.'
                    : 'Szybka płatność i śledzenie kuriera na żywo.'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setActivePage('story')}
              className="lux-btn-gold px-7 py-3.5 text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <span>
                {language === 'en' ? 'Read Our Story' : 'Poznaj Naszą Historię'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActivePage('contact')}
              className="lux-btn-outline px-6 py-3.5 text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <span>{language === 'en' ? 'Find Us' : 'Lokalizacja'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const CrowdFavoritesSection: React.FC = () => {
  const { language, setActivePage } = useStore();

  // Only 4 curated Crowd Favorites on the Home page (just like Grillvora!)
  const bestsellers = MENU_ITEMS.filter((item) =>
    [50, 3, 76, 86].includes(item.id)
  );

  return (
    <section className="bg-[#09090B] py-24 px-4 sm:px-8 border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] block mb-2">
              {language === 'en' ? 'CROWD FAVORITES' : 'ULUBIONE DANIA GOŚCI'}
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#F5F2EB] leading-tight">
              {language === 'en' ? (
                <>
                  THE ONES YOU{' '}
                  <span className="gold-gradient-text italic">COME BACK FOR.</span>
                </>
              ) : (
                <>
                  KLASYKI, PO KTÓRE{' '}
                  <span className="gold-gradient-text italic">ZAWSZE WRACASZ.</span>
                </>
              )}
            </h2>
            <p className="text-[#C8C2B4] text-sm sm:text-base mt-3 max-w-xl">
              {language === 'en'
                ? 'Meet the Doon Valley signature classics. Crafted for bold appetites and authentic Indian spice lovers.'
                : 'Poznaj cztery najczęściej zamawiane specjały Doon Valley w Krakowie.'}
            </p>
          </div>

          <button
            onClick={() => setActivePage('menu')}
            className="lux-btn-gold px-7 py-3.5 text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 self-start md:self-end cursor-pointer"
          >
            <span>
              {language === 'en' ? 'Meet the Full Lineup' : 'Zobacz Wszystkie Dania'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((dish, idx) => (
            <DishCard key={dish.id} dish={dish} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const LifestyleBentoSection: React.FC = () => {
  const { language } = useStore();

  return (
    <section className="bg-[#111115] py-24 px-4 sm:px-8 border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] block mb-2">
            {language === 'en' ? 'THE DOON VALLEY WAY' : 'ATMOSFERA DOON VALLEY'}
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#F5F2EB] leading-tight">
            {language === 'en' ? (
              <>
                GOOD FOOD. ROYAL FLAVOR.{' '}
                <span className="gold-gradient-text italic">BETTER COMPANY.</span>
              </>
            ) : (
              <>
                DOBRE JEDZENIE.{' '}
                <span className="gold-gradient-text italic">LEPSZE TOWARZYSTWO.</span>
              </>
            )}
          </h2>
          <p className="text-[#C8C2B4] text-sm sm:text-base mt-3">
            {language === 'en'
              ? 'Quick lunch, late-night craving, or a table full of friends at ul. Zwierzyniecka — there’s always room for one more at Doon Valley.'
              : 'Szybki lunch, wieczorna dostawa do domu lub kolacja z przyjaciółmi przy ul. Zwierzynieckiej w Krakowie.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-5 h-auto md:h-[520px]">
          <div className="md:col-span-2 md:row-span-2 rounded-3xl border border-[#D4AF37]/30 overflow-hidden relative group min-h-[280px]">
            <img
              src="./images/brand/exterior-night.jpg"
              alt="Doon Valley Kraków Storefront"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-85" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#F5C542]">
                ul. Zwierzyniecka • Kraków
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F5F2EB] mt-1">
                {language === 'en'
                  ? 'Evening Ambiance in Old Town Kraków'
                  : 'Klimatyczny Wieczór w Centrum Krakowa'}
              </h3>
            </div>
          </div>

          <div className="md:col-span-1 md:row-span-2 rounded-3xl border border-white/10 overflow-hidden relative group min-h-[260px]">
            <img
              src="./images/brand/entrance-warm.jpg"
              alt="Doon Valley Warm Entrance"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-85" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                Dining & Bar
              </span>
              <p className="font-display text-base font-bold text-[#F5F2EB] mt-0.5">
                {language === 'en' ? 'Warm Indian Hospitality' : 'Ciepła Gościnność'}
              </p>
            </div>
          </div>

          <div className="md:col-span-1 md:row-span-1 rounded-3xl border border-white/10 overflow-hidden relative group min-h-[210px]">
            <img
              src="https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80"
              alt="Clay Tandoor Naan"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-85" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="font-display text-sm font-bold text-[#F5C542]">
                Fresh Clay-Oven Naan
              </p>
            </div>
          </div>

          <div className="md:col-span-1 md:row-span-1 rounded-3xl border border-[#D4AF37]/30 bg-[#09090B] p-5 flex flex-col items-center justify-center text-center min-h-[210px]">
            <img
              src="./images/brand/logo.jpg"
              alt="Doon Valley Emblem"
              className="w-24 h-24 rounded-full border border-[#D4AF37] object-cover mb-2.5"
            />
            <p className="font-royal text-xs font-bold uppercase tracking-widest text-[#F5C542]">
              DOON VALLEY
            </p>
            <p className="text-[11px] text-[#C8C2B4] mt-0.5">
              100% Certified Halal
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const NewsletterSection: React.FC = () => {
  const { language } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <section className="bg-[#09090B] py-20 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-br from-[#181820] to-[#0E0E13] border border-[#D4AF37]/40 p-8 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
          <div className="lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] block mb-2">
              {language === 'en' ? 'STRAIGHT TO YOUR INBOX' : 'KLUB DOON VALLEY'}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F5F2EB]">
              {language === 'en' ? (
                <>
                  GET THE <span className="gold-gradient-text italic">GOOD STUFF.</span>
                </>
              ) : (
                <>
                  ODBIERZ{' '}
                  <span className="gold-gradient-text italic">KRÓLEWSKIE OFERTY.</span>
                </>
              )}
            </h2>
            <p className="text-[#C8C2B4] text-sm sm:text-base mt-2.5">
              {language === 'en'
                ? 'New menu drops, special deals, and the occasional excuse to grab another biryani. Straight to your inbox.'
                : 'Nowości w menu, oferty specjalne oraz darmowa dostawa w Krakowie od 100 zł.'}
            </p>
          </div>

          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="bg-[#09090B] border border-[#D4AF37] rounded-2xl p-4 text-center">
                <CheckCircle2 className="w-8 h-8 text-[#F5C542] mx-auto mb-1.5" />
                <p className="font-display text-base font-bold text-[#F5F2EB]">
                  {language === 'en' ? 'You are on the list!' : 'Dziękujemy za zapis!'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    language === 'en' ? 'Enter your email...' : 'Twój adres e-mail...'
                  }
                  className="flex-1 bg-[#09090B] border border-white/15 focus:border-[#D4AF37] rounded-full px-5 py-3.5 text-sm text-[#F5F2EB] placeholder:text-[#C8C2B4]/50 focus:outline-none"
                />
                <button
                  type="submit"
                  className="lux-btn-gold px-7 py-3.5 text-xs uppercase tracking-wider shrink-0 cursor-pointer"
                >
                  {language === 'en' ? 'Count Me In' : 'Zapisz Mnie'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
