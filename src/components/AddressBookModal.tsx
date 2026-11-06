import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  MapPin,
  Plus,
  Trash2,
  CheckCircle2,
  Home,
} from 'lucide-react';
import { useStore } from '../store/useStore';

export const AddressBookModal: React.FC = () => {
  const {
    language,
    isAddressModalOpen,
    setAddressModalOpen,
    savedAddresses,
    selectedAddressId,
    selectAddress,
    addAddress,
    deleteAddress,
  } = useStore();

  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({
    label: 'Home / Dom',
    fullName: 'Krzysztof Nowak',
    phone: '+48 691 234 567',
    email: 'krzysztof.nowak@example.pl',
    street: '',
    buildingNo: '',
    apartment: '',
    floor: '',
    doorCode: '',
    postalCode: '31-103',
    city: 'Kraków',
    driverNotes: '',
  });

  if (!isAddressModalOpen) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.street.trim() || !form.buildingNo.trim()) return;
    addAddress({
      ...form,
      isDefault: savedAddresses.length === 0,
      coords: [50.06 + Math.random() * 0.008, 19.932 + Math.random() * 0.008],
    });
    setShowAddForm(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#3D0B09]/75 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="bg-[#FFF4DD] border-3 border-[#3D0B09] rounded-[32px] shadow-[0_12px_0_#3D0B09] w-full max-w-2xl overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="p-5 bg-[#3D0B09] text-[#FFF4DD] border-b-3 border-[#3D0B09] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#FFC52E] text-[#3D0B09] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-xl uppercase leading-none">
                  {language === 'en'
                    ? 'Saved Kraków Delivery Addresses'
                    : 'Zapisane Adresy Dostawy w Krakowie'}
                </h3>
                <p className="text-xs text-[#FFC52E] mt-0.5">
                  {language === 'en'
                    ? '1-Click fast re-ordering to your doorstep'
                    : 'Szybkie zamawianie jednym kliknięciem'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setAddressModalOpen(false)}
              className="w-9 h-9 rounded-full bg-[#FFF4DD] text-[#3D0B09] flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            <div className="grid grid-cols-1 gap-3">
              {savedAddresses.map((addr) => {
                const active = addr.id === selectedAddressId;
                return (
                  <div
                    key={addr.id}
                    onClick={() => selectAddress(addr.id)}
                    className={`p-4 rounded-2xl border-2 flex items-start justify-between gap-3 cursor-pointer transition-all ${
                      active
                        ? 'bg-[#FBE3B5] border-[#3D0B09] shadow-[0_4px_0_#3D0B09]'
                        : 'bg-white border-[#3D0B09]/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Home className="w-5 h-5 text-[#E4291D] shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display text-base uppercase text-[#3D0B09]">
                            {addr.label}
                          </span>
                          {active && (
                            <span className="bg-[#1B7A43] text-white text-[10px] font-display uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-bold text-[#3D0B09] mt-0.5">
                          {addr.street} {addr.buildingNo}
                          {addr.apartment ? `/${addr.apartment}` : ''}, {addr.postalCode}{' '}
                          {addr.city}
                        </p>
                        <p className="text-xs text-[#3D0B09]/70 mt-0.5">
                          {addr.fullName} • {addr.phone} • Intercom: {addr.doorCode || '-'}
                        </p>
                        {addr.driverNotes && (
                          <p className="text-xs italic text-[#7A1712] mt-1">
                            “{addr.driverNotes}”
                          </p>
                        )}
                      </div>
                    </div>

                    {savedAddresses.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteAddress(addr.id);
                        }}
                        className="text-[#3D0B09]/40 hover:text-[#E4291D] p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {showAddForm ? (
              <form
                onSubmit={handleCreate}
                className="bg-white border-2 border-[#3D0B09] rounded-2xl p-4 space-y-3 shadow-[0_4px_0_#3D0B09]"
              >
                <h4 className="font-display text-sm uppercase text-[#3D0B09]">
                  {language === 'en' ? 'Add New Kraków Address' : 'Dodaj Nowy Adres'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Label (Home, Office)"
                    value={form.label}
                    onChange={(e) => setForm({ ...form, label: e.target.value })}
                    className="bg-[#FFF4DD] border-2 border-[#3D0B09] rounded-xl px-3 py-2 text-xs font-bold"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Street (e.g. ul. Dietla)"
                    value={form.street}
                    onChange={(e) => setForm({ ...form, street: e.target.value })}
                    className="bg-[#FFF4DD] border-2 border-[#3D0B09] rounded-xl px-3 py-2 text-xs font-bold sm:col-span-2"
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Building *"
                    value={form.buildingNo}
                    onChange={(e) => setForm({ ...form, buildingNo: e.target.value })}
                    className="bg-[#FFF4DD] border-2 border-[#3D0B09] rounded-xl px-3 py-2 text-xs font-bold"
                  />
                  <input
                    type="text"
                    placeholder="Apartment"
                    value={form.apartment}
                    onChange={(e) => setForm({ ...form, apartment: e.target.value })}
                    className="bg-[#FFF4DD] border-2 border-[#3D0B09] rounded-xl px-3 py-2 text-xs font-bold"
                  />
                  <input
                    type="text"
                    placeholder="Floor"
                    value={form.floor}
                    onChange={(e) => setForm({ ...form, floor: e.target.value })}
                    className="bg-[#FFF4DD] border-2 border-[#3D0B09] rounded-xl px-3 py-2 text-xs font-bold"
                  />
                  <input
                    type="text"
                    placeholder="Door Code"
                    value={form.doorCode}
                    onChange={(e) => setForm({ ...form, doorCode: e.target.value })}
                    className="bg-[#FFF4DD] border-2 border-[#3D0B09] rounded-xl px-3 py-2 text-xs font-bold"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Driver / Intercom Notes"
                  value={form.driverNotes}
                  onChange={(e) => setForm({ ...form, driverNotes: e.target.value })}
                  className="w-full bg-[#FFF4DD] border-2 border-[#3D0B09] rounded-xl px-3 py-2 text-xs font-bold"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="gv-btn-gold px-5 py-2.5 text-xs uppercase cursor-pointer"
                  >
                    {language === 'en' ? 'Save Address' : 'Zapisz Adres'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="gv-btn-cream px-4 py-2.5 text-xs uppercase cursor-pointer"
                  >
                    {language === 'en' ? 'Cancel' : 'Anuluj'}
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setShowAddForm(true)}
                className="gv-btn-gold w-full py-3.5 text-sm uppercase flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>
                  {language === 'en'
                    ? 'Add Another Kraków Address'
                    : 'Dodaj Kolejny Adres w Krakowie'}
                </span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

