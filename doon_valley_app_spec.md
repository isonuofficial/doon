# DOON VALLEY RESTAURANT & BAR — FULL APP SPECIFICATION & DATA BUCKET

> **Target Platform:** AI App Builder / Antigravity / Full-Stack React / Next.js  
> **Source Website:** https://doonvalley.ai.studio/  
> **Language:** English (Default) with Polish (i18n ready)  
> **Scope:** Full-stack eCommerce, digital menu, interactive customization modal, cart drawer, BLIK/COD checkout, live order radar, and address book.

---

## 1. PROJECT OVERVIEW & ARCHITECTURE

### 1.1 Brand Identity
* **Brand Name:** Doon Valley - Indian Restaurant & Bar • Halal
* **Location:** Kraków, Poland (ul. Zwierzyniecka / Old Town & Wawel Castle area)
* **Coordinates:** `50.0579° N, 19.9311° E`
* **Cuisine:** Royal North & South Indian, Clay Tandoor Specialties, Indo-Chinese Fusion
* **Certifications:** 100% Certified Halal Meat, Traditional Clay Tandoor

### 1.2 Recommended Tech Stack
* **Framework:** Next.js (App Router) or React (Vite) + TypeScript
* **Styling:** Tailwind CSS + Radix UI / shadcn/ui primitives
* **Icons:** `lucide-react`
* **State Management:** Zustand (Cart state, Customer Profile, Order Tracking)
* **Animation:** Framer Motion (Modals, Cart Drawer, Order Radar Progress)
* **Maps / GPS:** Leaflet / OpenStreetMap or Google Maps JavaScript API

### 1.3 Design System & Theme Tokens
```json
{
  "colors": {
    "primary": "#E65100",       // Deep Tandoor Amber / Saffron
    "primaryHover": "#BF360C",  // Charred Crimson
    "secondary": "#2E7D32",     // Emerald / Halal Green
    "accent": "#FFB300",        // Turmeric Gold
    "background": "#0F0F12",    // Premium Dark Slate
    "surface": "#1A1A22",       // Card / Modal Background
    "surfaceBorder": "#2A2A38", // Subtle Border
    "textPrimary": "#FFFFFF",
    "textSecondary": "#9CA3AF",
    "textMuted": "#6B7280"
  },
  "typography": {
    "fontFamilyHeading": "Playfair Display, serif",
    "fontFamilyBody": "Inter, system-ui, sans-serif"
  },
  "borderRadius": {
    "card": "16px",
    "button": "12px",
    "pill": "9999px"
  }
}
```

---

## 2. APPLICATION LAYOUT & COMPONENT TREE

```
App
├── Header (Sticky)
│   ├── Brand Logo ("DOON VALLEY")
│   ├── Navigation Menu Items
│   ├── Kraków Location Badge
│   ├── Language Switcher (EN / PL)
│   └── Cart Bag Button (with dynamic item count badge)
│
├── Hero Section
│   ├── Hero Headlines & Subtitles
│   ├── Halal, Tandoor, & 35-45m Delivery Badges
│   ├── Primary CTA ("Order Online Now") & Secondary CTA ("Track Order")
│   ├── 3 Feature Cards (BLIK/Cash, Saved Address, Tracking Code)
│   └── Location Highlight Card (ul. Zwierzyniecka, Open Status, Google Maps link)
│
├── About Us & Halal Heritage Section
│   ├── Background Story & Tandoor Oven Process
│   ├── 100% Certified Halal Sourcing Statement
│   └── Ambiance & Bar Lounge Description
│
├── Culinary Menu Catalog Section
│   ├── Search Bar (by dish name or number)
│   ├── Dietary Filter Pills (All, Vegetarian, Gluten-Free, Chef Specials, Halal)
│   ├── 12 Category Navigation Carousel / Tabs
│   └── Dish Grid Cards (Image, Title, Price, Description, Tags, "Add" button)
│
├── Modals & Drawers (Global)
│   ├── Dish Customization Modal (Spice Level, Add-ons, Kitchen Notes)
│   ├── Cart Drawer (Bag items, Delivery/Pickup toggle, Free Delivery bar, Tip selector)
│   ├── Checkout Modal (Contact details, Address selector, Timing, BLIK / COD)
│   ├── Live Order Radar Modal (Tracking ID lookup, 5-stage progress bar, Kraków GPS map)
│   └── Customer Account Modal (Saved Addresses & Order History)
│
└── Footer
    ├── Brand & Social Links
    ├── Opening Hours (Mon-Sun: 11:30 - 22:30)
    ├── Contact Coordinates & Phone
    └── BLIK, COD & Halal Trust Badges
```

---

## 3. MASTER DATA SCHEMAS & DATABASE

### 3.1 Menu Categories (12 Categories)
```json
[
  { "id": "all", "name": "All Items", "count": 93 },
  { "id": "tandoori-starters", "name": "Tandoori & Starters" },
  { "id": "appetizers-snacks", "name": "Appetizers & Snacks" },
  { "id": "soups-lentils", "name": "Soups & Lentils" },
  { "id": "indo-chinese", "name": "Indo-Chinese Fusion" },
  { "id": "veg-curries", "name": "Vegetarian Curries" },
  { "id": "chicken-curries", "name": "Chicken Curries" },
  { "id": "lamb-seafood", "name": "Lamb & Seafood" },
  { "id": "biryani-rice", "name": "Biryani & Rice" },
  { "id": "tandoori-breads", "name": "Tandoori Breads" },
  { "id": "raita-salads", "name": "Raita & Salads" },
  { "id": "desserts-drinks", "name": "Lassi, Teas & Desserts" }
]
```

### 3.2 Menu Catalog Items (Realistic Dataset)
```json
[
  {
    "id": 1,
    "category": "tandoori-starters",
    "name": "Roasted Papadam",
    "description": "Thin, crispy roasted Indian lentil wafers, served with traditional Indian chutney. 2 pcs",
    "price": 12.00,
    "currency": "PLN",
    "tags": ["Gluten-Free", "Vegetarian"],
    "isSpiceCustomizable": false,
    "image": "/images/menu/roasted-papadam.jpg"
  },
  {
    "id": 2,
    "category": "tandoori-starters",
    "name": "Masala Papadam",
    "description": "Crispy roasted papad topped with chopped onions, tomatoes, coriander and Indian spices. 2 pcs",
    "price": 15.00,
    "currency": "PLN",
    "tags": ["Gluten-Free", "Vegetarian"],
    "isSpiceCustomizable": true,
    "image": "/images/menu/masala-papadam.jpg"
  },
  {
    "id": 3,
    "category": "tandoori-starters",
    "name": "Chicken Tikka",
    "description": "Tender boneless chicken pieces marinated in yogurt and Indian spices, grilled in a traditional tandoor. 6 pcs",
    "price": 40.00,
    "currency": "PLN",
    "tags": ["Chef Special", "Gluten-Free", "Halal"],
    "isSpiceCustomizable": true,
    "image": "/images/menu/chicken-tikka.jpg"
  },
  {
    "id": 4,
    "category": "tandoori-starters",
    "name": "Tandoori Chicken",
    "description": "Chicken marinated in yogurt and aromatic Indian spices, roasted in a traditional clay oven (tandoor). 4 pcs",
    "price": 45.00,
    "currency": "PLN",
    "tags": ["Chef Special", "Gluten-Free", "Halal"],
    "isSpiceCustomizable": true,
    "image": "/images/menu/tandoori-chicken.jpg"
  },
  {
    "id": 5,
    "category": "tandoori-starters",
    "name": "Chicken Malai Tikka",
    "description": "Tender boneless chicken marinated in yogurt, cream and mild Indian spices, grilled in a traditional tandoor. 6 pcs",
    "price": 42.00,
    "currency": "PLN",
    "tags": ["Gluten-Free", "Halal"],
    "isSpiceCustomizable": true,
    "image": "/images/menu/malai-tikka.jpg"
  },
  {
    "id": 6,
    "category": "tandoori-starters",
    "name": "Garlic Chicken Tikka",
    "description": "Tender boneless chicken marinated in garlic, yogurt and Indian spices, grilled in a traditional tandoor. 6 pcs",
    "price": 42.00,
    "currency": "PLN",
    "tags": ["Gluten-Free", "Halal"],
    "isSpiceCustomizable": true,
    "image": "/images/menu/garlic-chicken-tikka.jpg"
  },
  {
    "id": 7,
    "category": "tandoori-starters",
    "name": "Lamb Seekh Kebab",
    "description": "Juicy minced lamb mixed with aromatic Indian spices and herbs, grilled on skewers in a traditional tandoor. 6 pcs",
    "price": 47.00,
    "currency": "PLN",
    "tags": ["Halal", "Gluten-Free"],
    "isSpiceCustomizable": true,
    "image": "/images/menu/lamb-seekh.jpg"
  },
  {
    "id": 8,
    "category": "tandoori-starters",
    "name": "Fish Tikka",
    "description": "Tender boneless fish pieces marinated in yogurt and aromatic Indian spices, grilled in a traditional tandoor. 6 pcs",
    "price": 45.00,
    "currency": "PLN",
    "tags": ["Gluten-Free"],
    "isSpiceCustomizable": true,
    "image": "/images/menu/fish-tikka.jpg"
  },
  {
    "id": 9,
    "category": "tandoori-starters",
    "name": "Tandoori Prawns",
    "description": "Juicy prawns marinated in yogurt and aromatic Indian spices, grilled in a traditional tandoor. 8 pcs",
    "price": 47.00,
    "currency": "PLN",
    "tags": ["Gluten-Free"],
    "isSpiceCustomizable": true,
    "image": "/images/menu/tandoori-prawns.jpg"
  },
  {
    "id": 10,
    "category": "tandoori-starters",
    "name": "Paneer Tikka",
    "description": "Soft cottage cheese cubes marinated in yogurt and aromatic Indian spices, grilled in a traditional tandoor. 6 pcs",
    "price": 37.00,
    "currency": "PLN",
    "tags": ["Vegetarian", "Gluten-Free"],
    "isSpiceCustomizable": true,
    "image": "/images/menu/paneer-tikka.jpg"
  },
  {
    "id": 11,
    "category": "tandoori-starters",
    "name": "Malai Paneer Tikka",
    "description": "Soft paneer cubes marinated in cashew cream, yogurt and mild Indian spices, grilled in a traditional tandoor. 6 pcs",
    "price": 40.00,
    "currency": "PLN",
    "tags": ["Vegetarian", "Gluten-Free"],
    "isSpiceCustomizable": true,
    "image": "/images/menu/malai-paneer-tikka.jpg"
  },
  {
    "id": 12,
    "category": "tandoori-starters",
    "name": "Tandoori Broccoli",
    "description": "Fresh broccoli florets marinated in yogurt and mild Indian spices, grilled in a traditional tandoor. 6 pcs",
    "price": 38.00,
    "currency": "PLN",
    "tags": ["Vegetarian", "Gluten-Free"],
    "isSpiceCustomizable": true,
    "image": "/images/menu/tandoori-broccoli.jpg"
  },
  {
    "id": 13,
    "category": "appetizers-snacks",
    "name": "Chicken Pakora",
    "description": "Tender chicken pieces coated in a spiced chickpea flour batter and deep-fried until golden and crispy.",
    "price": 30.00,
    "currency": "PLN",
    "tags": ["Chef Special", "Halal"],
    "isSpiceCustomizable": false,
    "image": "/images/menu/chicken-pakora.jpg"
  },
  {
    "id": 16,
    "category": "appetizers-snacks",
    "name": "Vegetable Pakoras",
    "description": "Assorted seasonal vegetables in spiced chickpea batter — crispy, rustic, and satisfying.",
    "price": 25.00,
    "currency": "PLN",
    "tags": ["Vegetarian"],
    "isSpiceCustomizable": false,
    "image": "/images/menu/veg-pakora.jpg"
  },
  {
    "id": 17,
    "category": "appetizers-snacks",
    "name": "Paneer Pakora",
    "description": "Deep-fried cottage cheese dipped in spiced gram flour batter.",
    "price": 28.00,
    "currency": "PLN",
    "tags": ["Vegetarian"],
    "isSpiceCustomizable": false,
    "image": "/images/menu/paneer-pakora.jpg"
  },
  {
    "id": 18,
    "category": "appetizers-snacks",
    "name": "Chicken Samosas",
    "description": "Crisp pastry filled with spiced minced chicken, onions, and garlic — golden and flavour-packed. 2 pcs",
    "price": 22.00,
    "currency": "PLN",
    "tags": ["Halal"],
    "isSpiceCustomizable": false,
    "image": "/images/menu/chicken-samosa.jpg"
  },
  {
    "id": 41,
    "category": "veg-curries",
    "name": "Butter Paneer",
    "description": "Cottage cheese cubes in a thick, velvety tomato-butter gravy finished with cream and fenugreek.",
    "price": 40.00,
    "currency": "PLN",
    "tags": ["Chef Special", "Vegetarian", "Gluten-Free"],
    "isSpiceCustomizable": true,
    "image": "/images/menu/butter-paneer.jpg"
  },
  {
    "id": 42,
    "category": "veg-curries",
    "name": "Palak Paneer",
    "description": "Paneer cubes simmered in a velvety sauce of fresh spinach, garlic, cumin, and mild spices.",
    "price": 40.00,
    "currency": "PLN",
    "tags": ["Vegetarian", "Gluten-Free"],
    "isSpiceCustomizable": true,
    "image": "/images/menu/palak-paneer.jpg"
  },
  {
    "id": 43,
    "category": "veg-curries",
    "name": "Kadhai Paneer",
    "description": "Paneer with bell peppers and onions tossed in a crushed coriander and tomato kadhai gravy.",
    "price": 38.00,
    "currency": "PLN",
    "tags": ["Vegetarian", "Gluten-Free"],
    "isSpiceCustomizable": true,
    "image": "/images/menu/kadhai-paneer.jpg"
  },
  {
    "id": 46,
    "category": "veg-curries",
    "name": "Chana Masala",
    "description": "White chickpeas simmered with onions, tomatoes, ginger, and authentic Punjabi garam masala.",
    "price": 40.00,
    "currency": "PLN",
    "tags": ["Vegetarian", "Gluten-Free"],
    "isSpiceCustomizable": true,
    "image": "/images/menu/chana-masala.jpg"
  },
  {
    "id": 50,
    "category": "chicken-curries",
    "name": "Butter Chicken (Murgh Makhani)",
    "description": "Tender tandoor-roasted chicken in a rich, buttery tomato sauce enriched with cashew paste and cream.",
    "price": 45.00,
    "currency": "PLN",
    "tags": ["Chef Special", "Halal", "Gluten-Free"],
    "isSpiceCustomizable": true,
    "image": "/images/menu/butter-chicken.jpg"
  },
  {
    "id": 51,
    "category": "chicken-curries",
    "name": "Chicken Tikka Masala",
    "description": "Charred chicken tikka chunks cooked in a spiced, zesty onion and tomato cream gravy.",
    "price": 45.00,
    "currency": "PLN",
    "tags": ["Chef Special", "Halal", "Gluten-Free"],
    "isSpiceCustomizable": true,
    "image": "/images/menu/chicken-tikka-masala.jpg"
  },
  {
    "id": 52,
    "category": "chicken-curries",
    "name": "Doon Valley House Special Chicken",
    "description": "Chef's signature chicken curry with roasted garlic, shallots, crushed peppercorn, and rich brown gravy.",
    "price": 48.00,
    "currency": "PLN",
    "tags": ["Chef Special", "Halal", "Gluten-Free"],
    "isSpiceCustomizable": true,
    "image": "/images/menu/doon-special-chicken.jpg"
  },
  {
    "id": 54,
    "category": "chicken-curries",
    "name": "Chicken Mango",
    "description": "Tender chicken simmered in a luscious sweet mango and cashew cream sauce.",
    "price": 45.00,
    "currency": "PLN",
    "tags": ["Halal", "Gluten-Free"],
    "isSpiceCustomizable": true,
    "image": "/images/menu/chicken-mango.jpg"
  },
  {
    "id": 55,
    "category": "chicken-curries",
    "name": "Chicken Vindaloo",
    "description": "Fiery Goan curry: chicken in a bold garlic-vinegar chili paste with diced potatoes.",
    "price": 45.00,
    "currency": "PLN",
    "tags": ["Halal", "Gluten-Free"],
    "isSpiceCustomizable": true,
    "image": "/images/menu/chicken-vindaloo.jpg"
  },
  {
    "id": 76,
    "category": "biryani-rice",
    "name": "Chicken Biryani",
    "description": "Aromatic aged basmati rice dum-cooked with tender spiced chicken, saffron, fried onions, and mint.",
    "price": 45.00,
    "currency": "PLN",
    "tags": ["Halal", "Chef Special"],
    "isSpiceCustomizable": true,
    "image": "/images/menu/chicken-biryani.jpg"
  },
  {
    "id": 86,
    "category": "tandoori-breads",
    "name": "Garlic Naan",
    "description": "Classic leavened flatbread baked against the tandoor wall, brushed with garlic butter and fresh cilantro.",
    "price": 14.00,
    "currency": "PLN",
    "tags": ["Vegetarian"],
    "isSpiceCustomizable": false,
    "image": "/images/menu/garlic-naan.jpg"
  },
  {
    "id": 87,
    "category": "tandoori-breads",
    "name": "Butter Naan",
    "description": "Traditional tandoori flatbread layered with pure melted butter.",
    "price": 12.00,
    "currency": "PLN",
    "tags": ["Vegetarian"],
    "isSpiceCustomizable": false,
    "image": "/images/menu/butter-naan.jpg"
  },
  {
    "id": 103,
    "category": "desserts-drinks",
    "name": "Mango Lassi",
    "description": "Chilled traditional yogurt beverage blended with sweet Alphonso mango pulp and cardamom.",
    "price": 15.00,
    "currency": "PLN",
    "tags": ["Vegetarian", "Gluten-Free"],
    "isSpiceCustomizable": false,
    "image": "/images/menu/mango-lassi.jpg"
  }
]
```

### 3.3 Customization Options Schema
```json
{
  "spiceLevels": [
    { "id": "mild", "label": "Mild", "desc": "Gentle creamy spices" },
    { "id": "medium", "label": "Medium", "desc": "Traditional authentic heat", "default": true },
    { "id": "hot", "label": "Hot", "desc": "Bold chili warmth" },
    { "id": "extra-hot", "label": "Extra Hot", "desc": "True fiery Indian spice" }
  ],
  "addOns": [
    { "id": "rice", "name": "Extra Basmati Steamed Rice", "price": 8.00 },
    { "id": "garlic-butter", "name": "Garlic Butter Glaze", "price": 4.00 },
    { "id": "mint-chutney", "name": "Traditional Mint Chutney", "price": 5.00 },
    { "id": "mango-chutney", "name": "Sweet Mango Chutney", "price": 5.00 },
    { "id": "pickled-onion", "name": "Spiced Pickled Red Onions", "price": 4.00 }
  ]
}
```

### 3.4 Customer Account & Address Book Schema
```json
{
  "customer": {
    "name": "Krzysztof Nowak",
    "phone": "+48 691 234 567",
    "email": "krzysztof.nowak@example.pl"
  },
  "savedAddresses": [
    {
      "id": "addr-001",
      "label": "Home / Dom",
      "isDefault": true,
      "street": "ul. Karmelicka",
      "buildingNo": "14",
      "apartment": "5",
      "floor": "2",
      "doorCode": "145K",
      "postalCode": "31-131",
      "city": "Kraków",
      "driverNotes": "Proszę dzwonić domofonem, winda po prawej."
    }
  ]
}
```

### 3.5 Order Tracking & History Schema
```json
{
  "activeOrder": {
    "orderId": "DV-PL-831902",
    "status": "DELIVERED",
    "createdAt": "2026-11-04T00:04:00Z",
    "fulfillmentType": "Delivery",
    "totalAmount": 118.00,
    "paymentMethod": "BLIK",
    "paymentStatus": "PAID",
    "deliveryAddress": "ul. Karmelicka 14/5, Kraków",
    "gpsTelemetry": {
      "origin": "Doon Valley (ul. Zwierzyniecka)",
      "originCoords": [50.0579, 19.9311],
      "destinationCoords": [50.0632, 19.9318],
      "etaMinutes": 35
    },
    "stages": [
      { "id": 1, "name": "Received", "completed": true },
      { "id": 2, "name": "In Tandoor & Woks", "completed": true },
      { "id": 3, "name": "Thermal Packed", "completed": true },
      { "id": 4, "name": "On the Way", "completed": true },
      { "id": 5, "name": "Delivered", "completed": true }
    ],
    "items": [
      {
        "id": 50,
        "name": "Butter Chicken (Murgh Makhani)",
        "quantity": 1,
        "spiceLevel": "medium",
        "addOns": ["Extra Basmati Steamed Rice"],
        "price": 53.00
      },
      {
        "id": 86,
        "name": "Garlic Naan",
        "quantity": 2,
        "spiceLevel": "mild",
        "addOns": [],
        "price": 40.00
      },
      {
        "id": 103,
        "name": "Mango Lassi",
        "quantity": 1,
        "spiceLevel": "mild",
        "addOns": [],
        "price": 15.00
      }
    ]
  }
}
```

---

## 4. UI STATE LOGIC & BUSINESS RULES

### 4.1 Cart & Pricing Rules
* **Currency:** Polish Złoty (`zł` / `PLN`).
* **Delivery Fee:** Standard base fee = `8.00 zł`.
* **Free Delivery Threshold:** `100.00 zł`.
  * If `subtotal < 100`: `deliveryFee = 8.00`, show prompt: `"Add ${(100 - subtotal).toFixed(2)} zł more for Free Delivery!"`.
  * If `subtotal >= 100` or `fulfillmentMode === 'pickup'`: `deliveryFee = 0.00`.
* **Tip Options:** `0 zł`, `5 zł`, `10 zł`, `15 zł`.
* **Calculation:** `finalTotal = subtotal + deliveryFee + tip`.

### 4.2 Payment Gateways
1. **BLIK Payment:**
   * 6-digit numeric input with auto-tab or combined field.
   * Regex validator: `/^\d{6}$/`.
   * Simulate bank confirmation timer (30 seconds) on submission.
2. **Cash on Delivery (COD):**
   * Change requirement dropdown: `Exact Amount`, `Change from 100 zł`, `Change from 200 zł`.

---

## 5. COMPLETE VERBATIM COPY BUCKET (ENGLISH & POLISH)

| Element / Key | English (Default) | Polish (Original) |
| :--- | :--- | :--- |
| **Header Badge** | `INDYJSKA RESTAURACJA & BAR • HALAL` | `INDYJSKA RESTAURACJA & BAR • HALAL` |
| **Hero Eyebrow** | `KRAKÓW • AUTHENTIC DINING & FAST DELIVERY` | `KRAKÓW • AUTHENTIC DINING & FAST DELIVERY` |
| **Hero Title** | `AUTHENTIC ROYAL TASTE OF INDIA IN KRAKÓW` | `AUTENTYCZNY KRÓLEWSKI SMAK INDII W KRAKOWIE` |
| **Hero Subtitle** | `Charred clay-oven naans, slow-simmered rich curries, and fragrant saffron biryani. Pay seamlessly via BLIK or Cash on Delivery.` | `Świeżo pieczone chlebki naan z pieca tandoor, aromatyczne biryani oraz kremowe curries. Płać wygodnie kodem BLIK lub gotówką przy odbiorze.` |
| **Badge 1** | `100% Certified Halal Meat` | `100% Certyfikowane Mięso Halal` |
| **Badge 2** | `Clay Tandoor Oven` | `Piec Tandoor` |
| **Badge 3** | `35–45 min delivery in Kraków` | `Dostawa 35–45 min w Krakowie` |
| **Primary CTA** | `Order Online Now` | `Zamów Online Teraz ->` |
| **Secondary CTA** | `Track an Existing Order` | `Śledź Aktywne Zamówienie` |
| **Card 1 Title** | `BLIK & Cash` | `BLIK & Gotówka` |
| **Card 1 Sub** | `Pay via banking app or cash upon delivery` | `Wygodna płatność w banku lub u kuriera` |
| **Card 2 Title** | `Saved Address` | `Zapisany Adres` |
| **Card 2 Sub** | `Fast 1-click re-ordering to saved address` | `Szybkie zamawianie pod zapamiętany adres` |
| **Card 3 Title** | `Tracking Code` | `Kod Śledzenia` |
| **Card 3 Sub** | `Auto tracking ID with live kitchen radar` | `Automatyczny tracking z podglądem trasy` |
| **Location Card** | `Doon Valley Indian Restaurant & Bar • Open` | `Doon Valley Indian Restaurant & Bar • OTWARTA` |
| **Address** | `ul. Zwierzyniecka, Kraków (Near Wawel Castle)` | `ul. Zwierzyniecka, Kraków (Blisko Wawelu)` |
| **Operating Hours**| `Monday – Sunday: 11:30 – 22:30` | `Poniedziałek – Niedziela: 11:30 – 22:30` |
| **Phone** | `+48 691 234 567` | `+48 691 234 567` |
| **Delivery Time** | `35–45 min delivery / 20 min pickup` | `35–45 min dostawa / 20 min odbiór` |
| **Tracking Stage 1**| `Received` | `Przyjęte` |
| **Tracking Stage 2**| `In Tandoor & Woks` | `W Piecu Tandoor` |
| **Tracking Stage 3**| `Thermal Packed` | `Spakowane` |
| **Tracking Stage 4**| `On the Way` | `Kierowca w Drodze` |
| **Tracking Stage 5**| `Delivered` | `Dostarczone` |

---

## 6. FORM FIELDS DICTIONARY (READY FOR CODE SCAFFOLDING)

### 6.1 Add New Address Form (`/api/user/addresses`)
```typescript
interface AddressFormValues {
  label: string;          // e.g. "Home", "Office"
  fullName: string;       // Required
  phone: string;          // Required (+48 prefix)
  email?: string;         // For receipts
  street: string;         // Required (e.g. "Floriańska")
  buildingNo: string;     // Required
  apartment?: string;     // Flat number
  floor?: string;         // Floor number
  doorCode?: string;      // Intercom code
  city: string;           // Default: "Kraków"
  driverNotes?: string;   // e.g. "Gate on right"
}
```

### 6.2 Checkout Form (`/api/checkout`)
```typescript
interface CheckoutPayload {
  contact: {
    fullName: string;
    phone: string;
    email: string;
  };
  fulfillment: {
    mode: 'delivery' | 'pickup';
    timeType: 'asap' | 'scheduled';
    scheduledTime?: string;
  };
  address: AddressFormValues;
  cart: {
    items: Array<{
      menuId: number;
      quantity: number;
      spiceLevel: string;
      addOnIds: string[];
      notes?: string;
    }>;
    subtotal: number;
    deliveryFee: number;
    tip: number;
    total: number;
  };
  payment: {
    method: 'BLIK' | 'COD';
    blikCode?: string;      // 6 digits
    cashChangeNeeded?: string; // "exact" | "100" | "200"
  };
}
```
