import React from 'react';
import { Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';

export const MarqueeTicker: React.FC = () => {
  const { language } = useStore();

  const itemsEn = [
    'FRESH OFF THE CLAY TANDOOR',
    'SEARED TO PERFECTION',
    '100% CERTIFIED HALAL MEAT',
    'STACKED WITH ROYAL FLAVOR',
    'ALL CURRIES 100% GLUTEN-FREE',
    'PAY VIA BLIK OR CASH ON DELIVERY',
    'MADE TO BE CRAVED IN KRAKÓW',
  ];

  const itemsPl = [
    'PROSTO Z GLINIANEGO PIECA TANDOOR',
    '100% CERTYFIKOWANE MIĘSO HALAL',
    'WSZYSTKIE DANIA CURRY BEZGLUTENOWE',
    'PŁATNOŚĆ BLIK LUB GOTÓWKĄ PRZY ODBIORZE',
    'DOSTAWA 35–45 MIN W KRAKOWIE',
    'KRÓLEWSKIE BIRYANI Z SZAFRANEM',
    'UL. ZWIERZYNIECKA • BLISKO WAWELU',
  ];

  const list = language === 'en' ? itemsEn : itemsPl;
  const repeated = [...list, ...list, ...list];

  return (
    <section
      aria-label="Highlights Ticker"
      className="bg-gradient-to-r from-[#D4AF37] via-[#F5C542] to-[#D4AF37] border-y border-[#FFF3C4]/40 py-3.5 overflow-hidden select-none relative z-20"
    >
      <div className="animate-gv-marquee flex items-center gap-10">
        {repeated.map((text, idx) => (
          <div key={idx} className="flex items-center gap-10 shrink-0">
            <span className="font-royal text-sm sm:text-base font-extrabold uppercase tracking-[0.14em] text-[#09090B]">
              {text}
            </span>
            <Sparkles className="w-4 h-4 text-[#09090B] shrink-0" />
          </div>
        ))}
      </div>
    </section>
  );
};
