import React from 'react';
import { motion } from 'framer-motion';
import { Flame, ShieldCheck, Sparkles, Compass, Award, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';

export const StoryPage: React.FC = () => {
  const { language, setActivePage } = useStore();

  return (
    <div className="bg-[#09090B] pt-12 pb-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 xl:px-14">
        {/* Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="lux-badge-gold mb-5">
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
            {language === 'en' ? 'FROM THE HIMALAYAS TO WAWEL CASTLE' : 'OD HIMALAJÓW DO ZAMKU WAWELSKIEGO'}
          </span>
          <h1 className="font-display text-5xl sm:text-7xl tracking-wide text-[#F5F2EB] leading-[1.02] mb-6">
            {language === 'en' ? 'Born in the Doon Valley.' : 'Zrodzeni w Dolinie Doon.'}
            <br />
            <span className="gold-gradient-text italic font-normal">
              {language === 'en' ? 'Perfected in Kraków.' : 'Wydoskonaleni w Krakowie.'}
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-[#A1A1AA] font-medium leading-relaxed">
            {language === 'en'
              ? 'Doon Valley Restaurant & Bar brings the royal culinary heritage of Dehradun and North India to historic ul. Zwierzyniecka in Kraków — with clay-oven Tandoor mastery, slow-simmered copper-pot gravies, and 100% Halal craftsmanship.'
              : 'Restauracja i Bar Doon Valley przenosi królewskie dziedzictwo kulinarne Dehradunu i północnych Indii na historyczną ul. Zwierzyniecką w Krakowie — z mistrzostwem glinianego pieca Tandoor, wolno gotowanymi sosami i 100% certyfikatem Halal.'}
          </p>
        </div>

        {/* Dual Image Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#D4AF37]/25 shadow-2xl h-[440px] relative"
          >
            <img
              src="/images/brand/exterior-night.jpg"
              alt="Doon Valley Night Facade"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/95 via-[#09090B]/30 to-transparent flex flex-col justify-end p-8">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37] mb-1">
                UL. ZWIERZYNIECKA • KRAKÓW
              </span>
              <h3 className="font-display text-3xl text-[#F5F2EB] tracking-wide">
                {language === 'en'
                  ? 'An Evening Sanctuary by the Vistula'
                  : 'Wieczorna Przystań nad Wisłą'}
              </h3>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-5 rounded-3xl overflow-hidden border border-[#D4AF37]/25 shadow-2xl h-[440px] relative"
          >
            <img
              src="/images/brand/entrance-warm.jpg"
              alt="Doon Valley Warm Interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/95 via-[#09090B]/30 to-transparent flex flex-col justify-end p-8">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37] mb-1">
                ROYAL HOSPITALITY
              </span>
              <h3 className="font-display text-3xl text-[#F5F2EB] tracking-wide">
                {language === 'en'
                  ? 'Golden Lights & Himalayan Warmth'
                  : 'Złote Światła i Himalajskie Ciepło'}
              </h3>
            </div>
          </motion.div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: <Flame className="w-6 h-6 text-[#D4AF37]" />,
              code: '01 / CLAY OVEN',
              titleEn: '480°C Charcoal Tandoor',
              titlePl: 'Piec Tandoor 480°C',
              descEn:
                'Every skewer of Chicken Tikka, Lamb Seekh, and Garlic Naan is baked live against glowing charcoal walls for an unmistakable smoky char.',
              descPl:
                'Każdy szaszłyk Chicken Tikka, Lamb Seekh i chlebek Garlic Naan wypiekamy na żywo na rozżarzonych ściankach pieca Tandoor.',
            },
            {
              icon: <Sparkles className="w-6 h-6 text-[#D4AF37]" />,
              code: '02 / WHOLE SPICES',
              titleEn: 'Hand-Roasted Masala',
              titlePl: 'Ręcznie Prażone Przyprawy',
              descEn:
                'Green cardamom, Kashmiri chillies, fenugreek leaves, and cloves are toasted and stone-ground in-house every morning.',
              descPl:
                'Zielony kardamon, papryczki kaszmirskie, kozieradka i goździki są codziennie rano prażone i mielone w naszej kuchni.',
            },
            {
              icon: <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />,
              code: '03 / HALAL & VEGAN',
              titleEn: '100% Certified Halal',
              titlePl: '100% Certyfikowane Halal',
              descEn:
                'All poultry and lamb are strictly Halal-certified, with dedicated preparation zones for vegetarian and vegan delicacies.',
              descPl:
                'Cały drób i jagnięcina posiadają certyfikat Halal, z osobnymi strefami przygotowania dań wegetariańskich i wegańskich.',
            },
          ].map((pillar) => (
            <div key={pillar.code} className="lux-card p-8">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-semibold tracking-[0.2em] text-[#D4AF37]">
                  {pillar.code}
                </span>
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
                  {pillar.icon}
                </div>
              </div>
              <h3 className="font-display text-2xl font-semibold text-[#F5F2EB] tracking-wide mb-3">
                {language === 'en' ? pillar.titleEn : pillar.titlePl}
              </h3>
              <p className="text-[#A1A1AA] text-sm leading-relaxed">
                {language === 'en' ? pillar.descEn : pillar.descPl}
              </p>
            </div>
          ))}
        </div>

        {/* Callout Banner */}
        <div className="rounded-3xl bg-[#111116] border border-[#D4AF37]/30 text-[#F5F2EB] p-10 sm:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="flex items-center gap-6">
            <img
              src="/images/brand/logo.jpg"
              alt="Doon Valley Crest"
              className="w-24 h-24 rounded-full object-cover border-2 border-[#D4AF37] shrink-0"
            />
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] mb-2">
                <Award className="w-4 h-4" />
                {language === 'en' ? 'TASTE THE ROYAL TRADITION' : 'SKOSZTUJ KRÓLEWSKIEJ TRADYCJI'}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl tracking-wide">
                {language === 'en'
                  ? 'Ready to Experience Doon Valley?'
                  : 'Gotowy na Ucztę w Doon Valley?'}
              </h2>
            </div>
          </div>
          <button
            onClick={() => {
              setActivePage('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="lux-btn-gold px-8 py-4 text-xs tracking-[0.18em] shrink-0"
          >
            {language === 'en' ? 'EXPLORE FULL MENU' : 'ZOBACZ PEŁNE MENU'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
