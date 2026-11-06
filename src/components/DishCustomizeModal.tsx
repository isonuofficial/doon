import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, Plus, Minus, ShoppingBag, Check } from 'lucide-react';
import { useStore, SpiceLevelId } from '../store/useStore';
import { SPICE_LEVELS, ADD_ONS } from '../data/menuData';

export const DishCustomizeModal: React.FC = () => {
  const { customizingDish, closeCustomizeModal, addToCart, language } = useStore();
  const [spiceLevel, setSpiceLevel] = useState<SpiceLevelId>('medium');
  const [servingStyle, setServingStyle] = useState<'Dry' | 'Sauce'>('Sauce');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (customizingDish) {
      setSpiceLevel('medium');
      setServingStyle('Sauce');
      setSelectedAddOns([]);
      setQuantity(1);
      setNotes('');
    }
  }, [customizingDish]);

  if (!customizingDish) return null;

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const chosenAddOnObjects = ADD_ONS.filter((a) => selectedAddOns.includes(a.id));
  const addOnsPrice = chosenAddOnObjects.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = customizingDish.price + addOnsPrice;
  const totalPrice = unitPrice * quantity;

  const handleConfirmAdd = () => {
    addToCart({
      dish: customizingDish,
      quantity,
      spiceLevel,
      servingStyle: customizingDish.hasDrySauceOption ? servingStyle : undefined,
      addOnIds: selectedAddOns,
      notes: notes.trim(),
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="relative w-full max-w-xl bg-[#111116] rounded-3xl border border-[#D4AF37]/30 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-[#F5F2EB]"
        >
          {/* Dish Header Image */}
          <div className="relative h-56 bg-[#09090B] shrink-0">
            <img
              src={customizingDish.image}
              alt={customizingDish.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-[#111116]/40 to-transparent" />
            <button
              onClick={closeCustomizeModal}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#09090B]/80 text-[#F5F2EB] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#09090B] transition-colors border border-white/15"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-[#09090B] text-[10px] font-bold uppercase tracking-widest mb-1.5">
                  {customizingDish.badgeLabel} • 100% HALAL
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-[#F5F2EB] tracking-wide leading-none">
                  {language === 'en' ? customizingDish.name : customizingDish.namePl}
                </h3>
              </div>
              <div className="lux-price-pill px-3.5 py-1 text-base shrink-0">
                {customizingDish.price.toFixed(2)} zł
              </div>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            <p className="text-sm text-[#C8C2B4] leading-relaxed">
              {language === 'en' ? customizingDish.description : customizingDish.descriptionPl}
            </p>

            {/* Spice Level */}
            {customizingDish.isSpiceCustomizable && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37] mb-2.5 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#D4AF37]" />
                  {language === 'en' ? '1. Select Spice Level' : '1. Wybierz Poziom Ostrości'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {SPICE_LEVELS.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSpiceLevel(s.id)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        spiceLevel === s.id
                          ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#F5F2EB] shadow-md'
                          : 'bg-[#16161D] border-white/10 text-[#C8C2B4] hover:border-[#D4AF37]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#F5F2EB]">
                          {language === 'en' ? s.label : s.labelPl}
                        </span>
                        <span className="text-xs">{'🌶️'.repeat(s.chilliCount)}</span>
                      </div>
                      <div className="text-[10px] opacity-75">
                        {language === 'en' ? s.desc : s.descPl}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pairings & Extras */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37] mb-2.5">
                {language === 'en'
                  ? '2. Add Royal Accompaniments (Optional)'
                  : '2. Dodatki do Dania (Opcjonalnie)'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ADD_ONS.map((addon) => {
                  const active = selectedAddOns.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddOn(addon.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                        active
                          ? 'bg-[#D4AF37]/15 text-[#F5F2EB] border-[#D4AF37]'
                          : 'bg-[#16161D] text-[#C8C2B4] border-white/10 hover:border-[#D4AF37]/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            active
                              ? 'bg-[#D4AF37] border-[#D4AF37] text-[#09090B]'
                              : 'border-white/25'
                          }`}
                        >
                          {active && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-semibold text-[#F5F2EB]">
                          {language === 'en' ? addon.name : addon.namePl}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#D4AF37]">
                        +{addon.price.toFixed(0)} zł
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Kitchen Notes */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#C8C2B4] mb-2">
                {language === 'en'
                  ? '3. Special Kitchen Instructions'
                  : '3. Uwagi dla Szefa Kuchni'}
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={
                  language === 'en'
                    ? 'e.g., No fresh coriander, extra lemon wedge...'
                    : 'np. Bez świeżej kolendry, dodatkowa cytryna...'
                }
                className="w-full px-4 py-3 rounded-xl bg-[#16161D] border border-white/10 text-sm text-[#F5F2EB] placeholder:text-[#C8C2B4]/50 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Sticky Bottom Bar */}
          <div className="p-5 bg-[#09090B] border-t border-white/10 flex items-center justify-between gap-4 shrink-0">
            <div className="flex items-center bg-[#16161D] rounded-full border border-white/15 p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#F5F2EB] hover:bg-white/10 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-9 text-center font-bold text-sm text-[#F5F2EB]">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#F5F2EB] hover:bg-white/10 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleConfirmAdd}
              className="flex-1 lux-btn-gold py-3.5 px-6 text-xs tracking-[0.15em]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{language === 'en' ? 'ADD TO ORDER' : 'DODAJ DO ZAMÓWIENIA'}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#09090B]/20 text-[#09090B] font-extrabold">
                {totalPrice.toFixed(2)} zł
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
