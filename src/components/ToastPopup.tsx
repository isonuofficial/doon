import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Radar, X, Sparkles, Info } from 'lucide-react';
import { useStore } from '../store/useStore';

export const ToastPopup: React.FC = () => {
  const { activeToast, dismissToast, setRadarOpen, language } = useStore();

  useEffect(() => {
    if (!activeToast) return;
    const duration = activeToast.type === 'order-confirmed' ? 9000 : 4200;
    const timer = setTimeout(() => {
      dismissToast();
    }, duration);
    return () => clearTimeout(timer);
  }, [activeToast, dismissToast]);

  return (
    <AnimatePresence>
      {activeToast && (
        <motion.div
          key={activeToast.id}
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[70] w-[94%] max-w-lg pointer-events-auto"
        >
          <div
            className={`rounded-2xl p-4 sm:p-5 border backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex items-start justify-between gap-4 ${
              activeToast.type === 'order-confirmed'
                ? 'bg-[#121217]/95 border-[#D4AF37] ring-2 ring-[#D4AF37]/30'
                : 'bg-[#14141A]/95 border-[#D4AF37]/45'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${
                  activeToast.type === 'order-confirmed'
                    ? 'bg-[#D4AF37] text-[#09090B] border-[#FFF3C4]'
                    : activeToast.type === 'info'
                    ? 'bg-white/10 text-[#F5C542] border-white/20'
                    : 'bg-[#1B7A43]/25 text-[#4ADE80] border-[#1B7A43]'
                }`}
              >
                {activeToast.type === 'order-confirmed' ? (
                  <Sparkles className="w-5 h-5" />
                ) : activeToast.type === 'info' ? (
                  <Info className="w-5 h-5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
                    {activeToast.type === 'order-confirmed'
                      ? language === 'en'
                        ? 'ORDER CONFIRMED NOTIFICATION'
                        : 'POTWIERDZENIE ZAMÓWIENIA'
                      : 'DOON VALLEY KRAKÓW'}
                  </span>
                </div>
                <h4 className="font-display text-base sm:text-lg font-bold text-[#F5F2EB] mt-0.5">
                  {activeToast.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#C8C2B4] mt-0.5 leading-relaxed">
                  {activeToast.subtitle}
                </p>

                {activeToast.orderId && (
                  <button
                    onClick={() => {
                      const oid = activeToast.orderId;
                      dismissToast();
                      setRadarOpen(true, oid);
                    }}
                    className="mt-3 inline-flex items-center gap-1.5 lux-btn-gold px-4 py-1.5 text-xs uppercase cursor-pointer"
                  >
                    <Radar className="w-3.5 h-3.5" />
                    <span>
                      {language === 'en'
                        ? 'Track Live Order Now'
                        : 'Śledź Zamówienie na Żywo'}
                    </span>
                  </button>
                )}
              </div>
            </div>

            <button
              onClick={dismissToast}
              className="text-[#C8C2B4] hover:text-[#F5C542] p-1 rounded-lg transition-colors cursor-pointer"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

