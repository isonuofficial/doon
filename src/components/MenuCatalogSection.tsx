import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  X,
  Flame,
  ShieldCheck,
  Filter,
} from 'lucide-react';
import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  DietaryTag,
} from '../data/menuData';
import { useStore } from '../store/useStore';
import { DishCard } from './DishCard';

export const MenuCatalogSection: React.FC = () => {
  const { language, selectedCategory, setSelectedCategory } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDietary, setActiveDietary] = useState<'ALL' | DietaryTag>('ALL');

  const dietaryFilters: { id: 'ALL' | DietaryTag; labelEn: string; labelPl: string }[] = [
    { id: 'ALL', labelEn: 'All Dishes (123)', labelPl: 'Wszystkie (123)' },
    { id: 'Chef Special', labelEn: '★ Chef Specials', labelPl: '★ Specjały Szefa' },
    { id: 'Halal', labelEn: '100% Halal', labelPl: '100% Halal' },
    { id: 'Vegetarian', labelEn: 'Vegetarian', labelPl: 'Wegetariańskie' },
    { id: 'Gluten-Free', labelEn: 'Gluten-Free', labelPl: 'Bez Glutenu' },
  ];

  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCat =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesDiet =
        activeDietary === 'ALL' || item.tags.includes(activeDietary);
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.namePl.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.descriptionPl.toLowerCase().includes(q) ||
        String(item.id) === q.replace('#', '');
      return matchesCat && matchesDiet && matchesSearch;
    });
  }, [selectedCategory, activeDietary, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: MENU_ITEMS.length };
    for (const item of MENU_ITEMS) {
      counts[item.category] = (counts[item.category] || 0) + 1;
    }
    return counts;
  }, []);

  const visibleCategories = useMemo(() => {
    if (selectedCategory !== 'all') {
      return MENU_CATEGORIES.filter((c) => c.id === selectedCategory);
    }
    return MENU_CATEGORIES.filter((c) => c.id !== 'all');
  }, [selectedCategory]);

  return (
    <section id="full-menu-section" className="bg-[#09090B] min-h-screen">
      {/* Luxury Black & Gold Menu Hero Banner (Grillvora /menu Layout) */}
      <div className="pt-32 pb-14 px-4 sm:px-8 bg-[#111115] border-b border-[#D4AF37]/25 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_75%_20%,rgba(212,175,55,0.12)_0%,transparent_55%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] block mb-2">
                {language === 'en'
                  ? 'MADE FRESH. SERVED HOT.'
                  : 'ŚWIEŻO PRZYGOTOWANE. PODAWANE GORĄCE.'}
              </span>
              <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#F5F2EB] leading-tight">
                {language === 'en' ? (
                  <>
                    PICK YOUR{' '}
                    <span className="gold-gradient-text italic">CRAVING.</span>
                  </>
                ) : (
                  <>
                    KRÓLEWSKIE{' '}
                    <span className="gold-gradient-text italic">MENU.</span>
                  </>
                )}
              </h1>
              <p className="text-[#C8C2B4] text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
                {language === 'en'
                  ? 'From our signature clay-tandoor kebabs and 100% gluten-free curries to saffron dum biryani and garlic naans, every dish is crafted to bring bold royal flavor to your table in Kraków.'
                  : 'Od specjałów z glinianego pieca tandoor i bezglutenowych dań curry po aromatyczne biryani i chlebki naan — każde danie przygotowujemy ze świeżo mielonych przypraw.'}
              </p>
            </div>

            {/* Search Input */}
            <div className="w-full lg:w-96">
              <div className="relative">
                <Search className="w-4 h-4 text-[#D4AF37] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    language === 'en'
                      ? 'Search dishes (e.g. Butter Chicken, Naan, #50)...'
                      : 'Szukaj dań (np. Butter Chicken, Naan, #50)...'
                  }
                  className="w-full bg-[#09090B] text-[#F5F2EB] border border-[#D4AF37]/35 focus:border-[#D4AF37] rounded-full pl-11 pr-10 py-3.5 text-xs sm:text-sm placeholder:text-[#C8C2B4]/50 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/10 text-[#F5F2EB] flex items-center justify-center cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Dietary Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-6 mt-6 border-t border-white/10">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D4AF37] shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5" />
              {language === 'en' ? 'Dietary:' : 'Filtry:'}
            </span>
            {dietaryFilters.map((df) => {
              const active = activeDietary === df.id;
              return (
                <button
                  key={df.id}
                  onClick={() => setActiveDietary(df.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer border ${
                    active
                      ? 'bg-[#D4AF37] text-[#09090B] border-[#D4AF37]'
                      : 'bg-[#09090B] text-[#C8C2B4] border-white/10 hover:border-[#D4AF37]/40 hover:text-white'
                  }`}
                >
                  {language === 'en' ? df.labelEn : df.labelPl}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky 12-Category Navigation Bar */}
      <div className="sticky top-20 z-30 bg-[#09090B]/95 backdrop-blur-xl border-b border-[#D4AF37]/25 py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
          {MENU_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 transition-all cursor-pointer flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#D4AF37] text-[#09090B] border-[#FFF3C4] shadow-[0_4px_15px_rgba(212,175,55,0.35)]'
                    : 'bg-[#141419] text-[#C8C2B4] border-white/10 hover:border-[#D4AF37]/40 hover:text-[#F5F2EB]'
                }`}
              >
                <span>{language === 'en' ? cat.name : cat.namePl}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                    isSelected
                      ? 'bg-[#09090B] text-[#F5C542]'
                      : 'bg-white/10 text-[#C8C2B4]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Dish Catalog Grouped by Grillvora Numbered Category Sections with Little Stories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-20">
        {filteredDishes.length === 0 ? (
          <div className="lux-card p-12 text-center max-w-lg mx-auto my-8">
            <Flame className="w-10 h-10 text-[#D4AF37] mx-auto mb-3" />
            <h3 className="font-display text-2xl font-bold text-[#F5F2EB]">
              {language === 'en'
                ? 'No matching dishes found'
                : 'Nie znaleziono pasujących dań'}
            </h3>
            <p className="text-sm text-[#C8C2B4] mt-2 mb-6">
              {language === 'en'
                ? 'Try clearing your search or switching dietary filters.'
                : 'Spróbuj wyczyścić wyszukiwanie lub zmienić filtry dietetyczne.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveDietary('ALL');
                setSelectedCategory('all');
              }}
              className="lux-btn-gold px-6 py-3 text-xs uppercase tracking-wider cursor-pointer"
            >
              {language === 'en' ? 'Reset Filters' : 'Resetuj Filtry'}
            </button>
          </div>
        ) : (
          visibleCategories.map((cat) => {
            const categoryItems = filteredDishes.filter(
              (item) => item.category === cat.id
            );
            if (categoryItems.length === 0) return null;

            return (
              <div key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-36">
                {/* Grillvora Numbered Category Story Header ("01 / ON THE MENU — TANDOORI & STARTERS") */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#D4AF37]/25"
                >
                  <div>
                    <div className="inline-flex items-center gap-2.5 mb-2">
                      <span className="font-royal text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                        {cat.code} / ON THE MENU
                      </span>
                      {['veg-curries', 'chicken-curries', 'lamb-seafood', 'biryani-rice'].includes(
                        cat.id
                      ) && (
                        <span className="bg-[#D4AF37]/15 text-[#F5C542] border border-[#D4AF37]/40 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          {language === 'en'
                            ? 'All Gluten-Free'
                            : 'Wszystkie Dania Bezglutenowe'}
                        </span>
                      )}
                    </div>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F5F2EB]">
                      {language === 'en' ? cat.name : cat.namePl}
                    </h2>
                    <p className="text-sm sm:text-base text-[#C8C2B4] mt-2 max-w-2xl leading-relaxed">
                      {language === 'en' ? cat.subtitle : cat.subtitlePl}
                    </p>
                  </div>

                  <span className="lux-badge-gold px-4 py-1.5 text-xs font-bold uppercase tracking-wider self-start md:self-end shrink-0">
                    {categoryItems.length}{' '}
                    {language === 'en' ? 'Dishes' : 'Pozycji'}
                  </span>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categoryItems.map((dish, idx) => (
                    <DishCard key={dish.id} dish={dish} index={idx} />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
