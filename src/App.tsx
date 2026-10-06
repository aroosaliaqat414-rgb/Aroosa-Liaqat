import React, { useState, useMemo, useRef } from 'react';
import { StoreProvider } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { LookbookSection } from './components/LookbookSection';
import { StorySection } from './components/StorySection';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { PRODUCTS } from './data/products';
import { ProductCategory, PieceType } from './types/store';
import { SlidersHorizontal, RefreshCw } from 'lucide-react';

const StoreContent: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [activePieceType, setActivePieceType] = useState<PieceType>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isEditorialView, setIsEditorialView] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const catalogRef = useRef<HTMLDivElement>(null);
  const lookbookRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLookbook = () => {
    lookbookRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToStory = () => {
    storyRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectNavCategory = (cat: string) => {
    setActiveCategory(cat as ProductCategory);
    scrollToCatalog();
  };

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Piece filter
    if (activePieceType !== 'all') {
      result = result.filter((p) => p.pieces === activePieceType);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.composition.toLowerCase().includes(q) ||
          (p.urduSubtitle && p.urduSubtitle.includes(q))
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.pricePKR - b.pricePKR);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.pricePKR - a.pricePKR);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeCategory, activePieceType, sortBy, searchQuery]);

  const resetAllFilters = () => {
    setActiveCategory('all');
    setActivePieceType('all');
    setSortBy('featured');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#1c1a17] selection:bg-[#1c1a17] selection:text-white" id="top">
      {/* 1. Announcement Banner */}
      <AnnouncementBar />

      {/* 2. Top Navigation */}
      <Navbar
        onSelectCategory={handleSelectNavCategory}
        activeCategory={activeCategory}
        onOpenLookbook={scrollToLookbook}
        onOpenStory={scrollToStory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-1">
        {/* 3. Hero Section */}
        <HeroSection
          onExploreCollection={scrollToCatalog}
          onOpenLookbook={scrollToLookbook}
        />

        {/* 4. Filter Bar */}
        <div ref={catalogRef}>
          <FilterBar
            category={activeCategory}
            setCategory={setActiveCategory}
            pieceType={activePieceType}
            setPieceType={setActivePieceType}
            sortBy={sortBy}
            setSortBy={setSortBy}
            isEditorialView={isEditorialView}
            setIsEditorialView={setIsEditorialView}
            totalCount={filteredProducts.length}
          />
        </div>

        {/* 5. Product Catalog Section */}
        <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {searchQuery && (
            <div className="mb-6 flex items-center justify-between bg-[#f2eee6] px-4 py-2.5 text-xs text-[#524a3e] border border-[#eae4d8]">
              <span>
                Search results for: <strong className="text-[#1c1a17]">"{searchQuery}"</strong> ({filteredProducts.length} designs found)
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#1c1a17] font-bold uppercase tracking-wider hover:underline"
              >
                Clear Search
              </button>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 px-4 max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 border border-[#d6cfc1] flex items-center justify-center rounded-full mx-auto text-[#8a8373]">
                <SlidersHorizontal size={22} />
              </div>
              <h3 className="font-editorial text-2xl font-semibold text-[#1c1a17]">
                No lawn suits found matching criteria
              </h3>
              <p className="text-xs text-[#70685b] leading-relaxed">
                Try resetting your silhouette filter or search keyword to view the complete Summer Lawn Volume 01 collection.
              </p>
              <button
                onClick={resetAllFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1c1a17] text-white text-xs uppercase tracking-wider font-bold hover:bg-[#33302b] transition-colors"
              >
                <RefreshCw size={13} />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <div
              className={`grid gap-6 sm:gap-8 ${
                isEditorialView
                  ? 'grid-cols-1 md:grid-cols-2'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isEditorial={isEditorialView}
                />
              ))}
            </div>
          )}
        </section>

        {/* 6. Shoppable Lookbook */}
        <div ref={lookbookRef}>
          <LookbookSection />
        </div>

        {/* 7. Craftsmanship & Heritage */}
        <div ref={storyRef}>
          <StorySection />
        </div>
      </main>

      {/* 8. Footer */}
      <Footer />

      {/* Drawers & Modals */}
      <ProductDetailModal />
      <SizeGuideModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />

      {/* Floating Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StoreContent />
    </StoreProvider>
  );
}
