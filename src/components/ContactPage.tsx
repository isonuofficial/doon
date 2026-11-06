import React, { useState } from 'react';
import { MapPin, Phone, Clock, Mail, Navigation, CheckCircle2, Calendar, Users } from 'lucide-react';
import { useStore } from '../store/useStore';

export const ContactPage: React.FC = () => {
  const { language, showToast } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+48 ');
  const [guests, setGuests] = useState('2 Guests');
  const [date, setDate] = useState('Tonight • 19:30');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast({
      title: language === 'en' ? 'Table Reserved!' : 'Stolik Zarezerwowany!',
      subtitle:
        language === 'en'
          ? `${guests} booked for ${date} under ${name}.`
          : `Zarezerwowano (${guests}) na ${date} dla ${name}.`,
      type: 'success',
    });
  };

  return (
    <div className="bg-[#09090B] pt-28 pb-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 xl:px-14">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="lux-badge-gold mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            {language === 'en' ? 'VISIT OR RESERVE A TABLE' : 'ODWIEDŹ NAS LUB ZAREZERWUJ STOLIK'}
          </span>
          <h1 className="font-display text-5xl sm:text-6xl tracking-wide text-[#F5F2EB] leading-[1.05] mb-4">
            {language === 'en' ? 'Find Us in Kraków' : 'Znajdź Nas w Krakowie'}
          </h1>
          <p className="text-[#C8C2B4] text-base sm:text-lg font-medium">
            {language === 'en'
              ? 'Located on historic ul. Zwierzyniecka, steps from Wawel Royal Castle and the Vistula Boulevards.'
              : 'Przy historycznej ul. Zwierzynieckiej, kilka kroków od Zamku Królewskiego na Wawelu i Bulwarów Wiślanych.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Info Cards + Interactive Kraków Map Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="lux-card p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                    {language === 'en' ? 'RESTAURANT ADDRESS' : 'ADRES RESTAURACJI'}
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-[#F5F2EB] mt-0.5">
                    ul. Zwierzyniecka, 31-103 Kraków
                  </h3>
                  <p className="text-sm text-[#C8C2B4] mt-1">
                    50.0579° N, 19.9311° E • Stare Miasto / Półwsie Zwierzynieckie
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <a
                  href="tel:+48691234567"
                  className="p-4 rounded-2xl bg-[#16161D] border border-white/10 hover:border-[#D4AF37] transition-all flex items-center gap-3.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37] text-[#09090B] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-[#C8C2B4]">
                      {language === 'en' ? 'CLICK TO CALL' : 'ZADZWOŃ TERAZ'}
                    </div>
                    <div className="text-sm font-bold text-[#F5F2EB]">+48 691 234 567</div>
                  </div>
                </a>

                <a
                  href="mailto:namaste@doonvalley.pl"
                  className="p-4 rounded-2xl bg-[#16161D] border border-white/10 hover:border-[#D4AF37] transition-all flex items-center gap-3.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-[#C8C2B4]">
                      EMAIL
                    </div>
                    <div className="text-sm font-bold text-[#F5F2EB]">namaste@doonvalley.pl</div>
                  </div>
                </a>
              </div>

              <div className="p-4 rounded-2xl bg-[#16161D] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#D4AF37]" />
                  <div>
                    <div className="text-xs font-semibold text-[#F5F2EB]">
                      {language === 'en' ? 'Open Daily (Mon – Sun)' : 'Czynne Codziennie (Pon – Ndz)'}
                    </div>
                    <div className="text-xs text-[#C8C2B4]">12:00 – 22:30 (Kitchen & Delivery)</div>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[11px] font-semibold">
                  OPEN NOW
                </span>
              </div>
            </div>

            {/* Stylized Map / Storefront Card */}
            <div className="rounded-3xl overflow-hidden border border-[#D4AF37]/25 bg-[#111116] text-[#F5F2EB] p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                    DELIVERY ZONES • KRAKÓW
                  </span>
                  <h4 className="font-display text-2xl tracking-wide mt-0.5">
                    30–40 Min Hot Delivery Radius
                  </h4>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Zwierzyniecka+Krakow+Doon+Valley"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full bg-[#D4AF37] text-[#09090B] text-xs font-bold flex items-center gap-1.5 hover:bg-[#F3E5AB] transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Google Maps
                </a>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                {[
                  'Stare Miasto (Free >100 zł)',
                  'Kazimierz (30 min)',
                  'Zwierzyniec / Salwator',
                  'Podgórze / Zabłocie',
                  'Grzegórzki / Rondo Mogilskie',
                  'Krowodrza / AGH',
                ].map((zone) => (
                  <div
                    key={zone}
                    className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-[#F5F2EB]/90 font-medium"
                  >
                    • {zone}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Table Reservation Form */}
          <div className="lg:col-span-6">
            <div className="lux-card p-8 sm:p-10">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                {language === 'en' ? 'DINE-IN BOOKING' : 'REZERWACJA STOLIKA'}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#F5F2EB] tracking-wide mt-1 mb-6">
                {language === 'en'
                  ? 'Reserve Your Royal Table'
                  : 'Zarezerwuj Królewski Stolik'}
              </h2>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="font-display text-3xl text-[#F5F2EB]">
                    {language === 'en' ? 'Table Reservation Confirmed!' : 'Rezerwacja Potwierdzona!'}
                  </h3>
                  <p className="text-sm text-[#C8C2B4] max-w-md mx-auto">
                    {language === 'en'
                      ? `We look forward to welcoming ${name} (${guests}) on ${date} at Doon Valley, ul. Zwierzyniecka.`
                      : `Czekamy na Państwa: ${name} (${guests}), termin: ${date} w Doon Valley, ul. Zwierzyniecka.`}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="lux-btn-gold px-6 py-2.5 text-xs"
                  >
                    {language === 'en' ? 'Book Another Table' : 'Nowa Rezerwacja'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#C8C2B4] mb-1.5">
                      {language === 'en' ? 'Full Name *' : 'Imię i Nazwisko *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jan Kowalski"
                      className="w-full px-4 py-3 rounded-xl bg-[#16161D] border border-white/10 text-[#F5F2EB] text-sm font-medium focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#C8C2B4] mb-1.5">
                        {language === 'en' ? 'Phone Number *' : 'Numer Telefonu *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#16161D] border border-white/10 text-[#F5F2EB] text-sm font-medium focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#C8C2B4] mb-1.5">
                        <Users className="w-3.5 h-3.5 inline mr-1 text-[#D4AF37]" />
                        {language === 'en' ? 'Party Size' : 'Liczba Gości'}
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#16161D] border border-white/10 text-[#F5F2EB] text-sm font-medium focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option>2 Guests</option>
                        <option>3 Guests</option>
                        <option>4 Guests</option>
                        <option>6 Guests (Family Table)</option>
                        <option>8+ Guests (VIP Banquet)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#C8C2B4] mb-1.5">
                      <Calendar className="w-3.5 h-3.5 inline mr-1 text-[#D4AF37]" />
                      {language === 'en' ? 'Preferred Date & Time' : 'Preferowana Data i Godzina'}
                    </label>
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#16161D] border border-white/10 text-[#F5F2EB] text-sm font-medium focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#C8C2B4] mb-1.5">
                      {language === 'en' ? 'Special Requests (Optional)' : 'Uwagi (Opcjonalnie)'}
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={
                        language === 'en'
                          ? 'Window table, birthday celebration, high chair...'
                          : 'Stolik przy oknie, urodziny, krzesełko dla dziecka...'
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#16161D] border border-white/10 text-[#F5F2EB] text-sm font-medium focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <button type="submit" className="w-full lux-btn-gold py-4 text-xs tracking-[0.2em]">
                    {language === 'en' ? 'CONFIRM TABLE RESERVATION' : 'POTWIERDŹ REZERWACJĘ STOLIKA'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
