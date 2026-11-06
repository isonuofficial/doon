import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Clock,
  LogOut,
  LogIn,
  Radar,
  Plus,
  Trash2,
  CheckCircle2,
  Award,
  ShoppingBag,
} from 'lucide-react';
import { useStore } from '../store/useStore';

export const ProfileAuthModal: React.FC = () => {
  const {
    language,
    isProfileModalOpen,
    setProfileModalOpen,
    isLoggedIn,
    userProfile,
    loginUser,
    logoutUser,
    updateUserProfile,
    savedAddresses,
    selectedAddressId,
    selectAddress,
    addAddress,
    deleteAddress,
    orders,
    setRadarOpen,
  } = useStore();

  const [activeSection, setActiveSection] = useState<'orders' | 'profile' | 'addresses'>(
    'orders'
  );

  // Login Form State (when logged out)
  const [loginName, setLoginName] = useState('Krzysztof Nowak');
  const [loginPhone, setLoginPhone] = useState('+48 691 234 567');
  const [loginEmail, setLoginEmail] = useState('krzysztof.nowak@example.pl');

  // Add Address Form State
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    label: 'Work / Biuro',
    street: '',
    buildingNo: '',
    apartment: '',
    floor: '',
    doorCode: '',
    postalCode: '31-103',
    driverNotes: '',
  });

  if (!isProfileModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser({
      name: loginName,
      phone: loginPhone,
      email: loginEmail,
    });
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.street.trim() || !newAddr.buildingNo.trim()) return;
    addAddress({
      label: newAddr.label || 'Saved Address',
      isDefault: savedAddresses.length === 0,
      fullName: userProfile.name,
      phone: userProfile.phone,
      email: userProfile.email,
      street: newAddr.street,
      buildingNo: newAddr.buildingNo,
      apartment: newAddr.apartment,
      floor: newAddr.floor,
      doorCode: newAddr.doorCode,
      postalCode: newAddr.postalCode,
      city: 'Kraków',
      driverNotes: newAddr.driverNotes,
      coords: [50.06 + Math.random() * 0.008, 19.932 + Math.random() * 0.008],
    });
    setShowAddAddress(false);
    setNewAddr({
      label: 'Work / Biuro',
      street: '',
      buildingNo: '',
      apartment: '',
      floor: '',
      doorCode: '',
      postalCode: '31-103',
      driverNotes: '',
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[#111115] border border-[#D4AF37]/40 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] w-full max-w-3xl overflow-hidden my-auto max-h-[90vh] flex flex-col text-[#F5F2EB]"
        >
          {/* Top Header */}
          <div className="p-5 sm:p-6 bg-[#09090B] border-b border-[#D4AF37]/25 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37] flex items-center justify-center text-[#F5C542]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
                  {isLoggedIn
                    ? language === 'en'
                      ? 'ROYAL MEMBER ACCOUNT • KRAKÓW'
                      : 'KONTO KLIENTA • KRAKÓW'
                    : language === 'en'
                    ? 'MEMBER SIGN IN'
                    : 'LOGOWANIE DO KONTA'}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F5F2EB]">
                  {isLoggedIn
                    ? userProfile.name
                    : language === 'en'
                    ? 'Sign In to Doon Valley'
                    : 'Zaloguj się do Doon Valley'}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {isLoggedIn && (
                <button
                  onClick={logoutUser}
                  className="px-3.5 py-2 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-bold uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Logout' : 'Wyloguj'}</span>
                </button>
              )}
              <button
                onClick={() => setProfileModalOpen(false)}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-[#F5F2EB] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body: Either Logged Out Form OR Logged In Dashboard */}
          {!isLoggedIn ? (
            <div className="p-6 sm:p-8 max-w-md mx-auto w-full space-y-6">
              <div className="text-center space-y-2">
                <img
                  src="/images/brand/logo.jpg"
                  alt="Doon Valley Logo"
                  className="w-20 h-20 rounded-full border-2 border-[#D4AF37] mx-auto object-cover"
                />
                <h4 className="font-display text-2xl font-bold text-[#F5F2EB]">
                  {language === 'en'
                    ? 'Access Your Orders & Saved Addresses'
                    : 'Dostęp do Historii Zamówień i Adresów'}
                </h4>
                <p className="text-xs sm:text-sm text-[#C8C2B4]">
                  {language === 'en'
                    ? 'Sign in with your phone number and email to view your past orders, track active deliveries, and reorder in 1 click.'
                    : 'Zaloguj się numerem telefonu i e-mailem, aby zobaczyć historię zamówień, zapisane adresy oraz śledzić dostawę.'}
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1.5">
                    {language === 'en' ? 'Full Name' : 'Imię i Nazwisko'}
                  </label>
                  <input
                    type="text"
                    required
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                    className="w-full bg-[#16161C] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm text-[#F5F2EB] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1.5">
                    {language === 'en' ? 'Phone Number (+48)' : 'Numer Telefonu (+48)'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    className="w-full bg-[#16161C] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm text-[#F5F2EB] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1.5">
                    {language === 'en' ? 'Email Address' : 'Adres E-mail'}
                  </label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-[#16161C] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm text-[#F5F2EB] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="lux-btn-gold w-full py-3.5 text-sm uppercase flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>
                    {language === 'en'
                      ? 'Login to My Account'
                      : 'Zaloguj się do Konta'}
                  </span>
                </button>
              </form>
            </div>
          ) : (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Summary Strip: Phone, Address, Loyalty Points */}
              <div className="px-6 py-4 bg-[#16161C] border-b border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <div>
                    <span className="text-[#C8C2B4] block">
                      {language === 'en' ? 'Verified Phone' : 'Zweryfikowany Telefon'}
                    </span>
                    <span className="font-bold text-[#F5F2EB]">{userProfile.phone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <div>
                    <span className="text-[#C8C2B4] block">
                      {language === 'en' ? 'Default Kraków Address' : 'Domyślny Adres'}
                    </span>
                    <span className="font-bold text-[#F5F2EB]">
                      {savedAddresses.find((a) => a.id === selectedAddressId)?.street ||
                        'ul. Karmelicka'}{' '}
                      {savedAddresses.find((a) => a.id === selectedAddressId)?.buildingNo ||
                        '14/5'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <div>
                    <span className="text-[#C8C2B4] block">
                      {language === 'en' ? 'Royal Spice Points' : 'Punkty Lojalnościowe'}
                    </span>
                    <span className="font-bold text-[#F5C542]">
                      {userProfile.loyaltyPoints} pts
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Sub-tabs */}
              <div className="px-6 pt-4 border-b border-white/10 flex items-center gap-2">
                <button
                  onClick={() => setActiveSection('orders')}
                  className={`px-4 py-2.5 rounded-t-xl text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                    activeSection === 'orders'
                      ? 'border-[#D4AF37] text-[#F5C542] bg-white/5'
                      : 'border-transparent text-[#C8C2B4] hover:text-white'
                  }`}
                >
                  {language === 'en'
                    ? `Order History (${orders.length})`
                    : `Historia Zamówień (${orders.length})`}
                </button>
                <button
                  onClick={() => setActiveSection('addresses')}
                  className={`px-4 py-2.5 rounded-t-xl text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                    activeSection === 'addresses'
                      ? 'border-[#D4AF37] text-[#F5C542] bg-white/5'
                      : 'border-transparent text-[#C8C2B4] hover:text-white'
                  }`}
                >
                  {language === 'en'
                    ? `Saved Addresses (${savedAddresses.length})`
                    : `Zapisane Adresy (${savedAddresses.length})`}
                </button>
                <button
                  onClick={() => setActiveSection('profile')}
                  className={`px-4 py-2.5 rounded-t-xl text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                    activeSection === 'profile'
                      ? 'border-[#D4AF37] text-[#F5C542] bg-white/5'
                      : 'border-transparent text-[#C8C2B4] hover:text-white'
                  }`}
                >
                  {language === 'en' ? 'Profile & Phone' : 'Profil i Telefon'}
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6 overflow-y-auto flex-1 space-y-4">
                {/* 1. ORDER HISTORY */}
                {activeSection === 'orders' && (
                  <div className="space-y-4">
                    {orders.map((ord) => (
                      <div
                        key={ord.orderId}
                        className="lux-card p-4 sm:p-5 flex flex-col justify-between gap-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#F5C542]">
                              <ShoppingBag className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-[#F5F2EB]">
                                  {ord.orderId}
                                </span>
                                <span
                                  className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                                    ord.status === 'DELIVERED'
                                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                      : 'bg-[#D4AF37]/20 text-[#F5C542] border border-[#D4AF37]/40'
                                  }`}
                                >
                                  {ord.status.replace(/_/g, ' ')}
                                </span>
                              </div>
                              <p className="text-xs text-[#C8C2B4] mt-0.5 flex items-center gap-1.5">
                                <Clock className="w-3 h-3 text-[#D4AF37]" />
                                {new Date(ord.createdAt).toLocaleString()} •{' '}
                                {ord.deliveryAddress}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-xs text-[#C8C2B4] block">
                              {ord.paymentMethod} • {ord.paymentStatus}
                            </span>
                            <span className="text-lg font-extrabold text-[#F5C542]">
                              {ord.totalAmount.toFixed(2)} zł
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="text-xs text-[#C8C2B4] space-y-0.5">
                            {ord.items.map((item, i) => (
                              <div key={i}>
                                <strong className="text-[#F5F2EB]">
                                  {item.quantity}x{' '}
                                  {language === 'en' ? item.name : item.namePl}
                                </strong>{' '}
                                <span className="text-[#D4AF37]">
                                  ({item.spiceLevel})
                                </span>
                              </div>
                            ))}
                          </div>

                          <button
                            onClick={() => {
                              setProfileModalOpen(false);
                              setRadarOpen(true, ord.orderId);
                            }}
                            className="lux-btn-gold px-4 py-2 text-xs uppercase flex items-center gap-1.5 cursor-pointer"
                          >
                            <Radar className="w-3.5 h-3.5" />
                            <span>
                              {language === 'en'
                                ? 'Track on Live Radar'
                                : 'Śledź na Radarze GPS'}
                            </span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 2. SAVED ADDRESSES */}
                {activeSection === 'addresses' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {savedAddresses.map((addr) => {
                        const isSelected = addr.id === selectedAddressId;
                        return (
                          <div
                            key={addr.id}
                            onClick={() => selectAddress(addr.id)}
                            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-[#D4AF37]/12 border-[#D4AF37]'
                                : 'bg-[#16161C] border-white/10 hover:border-[#D4AF37]/40'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="font-bold text-sm text-[#F5F2EB]">
                                {addr.label}
                              </span>
                              <div className="flex items-center gap-1.5">
                                {isSelected && (
                                  <span className="bg-[#D4AF37] text-[#09090B] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Default
                                  </span>
                                )}
                                {savedAddresses.length > 1 && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteAddress(addr.id);
                                    }}
                                    className="text-[#C8C2B4] hover:text-red-400 p-1 cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>
                            <p className="text-xs font-semibold text-[#F5F2EB]">
                              {addr.street} {addr.buildingNo}
                              {addr.apartment ? `/${addr.apartment}` : ''},{' '}
                              {addr.postalCode} {addr.city}
                            </p>
                            <p className="text-xs text-[#C8C2B4] mt-1">
                              Tel: {addr.phone} • Floor: {addr.floor || '-'} • Code:{' '}
                              {addr.doorCode || '-'}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {showAddAddress ? (
                      <form
                        onSubmit={handleCreateAddress}
                        className="bg-[#16161C] border border-[#D4AF37]/40 rounded-2xl p-4 space-y-3"
                      >
                        <h5 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                          {language === 'en'
                            ? 'New Kraków Delivery Address'
                            : 'Nowy Adres Dostawy w Krakowie'}
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <input
                            type="text"
                            placeholder="Label (Home, Office)"
                            value={newAddr.label}
                            onChange={(e) =>
                              setNewAddr({ ...newAddr, label: e.target.value })
                            }
                            className="bg-[#09090B] border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                          />
                          <input
                            type="text"
                            required
                            placeholder="Street (e.g. ul. Grodzka)"
                            value={newAddr.street}
                            onChange={(e) =>
                              setNewAddr({ ...newAddr, street: e.target.value })
                            }
                            className="bg-[#09090B] border border-white/15 rounded-xl px-3 py-2 text-xs text-white sm:col-span-2"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <input
                            type="text"
                            required
                            placeholder="Building *"
                            value={newAddr.buildingNo}
                            onChange={(e) =>
                              setNewAddr({ ...newAddr, buildingNo: e.target.value })
                            }
                            className="bg-[#09090B] border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                          />
                          <input
                            type="text"
                            placeholder="Apartment"
                            value={newAddr.apartment}
                            onChange={(e) =>
                              setNewAddr({ ...newAddr, apartment: e.target.value })
                            }
                            className="bg-[#09090B] border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                          />
                          <input
                            type="text"
                            placeholder="Intercom Code"
                            value={newAddr.doorCode}
                            onChange={(e) =>
                              setNewAddr({ ...newAddr, doorCode: e.target.value })
                            }
                            className="bg-[#09090B] border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            className="lux-btn-gold px-5 py-2 text-xs uppercase cursor-pointer"
                          >
                            Save Address
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowAddAddress(false)}
                            className="lux-btn-outline px-4 py-2 text-xs uppercase cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <button
                        onClick={() => setShowAddAddress(true)}
                        className="lux-btn-outline w-full py-3 text-xs uppercase flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-[#D4AF37]" />
                        <span>
                          {language === 'en'
                            ? 'Add New Kraków Address'
                            : 'Dodaj Nowy Adres w Krakowie'}
                        </span>
                      </button>
                    )}
                  </div>
                )}

                {/* 3. PROFILE & PHONE DETAILS */}
                {activeSection === 'profile' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1.5">
                        {language === 'en' ? 'Full Name' : 'Imię i Nazwisko'}
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={userProfile.name}
                          onChange={(e) => updateUserProfile({ name: e.target.value })}
                          className="w-full bg-[#16161C] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F5F2EB]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1.5">
                        {language === 'en' ? 'Phone Number (+48)' : 'Numer Telefonu'}
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          value={userProfile.phone}
                          onChange={(e) => updateUserProfile({ phone: e.target.value })}
                          className="w-full bg-[#16161C] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F5F2EB]"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1.5">
                        {language === 'en' ? 'Email Address' : 'Adres E-mail'}
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={userProfile.email}
                          onChange={(e) => updateUserProfile({ email: e.target.value })}
                          className="w-full bg-[#16161C] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F5F2EB]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

