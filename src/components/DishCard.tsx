import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Flame, ShieldCheck } from 'lucide-react';
import { MenuItem } from '../data/menuData';
import { useStore } from '../store/useStore';

interface DishCardProps {
  dish: MenuItem;
  index?: number;
}

export const DishCard: React.FC<DishCardProps> = ({ dish, index = 0 }) => {
  const { language, openCustomizeModal, addToCart } = useStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (dish.isSpiceCustomizable || dish.hasDrySauceOption) {
      openCustomizeModal(dish);
    } else {
      addToCart({
        dish,
        quantity: 1,
        spiceLevel: 'medium',
        addOnIds: [],
        notes: '',
      });
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: Math.min((index % 8) * 0.04, 0.24) }}
      onClick={() => openCustomizeModal(dish)}
      className="lux-card flex flex-col justify-between overflow-hidden cursor-pointer group"
    >
      <div>
        {/* Dish Image with Minimal Gold Trim & Price Pill */}
        <div className="relative h-52 w-full overflow-hidden bg-[#09090B] border-b border-white/10">
          <img
            src={dish.image}
            alt={language === 'en' ? dish.name : dish.namePl}
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80';
            }}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-80" />

          {/* Top-Left Badge */}
          <span className="absolute top-3 left-3 bg-[#09090B]/85 backdrop-blur-md text-[#F5C542] border border-[#D4AF37]/40 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
            {dish.badgeLabel}
          </span>

          {/* Bottom-Right Price Badge (Grillvora Placement in Black & Gold) */}
          <div className="lux-price-pill absolute bottom-3 right-3 px-3.5 py-1 text-sm">
            {dish.price.toFixed(2)} zł
          </div>

          {/* Bottom-Left Dietary Pills */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
            {dish.tags.includes('Halal') && (
              <span className="bg-[#09090B]/85 text-[#F5F2EB] border border-white/15 px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#F5C542]" />
                Halal
              </span>
            )}
            {dish.tags.includes('Gluten-Free') && (
              <span className="bg-[#09090B]/85 text-[#C8C2B4] border border-white/15 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                GF
              </span>
            )}
          </div>
        </div>

        {/* Dish Copy */}
        <div className="p-5 pb-3">
          <h3 className="font-display text-lg sm:text-xl font-bold text-[#F5F2EB] group-hover:text-[#F5C542] transition-colors leading-snug">
            {language === 'en' ? dish.name : dish.namePl}
          </h3>
          <p className="text-xs text-[#D4AF37]/80 font-medium mt-0.5">
            {language === 'en' ? dish.namePl : dish.name}
          </p>
          <p className="text-xs sm:text-sm text-[#C8C2B4] mt-2.5 line-clamp-2 leading-relaxed">
            {language === 'en' ? dish.description : dish.descriptionPl}
          </p>
        </div>
      </div>

      {/* Footer Action */}
      <div className="px-5 pb-5 pt-3 flex items-center justify-between gap-2 border-t border-white/5 mt-2">
        <span className="text-xs font-medium text-[#C8C2B4] flex items-center gap-1">
          {dish.isSpiceCustomizable ? (
            <>
              <Flame className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{language === 'en' ? 'Custom Spice' : 'Wybór Ostrości'}</span>
            </>
          ) : (
            <span>{language === 'en' ? 'Chef Recipe' : 'Klasyczne'}</span>
          )}
        </span>

        <button
          onClick={handleQuickAdd}
          className="lux-btn-gold px-4 py-2 text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>{language === 'en' ? 'Order' : 'Dodaj'}</span>
        </button>
      </div>
    </motion.article>
  );
};
