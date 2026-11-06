import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Bike, Store } from 'lucide-react';
import { useStore, FulfillmentMode } from '../store/useStore';
import { ADD_ONS } from '../data/menuData';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setCartOpen,
    updateCartQuantity,
    removeFromCart,
    fulfillmentMode,
    setFulfillmentMode,
    setCheckoutOpen,
    language,
  } = useStore();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const freeDeliveryThreshold = 100;
  const deliveryFee = fulfillmentMode === 'pickup' ? 0 : subtotal >= freeDeliveryThreshold ? 0 : 12;
  const total = subtotal + deliveryFee;
  const amountToFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          className="w-full max-w-md bg-[#111116] h-full flex flex-col shadow-2xl border-l border-[#D4AF37]/30 text-[#F5F2EB]"
        >
          {/* Header */}
          <div className="p-5 bg-[#09090B] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold tracking-wide text-[#F5F2EB]">
                  {language === 'en' ? 'Your Royal Order Bag' : 'Twój Koszyk Doon Valley'}
                </h3>
                <p className="text-[11px] text-[#C8C2B4]">
                  ul. Zwierzyniecka • Kraków
                </p>
              </div>
            </div>
            <button
              onClick={() => setCartOpen(false)}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Fulfillment Mode Switcher */}
          <div className="p-3 bg-[#09090B]/60 border-b border-white/10">
            <div className="grid grid-cols-2 gap-1.5 bg-[#16161D] p-1 rounded-2xl border border-white/10">
              {(
                [
                  { id: 'delivery', labelEn: 'Hot Delivery (35m)', labelPl: 'Dostawa (35 min)', icon: Bike },
                  { id: 'pickup', labelEn: 'Self Pickup (20m)', labelPl: 'Odbiór Osobisty', icon: Store },
                ] as { id: FulfillmentMode; labelEn: string; labelPl: string; icon: React.FC<{ className?: string }> }[]
              ).map((m) => {
                const Icon = m.icon;
                const active = fulfillmentMode === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setFulfillmentMode(m.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      active
                        ? 'bg-[#D4AF37] text-[#09090B] shadow-sm font-bold'
                        : 'text-[#C8C2B4] hover:text-[#F5F2EB]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {language === 'en' ? m.labelEn : m.labelPl}
                  </button>
                );
              })}
            </div>

            {/* Free Delivery Progress */}
            {fulfillmentMode === 'delivery' && subtotal > 0 && (
              <div className="mt-2.5 px-2">
                <div className="flex justify-between text-[11px] font-semibold text-[#C8C2B4] mb-1">
                  {amountToFreeDelivery > 0 ? (
                    <span>
                      {language === 'en'
                        ? `Add ${amountToFreeDelivery.toFixed(0)} zł more for FREE Kraków Delivery!`
                        : `Dodaj za ${amountToFreeDelivery.toFixed(0)} zł do DARMOWEJ dostawy!`}
                    </span>
                  ) : (
                    <span className="text-emerald-400">
                      🎉 {language === 'en' ? 'FREE Kraków Delivery Unlocked!' : 'Darmowa Dostawa Odblokowana!'}
                    </span>
                  )}
                  <span className="text-[#D4AF37]">
                    {Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100))}%
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-[#D4AF37] transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h4 className="font-display text-2xl text-[#F5F2EB] mb-1">
                  {language === 'en' ? 'Your Bag is Empty' : 'Twój Koszyk Jest Pusty'}
                </h4>
                <p className="text-xs text-[#C8C2B4] max-w-xs mb-5">
                  {language === 'en'
                    ? 'Add sizzling Tandoori kebabs, creamy Butter Chicken, or royal Biryani to begin your feast.'
                    : 'Dodaj skwierczące kebaby Tandoori, kremowe Butter Chicken lub królewskie Biryani.'}
                </p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="lux-btn-gold px-6 py-2.5 text-xs"
                >
                  {language === 'en' ? 'Browse Full Menu' : 'Przeglądaj Menu'}
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const lineTotal = item.unitPrice * item.quantity;
                const addOnNames = item.addOnIds
                  .map((id) => {
                    const found = ADD_ONS.find((a) => a.id === id);
                    return found ? (language === 'en' ? found.name : found.namePl) : '';
                  })
                  .filter(Boolean);

                return (
                  <div
                    key={item.cartItemId}
                    className="p-3.5 rounded-2xl bg-[#16161D] border border-white/10 flex gap-3.5 shadow-sm"
                  >
                    <img
                      src={item.dish.image}
                      alt={item.dish.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-sm text-[#F5F2EB] truncate">
                          {language === 'en' ? item.dish.name : item.dish.namePl}
                        </h4>
                        <span className="font-bold text-sm text-[#D4AF37] shrink-0">
                          {lineTotal.toFixed(2)} zł
                        </span>
                      </div>

                      <div className="text-[11px] text-[#C8C2B4] mt-0.5 space-y-0.5">
                        <div>🌶️ Spice: {item.spiceLevel.toUpperCase()}</div>
                        {addOnNames.length > 0 && <div>+ {addOnNames.join(', ')}</div>}
                        {item.notes && (
                          <div className="italic text-[#D4AF37]">“{item.notes}”</div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 bg-[#09090B] rounded-full px-2 py-0.5 border border-white/10">
                          <button
                            onClick={() => updateCartQuantity(item.cartItemId, -1)}
                            className="w-6 h-6 flex items-center justify-center text-[#F5F2EB] hover:text-[#D4AF37]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.cartItemId, 1)}
                            className="w-6 h-6 flex items-center justify-center text-[#F5F2EB] hover:text-[#D4AF37]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-[#C8C2B4] hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Totals & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 bg-[#09090B] border-t border-white/10 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#C8C2B4]">
                  <span>{language === 'en' ? 'Subtotal' : 'Suma częściowa'}</span>
                  <span className="font-semibold text-[#F5F2EB]">{subtotal.toFixed(2)} zł</span>
                </div>
                {fulfillmentMode === 'delivery' && (
                  <div className="flex justify-between text-[#C8C2B4]">
                    <span>{language === 'en' ? 'Kraków Delivery Fee' : 'Dostawa Kraków'}</span>
                    <span className="font-semibold text-[#F5F2EB]">
                      {deliveryFee === 0 ? 'FREE (0 zł)' : `${deliveryFee.toFixed(2)} zł`}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-[#F5F2EB] pt-2 border-t border-white/10">
                  <span>{language === 'en' ? 'Total (incl. VAT)' : 'Razem (z VAT)'}</span>
                  <span className="text-[#D4AF37]">{total.toFixed(2)} zł</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setCartOpen(false);
                  setCheckoutOpen(true);
                }}
                className="w-full lux-btn-gold py-4 text-xs tracking-[0.16em]"
              >
                <span>
                  {language === 'en'
                    ? 'PROCEED TO CHECKOUT (COD / BLIK)'
                    : 'PRZEJDŹ DO KASY (GOTÓWKA / BLIK)'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
