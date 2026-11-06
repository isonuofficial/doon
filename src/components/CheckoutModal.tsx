import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Banknote,
  Smartphone,
  MapPin,
  Phone,
  User,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../store/useStore';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    isCheckoutOpen,
    setCheckoutOpen,
    fulfillmentMode,
    setFulfillmentMode,
    placeOrder,
    language,
    userProfile,
    savedAddresses,
    selectedAddressId,
    selectAddress,
  } = useStore();

  const selectedAddress =
    savedAddresses.find((a) => a.id === selectedAddressId) || savedAddresses[0];

  const [customerName, setCustomerName] = useState(userProfile.name || 'Krzysztof Nowak');
  const [customerPhone, setCustomerPhone] = useState(userProfile.phone || '+48 691 234 567');
  const [customerEmail, setCustomerEmail] = useState(userProfile.email || 'krzysztof.nowak@example.pl');
  const [deliveryAddress, setDeliveryAddress] = useState(
    selectedAddress
      ? `${selectedAddress.street} ${selectedAddress.buildingNo}/${selectedAddress.apartment}, ${selectedAddress.postalCode} ${selectedAddress.city}`
      : 'ul. Karmelicka 14/5, 31-131 Kraków'
  );
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'BLIK'>('COD');
  const [cashChangeNote, setCashChangeNote] = useState('Need change from 200 zł banknote');
  const [blikCode, setBlikCode] = useState('749 201');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isCheckoutOpen) {
      setCustomerName(userProfile.name);
      setCustomerPhone(userProfile.phone);
      setCustomerEmail(userProfile.email);
      if (selectedAddress) {
        setDeliveryAddress(
          `${selectedAddress.street} ${selectedAddress.buildingNo}/${selectedAddress.apartment}, ${selectedAddress.postalCode} ${selectedAddress.city}`
        );
      }
    }
  }, [isCheckoutOpen, userProfile, selectedAddress]);

  if (!isCheckoutOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = fulfillmentMode === 'pickup' ? 0 : subtotal >= 100 ? 0 : 12;
  const total = subtotal + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      placeOrder({
        customerName,
        customerPhone,
        customerEmail,
        deliveryAddress:
          fulfillmentMode === 'delivery'
            ? deliveryAddress
            : 'Self Pickup at Doon Valley, ul. Zwierzyniecka, Kraków',
        paymentMethod,
        cashChangeNeeded: paymentMethod === 'COD' ? cashChangeNote : undefined,
      });
    }, 550);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-[#111116] rounded-3xl border border-[#D4AF37]/35 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col text-[#F5F2EB]"
        >
          {/* Header */}
          <div className="px-6 py-5 bg-[#09090B] border-b border-white/10 flex items-center justify-between shrink-0">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                DOON VALLEY KRAKÓW • SECURE CHECKOUT
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-wide text-[#F5F2EB]">
                {language === 'en'
                  ? 'Complete Your Royal Feast Order'
                  : 'Finalizacja Zamówienia'}
              </h2>
            </div>
            <button
              onClick={() => setCheckoutOpen(false)}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Form */}
          <form onSubmit={handleSubmitOrder} className="p-6 overflow-y-auto space-y-6 flex-1">
            {/* Step 1: Order Type */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37] mb-2.5">
                {language === 'en' ? '1. Fulfillment Mode' : '1. Sposób Realizacji'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    { id: 'delivery', labelEn: 'Hot Delivery (30–40m)', labelPl: 'Dostawa (30–40 min)' },
                    { id: 'pickup', labelEn: 'Self Pickup (20m)', labelPl: 'Odbiór Osobisty' },
                  ] as const
                ).map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setFulfillmentMode(mode.id)}
                    className={`py-3 px-4 rounded-2xl border text-xs font-semibold transition-all ${
                      fulfillmentMode === mode.id
                        ? 'bg-[#D4AF37] text-[#09090B] border-[#D4AF37] font-bold shadow-md'
                        : 'bg-[#16161D] text-[#C8C2B4] border-white/10 hover:border-[#D4AF37]/40'
                    }`}
                  >
                    {language === 'en' ? mode.labelEn : mode.labelPl}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Customer & Address Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C8C2B4] mb-1.5">
                  <User className="w-3.5 h-3.5 inline mr-1 text-[#D4AF37]" />
                  {language === 'en' ? 'Recipient Name *' : 'Imię i Nazwisko *'}
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#16161D] border border-white/10 text-sm font-semibold text-[#F5F2EB] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C8C2B4] mb-1.5">
                  <Phone className="w-3.5 h-3.5 inline mr-1 text-[#D4AF37]" />
                  {language === 'en' ? 'Polish / Mobile Phone *' : 'Telefon Kontaktowy *'}
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#16161D] border border-white/10 text-sm font-semibold text-[#F5F2EB] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {fulfillmentMode === 'delivery' && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C8C2B4] mb-1.5">
                  <MapPin className="w-3.5 h-3.5 inline mr-1 text-[#D4AF37]" />
                  {language === 'en'
                    ? 'Kraków Delivery Address (Street, Apt, Gate Code) *'
                    : 'Adres Dostawy w Krakowie (Ulica, Nr, Kod Domofonu) *'}
                </label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#16161D] border border-white/10 text-sm font-semibold text-[#F5F2EB] focus:outline-none focus:border-[#D4AF37]"
                />
                {savedAddresses.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {savedAddresses.map((addr) => {
                      const full = `${addr.street} ${addr.buildingNo}/${addr.apartment}, ${addr.postalCode} ${addr.city}`;
                      return (
                        <button
                          key={addr.id}
                          type="button"
                          onClick={() => {
                            selectAddress(addr.id);
                            setDeliveryAddress(full);
                          }}
                          className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                            deliveryAddress === full
                              ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]'
                              : 'bg-white/5 border-white/10 text-[#C8C2B4] hover:text-[#F5F2EB]'
                          }`}
                        >
                          {addr.label}: {addr.street} {addr.buildingNo}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Payment Method (COD & BLIK) */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37] mb-2.5">
                {language === 'en'
                  ? '2. Choose Payment Method (Pay on Delivery or Online)'
                  : '2. Wybierz Metodę Płatności (Przy Odbiorze lub Online)'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    paymentMethod === 'COD'
                      ? 'bg-[#D4AF37]/15 border-[#D4AF37] shadow-md'
                      : 'bg-[#16161D] border-white/10 hover:border-[#D4AF37]/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          paymentMethod === 'COD'
                            ? 'bg-[#D4AF37] text-[#09090B]'
                            : 'bg-white/5 text-[#D4AF37]'
                        }`}
                      >
                        <Banknote className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                          PAY ON DELIVERY
                        </span>
                        <h4 className="font-bold text-sm text-[#F5F2EB] mt-0.5">
                          {language === 'en'
                            ? 'Cash or Card on Delivery (COD)'
                            : 'Gotówka lub Karta przy Odbiorze'}
                        </h4>
                      </div>
                    </div>
                    {paymentMethod === 'COD' && (
                      <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-[#C8C2B4]">
                    {language === 'en'
                      ? 'Pay PLN cash or tap card on courier POS terminal upon arrival'
                      : 'Zapłać gotówką w PLN lub kartą u kuriera przy odbiorze'}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('BLIK')}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    paymentMethod === 'BLIK'
                      ? 'bg-[#D4AF37]/15 border-[#D4AF37] shadow-md'
                      : 'bg-[#16161D] border-white/10 hover:border-[#D4AF37]/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          paymentMethod === 'BLIK'
                            ? 'bg-[#D4AF37] text-[#09090B]'
                            : 'bg-white/5 text-[#D4AF37]'
                        }`}
                      >
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                          INSTANT PLN
                        </span>
                        <h4 className="font-bold text-sm text-[#F5F2EB] mt-0.5">
                          {language === 'en'
                            ? 'BLIK / Przelewy24 Online'
                            : 'Szybka Płatność BLIK / Online'}
                        </h4>
                      </div>
                    </div>
                    {paymentMethod === 'BLIK' && (
                      <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-[#C8C2B4]">
                    {language === 'en'
                      ? 'Instant 6-digit Polish banking code & mobile confirmation'
                      : 'Wpisz 6-cyfrowy kod BLIK i zatwierdź w aplikacji banku'}
                  </p>
                </button>
              </div>

              {/* Conditional Payment Sub-Input */}
              {paymentMethod === 'COD' && (
                <div className="mt-3 p-4 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                  <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                    💵{' '}
                    {language === 'en'
                      ? 'Cash / Terminal on Delivery — Any note for the courier?'
                      : 'Płatność przy odbiorze — Uwaga dla kuriera (np. reszta z 200 zł):'}
                  </label>
                  <input
                    type="text"
                    value={cashChangeNote}
                    onChange={(e) => setCashChangeNote(e.target.value)}
                    placeholder="e.g. Change from 100 zł or Card terminal please"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#09090B] border border-white/15 text-xs font-semibold text-[#F5F2EB]"
                  />
                </div>
              )}

              {paymentMethod === 'BLIK' && (
                <div className="mt-3 p-4 rounded-2xl bg-[#16161D] border border-[#D4AF37]/30 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold text-[#D4AF37]">
                      📱 {language === 'en' ? 'Enter 6-Digit BLIK Code' : 'Wpisz 6-cyfrowy kod BLIK'}
                    </div>
                    <div className="text-[11px] text-[#C8C2B4]">
                      {language === 'en'
                        ? 'Approve in your Polish banking app after clicking Confirm'
                        : 'Zatwierdź w aplikacji mobilnej banku'}
                    </div>
                  </div>
                  <input
                    type="text"
                    maxLength={7}
                    value={blikCode}
                    onChange={(e) => setBlikCode(e.target.value)}
                    className="w-32 text-center font-mono text-lg font-extrabold tracking-widest py-2 rounded-xl bg-[#09090B] border border-[#D4AF37] text-[#D4AF37]"
                  />
                </div>
              )}
            </div>

            {/* Order Summary Box */}
            <div className="p-4 rounded-2xl bg-[#09090B] border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between text-[#C8C2B4]">
                <span>{language === 'en' ? 'Food & Drinks Subtotal' : 'Wartość dań'}</span>
                <span className="font-semibold text-[#F5F2EB]">{subtotal.toFixed(2)} zł</span>
              </div>
              {fulfillmentMode === 'delivery' && (
                <div className="flex justify-between text-[#C8C2B4]">
                  <span>{language === 'en' ? 'Delivery to Kraków Address' : 'Dostawa Kraków'}</span>
                  <span className="font-semibold text-[#F5F2EB]">
                    {deliveryFee === 0 ? 'FREE (0 zł)' : `${deliveryFee.toFixed(2)} zł`}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-[#F5F2EB] pt-2 border-t border-white/10">
                <span>
                  {paymentMethod === 'COD'
                    ? language === 'en'
                      ? 'Total Due on Delivery'
                      : 'Do Zapłaty przy Odbiorze'
                    : language === 'en'
                    ? 'Total Amount'
                    : 'Kwota Całkowita'}
                </span>
                <span className="text-[#D4AF37]">{total.toFixed(2)} zł</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full lux-btn-gold py-4 text-xs tracking-[0.2em] shadow-xl"
            >
              <Sparkles className="w-4 h-4" />
              {isProcessing
                ? language === 'en'
                  ? 'TRANSMITTING TO TANDOOR KITCHEN...'
                  : 'PRZESYŁANIE DO KUCHNI...'
                : language === 'en'
                ? `CONFIRM ORDER • ${total.toFixed(2)} ZŁ (${paymentMethod})`
                : `ZAMAWIAM I PŁACĘ • ${total.toFixed(2)} ZŁ`}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#C8C2B4]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>
                {language === 'en'
                  ? 'Instant order confirmation pop-up & live GPS kitchen radar included'
                  : 'Natychmiastowe powiadomienie i śledzenie zamówienia na żywo'}
              </span>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
