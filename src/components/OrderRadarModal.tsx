import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  Flame,
  ChefHat,
  Bike,
  MapPin,
  Phone,
  Banknote,
  CreditCard,
  Clock,
  FastForward,
} from 'lucide-react';
import { useStore } from '../store/useStore';

export const OrderRadarModal: React.FC = () => {
  const { orders, trackedOrderId, isRadarOpen, setRadarOpen, advanceOrderStage, language } =
    useStore();

  const activeOrder = orders.find((o) => o.orderId === trackedOrderId) || orders[0];

  if (!isRadarOpen || !activeOrder) return null;

  const STEPS = [
    {
      step: 1,
      titleEn: 'Order Confirmed',
      titlePl: 'Zamówienie Przyjęte',
      descEn: 'Received at Doon Valley ul. Zwierzyniecka POS',
      descPl: 'Odebrane w systemie Doon Valley ul. Zwierzyniecka',
      icon: CheckCircle2,
    },
    {
      step: 2,
      titleEn: 'Firing in Clay Tandoor (480°C)',
      titlePl: 'Wypiekanie w Piecu Tandoor (480°C)',
      descEn: 'Chef roasting fresh skewers & simmering royal masala',
      descPl: 'Szef kuchni wypieka mięsa i świeży chlebek Naan',
      icon: Flame,
    },
    {
      step: 3,
      titleEn: 'Thermal Copper-Pot Sealing',
      titlePl: 'Pakowanie Termiczne i Kontrola Jakości',
      descEn: 'Sealed with fresh mint chutney & masala papadum',
      descPl: 'Zapakowane z sosami miętowym i tamaryndowym',
      icon: ChefHat,
    },
    {
      step: 4,
      titleEn: 'Courier En Route via Wawel / Vistula',
      titlePl: 'Kurier w Drodze przez Kraków',
      descEn: 'Courier Piotr K. is riding towards your address',
      descPl: 'Kurier Piotr K. jedzie pod wskazany adres',
      icon: Bike,
    },
    {
      step: 5,
      titleEn: 'Arrived — Smacznego & Namaste!',
      titlePl: 'Dostarczono — Smacznego i Namaste!',
      descEn: 'Enjoy your royal Himalayan feast!',
      descPl: 'Życzymy królewskiej uczty!',
      icon: MapPin,
    },
  ];

  const paymentBadgeLabel =
    activeOrder.paymentMethod === 'COD'
      ? language === 'en'
        ? 'Cash / Card on Delivery (COD)'
        : 'Gotówka / Karta przy Odbiorze'
      : 'BLIK Instant Paid';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="relative w-full max-w-3xl bg-[#111116] rounded-3xl border border-[#D4AF37]/40 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col text-[#F5F2EB]"
        >
          {/* Top Bar */}
          <div className="px-6 py-5 bg-[#09090B] border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                  LIVE KITCHEN & COURIER RADAR • #{activeOrder.orderId}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl tracking-wide text-[#F5F2EB]">
                  {language === 'en'
                    ? 'Tracking Your Royal Feast'
                    : 'Śledzenie Zamówienia na Żywo'}
                </h2>
              </div>
            </div>
            <button
              onClick={() => setRadarOpen(false)}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {/* Top Status Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#16161D] border border-white/10 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-[#C8C2B4]">
                    {language === 'en' ? 'ESTIMATED ARRIVAL' : 'SZACOWANY CZAS'}
                  </div>
                  <div className="font-display text-2xl font-bold text-[#F5F2EB]">
                    {activeOrder.currentStageIndex === 5
                      ? language === 'en'
                        ? 'Delivered!'
                        : 'Dostarczono!'
                      : `${activeOrder.gpsTelemetry.etaMinutes} mins`}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#16161D] border border-white/10 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center">
                  {activeOrder.paymentMethod === 'COD' ? (
                    <Banknote className="w-5 h-5 text-[#D4AF37]" />
                  ) : (
                    <CreditCard className="w-5 h-5 text-[#D4AF37]" />
                  )}
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-[#C8C2B4]">
                    {language === 'en' ? 'PAYMENT METHOD' : 'PŁATNOŚĆ'}
                  </div>
                  <div className="text-xs font-bold text-[#F5F2EB]">{paymentBadgeLabel}</div>
                  <div className="text-xs font-bold text-[#D4AF37]">
                    {activeOrder.totalAmount.toFixed(2)} zł
                  </div>
                </div>
              </div>

              <a
                href="tel:+48691234567"
                className="p-4 rounded-2xl bg-[#D4AF37] text-[#09090B] flex items-center justify-between hover:bg-[#F3E5AB] transition-colors shadow-md"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                      {language === 'en' ? 'DIRECT KITCHEN LINE' : 'TELEFON DO KUCHNI'}
                    </div>
                    <div className="text-sm font-extrabold">+48 691 234 567</div>
                  </div>
                </div>
              </a>
            </div>

            {/* Simulated Kraków Route Visualizer */}
            <div className="p-5 rounded-3xl bg-[#09090B] border border-[#D4AF37]/25 text-[#F5F2EB] relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                  📍 KRAKÓW GPS ROUTE: UL. ZWIERZYNIECKA → DESTINATION
                </span>
                <button
                  onClick={() => advanceOrderStage(activeOrder.orderId)}
                  className="px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 hover:bg-[#D4AF37] hover:text-[#09090B] text-[11px] font-bold flex items-center gap-1.5 border border-[#D4AF37]/40 text-[#D4AF37] transition-colors"
                >
                  <FastForward className="w-3.5 h-3.5" />
                  {language === 'en' ? 'Simulate Next Stage' : 'Symuluj Kolejny Etap'}
                </button>
              </div>

              {/* Progress Track */}
              <div className="relative pt-4 pb-2">
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]"
                    initial={{ width: '20%' }}
                    animate={{ width: `${(activeOrder.currentStageIndex / 5) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-[#C8C2B4] mt-2 font-medium">
                  <span>🏛️ Doon Valley (ul. Zwierzyniecka)</span>
                  <span>🏰 Wawel / Planty</span>
                  <span className="text-[#D4AF37] truncate max-w-[180px]">
                    🏠 {activeOrder.deliveryAddress}
                  </span>
                </div>
              </div>
            </div>

            {/* 5-Stage Vertical Stepper */}
            <div className="space-y-3">
              {STEPS.map((s) => {
                const Icon = s.icon;
                const completed = activeOrder.currentStageIndex >= s.step;
                const isCurrent = activeOrder.currentStageIndex === s.step;
                return (
                  <div
                    key={s.step}
                    className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                      isCurrent
                        ? 'bg-[#D4AF37]/15 border-[#D4AF37] shadow-md'
                        : completed
                        ? 'bg-[#16161D] border-emerald-500/30'
                        : 'bg-[#16161D]/40 border-white/5 opacity-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isCurrent
                            ? 'bg-[#D4AF37] text-[#09090B]'
                            : completed
                            ? 'bg-emerald-500 text-[#09090B]'
                            : 'bg-white/10 text-[#C8C2B4]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#F5F2EB]">
                          {language === 'en' ? s.titleEn : s.titlePl}
                        </h4>
                        <p className="text-xs text-[#C8C2B4]">
                          {language === 'en' ? s.descEn : s.descPl}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                        isCurrent
                          ? 'bg-[#D4AF37] text-[#09090B]'
                          : completed
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-white/5 text-[#C8C2B4]'
                      }`}
                    >
                      {isCurrent
                        ? language === 'en'
                          ? 'IN PROGRESS'
                          : 'W TRAKCIE'
                        : completed
                        ? language === 'en'
                          ? 'DONE'
                          : 'GOTOWE'
                        : language === 'en'
                        ? 'PENDING'
                        : 'OCZEKUJE'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
