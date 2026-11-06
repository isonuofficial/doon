import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MenuItem, ADD_ONS } from '../data/menuData';

export type Language = 'en' | 'pl';
export type PageView = 'home' | 'menu' | 'story' | 'contact';
export type SpiceLevelId = 'mild' | 'medium' | 'hot' | 'extra-hot';
export type FulfillmentMode = 'delivery' | 'pickup';

export interface CartItem {
  cartItemId: string;
  dish: MenuItem;
  quantity: number;
  spiceLevel: SpiceLevelId;
  servingStyle?: 'Dry' | 'Sauce';
  addOnIds: string[];
  notes: string;
  unitPrice: number;
}

export interface SavedAddress {
  id: string;
  label: string;
  isDefault: boolean;
  fullName: string;
  phone: string;
  email: string;
  street: string;
  buildingNo: string;
  apartment: string;
  floor: string;
  doorCode: string;
  postalCode: string;
  city: string;
  driverNotes: string;
  coords: [number, number];
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  memberSince: string;
  loyaltyPoints: number;
}

export interface ToastMessage {
  id: string;
  type: 'order-confirmed' | 'success' | 'info';
  title: string;
  subtitle: string;
  orderId?: string;
}

export interface OrderRecord {
  orderId: string;
  status: 'RECEIVED' | 'IN_TANDOOR' | 'PACKED' | 'ON_THE_WAY' | 'DELIVERED';
  currentStageIndex: number; // 1 to 5
  createdAt: string;
  fulfillmentType: 'Delivery' | 'Pickup';
  subtotal: number;
  deliveryFee: number;
  tip: number;
  totalAmount: number;
  paymentMethod: 'BLIK' | 'COD';
  paymentStatus: 'PAID' | 'PAY_ON_DELIVERY';
  cashChangeNeeded?: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  driverNotes?: string;
  scheduledTime?: string;
  gpsTelemetry: {
    origin: string;
    originCoords: [number, number];
    destinationCoords: [number, number];
    etaMinutes: number;
  };
  items: Array<{
    id: number;
    name: string;
    namePl: string;
    quantity: number;
    spiceLevel: SpiceLevelId;
    servingStyle?: string;
    addOns: string[];
    price: number;
  }>;
}

const INITIAL_ADDRESSES: SavedAddress[] = [
  {
    id: 'addr-001',
    label: 'Home / Dom',
    isDefault: true,
    fullName: 'Krzysztof Nowak',
    phone: '+48 691 234 567',
    email: 'krzysztof.nowak@example.pl',
    street: 'ul. Karmelicka',
    buildingNo: '14',
    apartment: '5',
    floor: '2',
    doorCode: '145K',
    postalCode: '31-131',
    city: 'Kraków',
    driverNotes: 'Proszę dzwonić domofonem, winda po prawej.',
    coords: [50.0632, 19.9318],
  },
  {
    id: 'addr-002',
    label: 'Office / Biuro (Rynek)',
    isDefault: false,
    fullName: 'Krzysztof Nowak',
    phone: '+48 691 234 567',
    email: 'krzysztof.nowak@example.pl',
    street: 'ul. Floriańska',
    buildingNo: '28',
    apartment: '12',
    floor: '3',
    doorCode: '2812#',
    postalCode: '31-021',
    city: 'Kraków',
    driverNotes: 'Wejście od dziedzińca, recepcja na 3 piętrze.',
    coords: [50.0641, 19.9409],
  },
];

const INITIAL_ORDERS: OrderRecord[] = [
  {
    orderId: 'DV-PL-831902',
    status: 'ON_THE_WAY',
    currentStageIndex: 4,
    createdAt: '2026-11-06T00:15:00Z',
    fulfillmentType: 'Delivery',
    subtotal: 108.0,
    deliveryFee: 0.0,
    tip: 10.0,
    totalAmount: 118.0,
    paymentMethod: 'BLIK',
    paymentStatus: 'PAID',
    customerName: 'Krzysztof Nowak',
    customerPhone: '+48 691 234 567',
    deliveryAddress: 'ul. Karmelicka 14/5, 31-131 Kraków',
    driverNotes: 'Proszę dzwonić domofonem, winda po prawej.',
    gpsTelemetry: {
      origin: 'Doon Valley (ul. Zwierzyniecka, Kraków)',
      originCoords: [50.0579, 19.9311],
      destinationCoords: [50.0632, 19.9318],
      etaMinutes: 12,
    },
    items: [
      {
        id: 50,
        name: 'Butter Chicken (Murgh Makhani)',
        namePl: 'Butter Chicken w Kremowym Sosie Maślanym',
        quantity: 1,
        spiceLevel: 'medium',
        addOns: ['Extra Basmati Steamed Rice'],
        price: 53.0,
      },
      {
        id: 86,
        name: 'Garlic Naan',
        namePl: 'Chlebek Naan z Czosnkiem i Masłem',
        quantity: 2,
        spiceLevel: 'mild',
        addOns: [],
        price: 40.0,
      },
      {
        id: 103,
        name: 'Mango Lassi',
        namePl: 'Kremowe Mango Lassi z Kardamonem',
        quantity: 1,
        spiceLevel: 'mild',
        addOns: [],
        price: 15.0,
      },
    ],
  },
  {
    orderId: 'DV-PL-710485',
    status: 'DELIVERED',
    currentStageIndex: 5,
    createdAt: '2026-11-02T19:20:00Z',
    fulfillmentType: 'Delivery',
    subtotal: 127.0,
    deliveryFee: 0.0,
    tip: 5.0,
    totalAmount: 132.0,
    paymentMethod: 'COD',
    paymentStatus: 'PAID',
    customerName: 'Krzysztof Nowak',
    customerPhone: '+48 691 234 567',
    deliveryAddress: 'ul. Karmelicka 14/5, 31-131 Kraków',
    gpsTelemetry: {
      origin: 'Doon Valley (ul. Zwierzyniecka, Kraków)',
      originCoords: [50.0579, 19.9311],
      destinationCoords: [50.0632, 19.9318],
      etaMinutes: 0,
    },
    items: [
      {
        id: 76,
        name: 'Chicken Biryani',
        namePl: 'Królewskie Biryani z Kurczakiem i Miętą',
        quantity: 1,
        spiceLevel: 'hot',
        addOns: ['Traditional Mint Chutney'],
        price: 50.0,
      },
      {
        id: 3,
        name: 'Chicken Tikka',
        namePl: 'Kurczak Tikka z Pieca Tandoor (6 szt.)',
        quantity: 1,
        spiceLevel: 'medium',
        addOns: [],
        price: 40.0,
      },
      {
        id: 29,
        name: 'Daal Makhani',
        namePl: 'Kremowa Czarna Soczewica Daal Makhani',
        quantity: 1,
        spiceLevel: 'mild',
        addOns: [],
        price: 37.0,
      },
    ],
  },
];

interface AppState {
  language: Language;
  activePage: PageView;
  selectedCategory: string;
  cart: CartItem[];
  fulfillmentMode: FulfillmentMode;
  tip: number;

  // User Auth & Profile
  isLoggedIn: boolean;
  userProfile: UserProfile;
  savedAddresses: SavedAddress[];
  selectedAddressId: string;
  orders: OrderRecord[];
  trackedOrderId: string;

  // Toast Pop-up Notification
  activeToast: ToastMessage | null;

  // Modals
  customizingDish: MenuItem | null;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isRadarOpen: boolean;
  isAddressModalOpen: boolean;
  isProfileModalOpen: boolean;

  // Actions
  setLanguage: (lang: Language) => void;
  setActivePage: (page: PageView) => void;
  setSelectedCategory: (cat: string) => void;
  openCustomizeModal: (dish: MenuItem) => void;
  closeCustomizeModal: () => void;
  setCartOpen: (open: boolean) => void;
  setCheckoutOpen: (open: boolean) => void;
  setRadarOpen: (open: boolean, orderId?: string) => void;
  setAddressModalOpen: (open: boolean) => void;
  setProfileModalOpen: (open: boolean) => void;
  setFulfillmentMode: (mode: FulfillmentMode) => void;
  setTip: (tip: number) => void;

  // Auth Actions
  loginUser: (data: { name: string; phone: string; email: string }) => void;
  logoutUser: () => void;
  updateUserProfile: (data: Partial<UserProfile>) => void;

  // Toast Actions
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  dismissToast: () => void;

  // Cart Actions
  addToCart: (params: {
    dish: MenuItem;
    quantity: number;
    spiceLevel: SpiceLevelId;
    servingStyle?: 'Dry' | 'Sauce';
    addOnIds: string[];
    notes: string;
  }) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;

  // Address Actions
  addAddress: (addr: Omit<SavedAddress, 'id'>) => string;
  selectAddress: (id: string) => void;
  deleteAddress: (id: string) => void;

  // Order Actions
  placeOrder: (orderData: {
    paymentMethod: 'BLIK' | 'COD';
    cashChangeNeeded?: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    deliveryAddress: string;
    driverNotes?: string;
    scheduledTime?: string;
    destinationCoords?: [number, number];
  }) => OrderRecord;
  advanceOrderStage: (orderId: string) => void;
  setOrderStage: (orderId: string, stageIndex: number) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      language: 'en',
      activePage: 'home',
      selectedCategory: 'all',
      cart: [
        {
          cartItemId: 'initial-butter-chicken',
          dish: {
            id: 50,
            category: 'chicken-curries',
            name: 'Butter Chicken (Murgh Makhani)',
            namePl: 'Butter Chicken w Kremowym Sosie Maślanym',
            description:
              'Tender tandoor-roasted chicken simmered in a rich, velvety tomato and butter sauce with cashew paste & cream.',
            descriptionPl:
              'Delikatne kawałki kurczaka w bogatym, kremowym sosie pomidorowo-maślanym z aromatycznymi indyjskimi przyprawami.',
            price: 45.0,
            currency: 'PLN',
            tags: ['Chef Special', 'Halal', 'Gluten-Free'],
            badgeLabel: '#1 Top Pick',
            isSpiceCustomizable: true,
            isBestseller: true,
            image:
              'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
          },
          quantity: 1,
          spiceLevel: 'medium',
          addOnIds: ['rice'],
          notes: '',
          unitPrice: 53.0,
        },
        {
          cartItemId: 'initial-garlic-naan',
          dish: {
            id: 86,
            category: 'tandoori-breads',
            name: 'Garlic Naan',
            namePl: 'Chlebek Naan z Czosnkiem i Masłem',
            description:
              'Leavened tandoor-baked flatbread brushed with melted butter, roasted garlic, and fresh cilantro.',
            descriptionPl:
              'Drożdżowy placek pieczony w tandoorze, posmarowany masłem i czosnkiem — miękki, dymny i aromatyczny.',
            price: 20.0,
            currency: 'PLN',
            tags: ['Chef Special', 'Vegetarian'],
            badgeLabel: 'Must-Order Bread',
            isSpiceCustomizable: false,
            isBestseller: true,
            image:
              'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80',
          },
          quantity: 2,
          spiceLevel: 'medium',
          addOnIds: [],
          notes: '',
          unitPrice: 20.0,
        },
      ],
      fulfillmentMode: 'delivery',
      tip: 5,

      isLoggedIn: true,
      userProfile: {
        name: 'Krzysztof Nowak',
        phone: '+48 691 234 567',
        email: 'krzysztof.nowak@example.pl',
        memberSince: 'Royal VIP Member • Kraków',
        loyaltyPoints: 420,
      },
      savedAddresses: INITIAL_ADDRESSES,
      selectedAddressId: 'addr-001',
      orders: INITIAL_ORDERS,
      trackedOrderId: 'DV-PL-831902',

      activeToast: null,

      customizingDish: null,
      isCartOpen: false,
      isCheckoutOpen: false,
      isRadarOpen: false,
      isAddressModalOpen: false,
      isProfileModalOpen: false,

      setLanguage: (language) => set({ language }),
      setActivePage: (activePage) => {
        set({ activePage });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
      openCustomizeModal: (dish) => set({ customizingDish: dish }),
      closeCustomizeModal: () => set({ customizingDish: null }),
      setCartOpen: (isCartOpen) => set({ isCartOpen }),
      setCheckoutOpen: (isCheckoutOpen) => set({ isCheckoutOpen }),
      setRadarOpen: (isRadarOpen, orderId) =>
        set((state) => ({
          isRadarOpen,
          trackedOrderId: orderId || state.trackedOrderId,
        })),
      setAddressModalOpen: (isAddressModalOpen) => set({ isAddressModalOpen }),
      setProfileModalOpen: (isProfileModalOpen) => set({ isProfileModalOpen }),
      setFulfillmentMode: (fulfillmentMode) => set({ fulfillmentMode }),
      setTip: (tip) => set({ tip }),

      loginUser: ({ name, phone, email }) => {
        set({
          isLoggedIn: true,
          userProfile: {
            name: name || 'Krzysztof Nowak',
            phone: phone || '+48 691 234 567',
            email: email || 'krzysztof.nowak@example.pl',
            memberSince: 'Royal VIP Member • Kraków',
            loyaltyPoints: 420,
          },
        });
        get().showToast({
          type: 'success',
          title:
            get().language === 'en'
              ? `Welcome back, ${name || 'Krzysztof'}!`
              : `Witamy ponownie, ${name || 'Krzysztof'}!`,
          subtitle:
            get().language === 'en'
              ? 'Your saved Kraków addresses and order history are ready.'
              : 'Twoje zapisane adresy i historia zamówień są aktywne.',
        });
      },

      logoutUser: () => {
        set({ isLoggedIn: false });
        get().showToast({
          type: 'info',
          title:
            get().language === 'en'
              ? 'Logged Out Successfully'
              : 'Wylogowano Pomyślnie',
          subtitle:
            get().language === 'en'
              ? 'Log in anytime to access your saved addresses & order history.'
              : 'Zaloguj się ponownie, aby zobaczyć historię zamówień.',
        });
      },

      updateUserProfile: (data) =>
        set((state) => ({
          userProfile: { ...state.userProfile, ...data },
        })),

      showToast: (toast) => {
        const id = `toast-${Date.now()}`;
        set({ activeToast: { ...toast, id } });
      },

      dismissToast: () => set({ activeToast: null }),

      addToCart: ({ dish, quantity, spiceLevel, servingStyle, addOnIds, notes }) => {
        const addOnsTotal = addOnIds.reduce((sum, id) => {
          const found = ADD_ONS.find((a) => a.id === id);
          return sum + (found ? found.price : 0);
        }, 0);
        const unitPrice = dish.price + addOnsTotal;
        const signature = `${dish.id}-${spiceLevel}-${servingStyle || ''}-${[
          ...addOnIds,
        ]
          .sort()
          .join(',')}-${notes.trim()}`;

        set((state) => {
          const existingIndex = state.cart.findIndex(
            (item) => item.cartItemId === signature
          );
          if (existingIndex > -1) {
            const updated = [...state.cart];
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: updated[existingIndex].quantity + quantity,
            };
            return { cart: updated, customizingDish: null };
          }
          return {
            cart: [
              ...state.cart,
              {
                cartItemId: signature,
                dish,
                quantity,
                spiceLevel,
                servingStyle,
                addOnIds,
                notes: notes.trim(),
                unitPrice,
              },
            ],
            customizingDish: null,
          };
        });

        get().showToast({
          type: 'success',
          title:
            get().language === 'en'
              ? `Added ${quantity}x ${dish.name} to Bag`
              : `Dodano ${quantity}x ${dish.namePl} do Koszyka`,
          subtitle: `${(unitPrice * quantity).toFixed(2)} zł • Spice: ${spiceLevel.toUpperCase()}`,
        });
      },

      updateCartQuantity: (cartItemId, delta) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.cartItemId === cartItemId
                ? { ...item, quantity: item.quantity + delta }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      removeFromCart: (cartItemId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.cartItemId !== cartItemId),
        })),

      clearCart: () => set({ cart: [] }),

      addAddress: (addr) => {
        const newId = `addr-${Date.now()}`;
        const newAddr: SavedAddress = { ...addr, id: newId };
        set((state) => ({
          savedAddresses: addr.isDefault
            ? [...state.savedAddresses.map((a) => ({ ...a, isDefault: false })), newAddr]
            : [...state.savedAddresses, newAddr],
          selectedAddressId: newId,
        }));
        return newId;
      },

      selectAddress: (selectedAddressId) => set({ selectedAddressId }),

      deleteAddress: (id) =>
        set((state) => {
          const remaining = state.savedAddresses.filter((a) => a.id !== id);
          return {
            savedAddresses: remaining,
            selectedAddressId:
              state.selectedAddressId === id && remaining.length > 0
                ? remaining[0].id
                : state.selectedAddressId,
          };
        }),

      placeOrder: ({
        paymentMethod,
        cashChangeNeeded,
        customerName,
        customerPhone,
        deliveryAddress,
        driverNotes,
        scheduledTime,
        destinationCoords,
      }) => {
        const state = get();
        const subtotal = state.cart.reduce(
          (s, item) => s + item.unitPrice * item.quantity,
          0
        );
        const deliveryFee =
          state.fulfillmentMode === 'pickup' || subtotal >= 100 ? 0 : 8.0;
        const totalAmount = subtotal + deliveryFee + state.tip;

        const randomDigits = Math.floor(100000 + Math.random() * 900000);
        const orderId = `DV-PL-${randomDigits}`;

        const newOrder: OrderRecord = {
          orderId,
          status: 'IN_TANDOOR',
          currentStageIndex: 2,
          createdAt: new Date().toISOString(),
          fulfillmentType:
            state.fulfillmentMode === 'delivery' ? 'Delivery' : 'Pickup',
          subtotal,
          deliveryFee,
          tip: state.tip,
          totalAmount,
          paymentMethod,
          paymentStatus: paymentMethod === 'BLIK' ? 'PAID' : 'PAY_ON_DELIVERY',
          cashChangeNeeded,
          customerName,
          customerPhone,
          deliveryAddress:
            state.fulfillmentMode === 'pickup'
              ? 'Pickup: Doon Valley, ul. Zwierzyniecka, Kraków'
              : deliveryAddress,
          driverNotes,
          scheduledTime,
          gpsTelemetry: {
            origin: 'Doon Valley (ul. Zwierzyniecka, Kraków)',
            originCoords: [50.0579, 19.9311],
            destinationCoords: destinationCoords || [50.0632, 19.9318],
            etaMinutes: state.fulfillmentMode === 'pickup' ? 20 : 35,
          },
          items: state.cart.map((item) => ({
            id: item.dish.id,
            name: item.dish.name,
            namePl: item.dish.namePl,
            quantity: item.quantity,
            spiceLevel: item.spiceLevel,
            servingStyle: item.servingStyle,
            addOns: item.addOnIds
              .map((aid) => ADD_ONS.find((a) => a.id === aid)?.name || '')
              .filter(Boolean),
            price: item.unitPrice * item.quantity,
          })),
        };

        set((s) => ({
          orders: [newOrder, ...s.orders],
          trackedOrderId: orderId,
          cart: [],
          userProfile: {
            ...s.userProfile,
            loyaltyPoints: s.userProfile.loyaltyPoints + Math.round(totalAmount),
          },
        }));

        // Pop-up Confirmation Notification!
        get().showToast({
          type: 'order-confirmed',
          title:
            state.language === 'en'
              ? `Order Confirmed! (#${orderId})`
              : `Zamówienie Potwierdzone! (#${orderId})`,
          subtitle:
            state.language === 'en'
              ? `Your feast (${totalAmount.toFixed(2)} zł via ${paymentMethod}) is now in our clay tandoor!`
              : `Twoje zamówienie (${totalAmount.toFixed(2)} zł • ${paymentMethod}) trafiło do pieca tandoor!`,
          orderId,
        });

        return newOrder;
      },

      advanceOrderStage: (orderId) =>
        set((state) => ({
          orders: state.orders.map((o) => {
            if (o.orderId !== orderId) return o;
            const nextIndex = o.currentStageIndex >= 5 ? 1 : o.currentStageIndex + 1;
            const statusMap: Record<number, OrderRecord['status']> = {
              1: 'RECEIVED',
              2: 'IN_TANDOOR',
              3: 'PACKED',
              4: 'ON_THE_WAY',
              5: 'DELIVERED',
            };
            const etaMap: Record<number, number> = {
              1: 40,
              2: 32,
              3: 22,
              4: 11,
              5: 0,
            };
            return {
              ...o,
              currentStageIndex: nextIndex,
              status: statusMap[nextIndex],
              gpsTelemetry: {
                ...o.gpsTelemetry,
                etaMinutes: etaMap[nextIndex],
              },
            };
          }),
        })),

      setOrderStage: (orderId, stageIndex) =>
        set((state) => ({
          orders: state.orders.map((o) => {
            if (o.orderId !== orderId) return o;
            const statusMap: Record<number, OrderRecord['status']> = {
              1: 'RECEIVED',
              2: 'IN_TANDOOR',
              3: 'PACKED',
              4: 'ON_THE_WAY',
              5: 'DELIVERED',
            };
            const etaMap: Record<number, number> = {
              1: 40,
              2: 32,
              3: 22,
              4: 11,
              5: 0,
            };
            return {
              ...o,
              currentStageIndex: stageIndex,
              status: statusMap[stageIndex] || 'IN_TANDOOR',
              gpsTelemetry: {
                ...o.gpsTelemetry,
                etaMinutes: etaMap[stageIndex] ?? 20,
              },
            };
          }),
        })),
    }),
    {
      name: 'doon-valley-krakow-storage-v2',
      partialize: (state) => ({
        language: state.language,
        cart: state.cart,
        fulfillmentMode: state.fulfillmentMode,
        tip: state.tip,
        isLoggedIn: state.isLoggedIn,
        userProfile: state.userProfile,
        savedAddresses: state.savedAddresses,
        selectedAddressId: state.selectedAddressId,
        orders: state.orders,
        trackedOrderId: state.trackedOrderId,
      }),
    }
  )
);
