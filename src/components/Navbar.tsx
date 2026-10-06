import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Currency } from '../types/store';

interface NavbarProps {
  onSelectCategory: (category: string) => void;
  activeCategory: string;
  onOpenLookbook: () => void;
  onOpenStory: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectCategory,
  activeCategory,
  onOpenLookbook,
  onOpenStory,
  searchQuery,
  setSearchQuery,
}) => {
  const {
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    currency,
    setCurrency,
  } = useStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#eae4d8] transition-all">
      {/* 3-zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Single text element Brand Zone */}
        <a
          href="#top"
          className="font-editorial text-2xl lg:text-3xl tracking-[0.24em] font-semibold text-[#1c1a17] uppercase hover:opacity-85 transition-opacity shrink-0"
        >
          NOOR & MEHR
        </a>

        {/* Zone 2: 4–6 nav links, 1–2 word labels, single-line */}
        <nav className="hidden lg:flex items-center gap-7 text-[13px] tracking-wider uppercase font-medium text-[#5c564c]">
          <button
            onClick={() => onSelectCategory('all')}
            className={`transition-colors hover:text-[#1c1a17] py-1 border-b ${
              activeCategory === 'all'
                ? 'border-[#1c1a17] text-[#1c1a17]'
                : 'border-transparent'
            }`}
          >
            All Suits
          </button>
          <button
            onClick={() => onSelectCategory('chikankari')}
            className={`transition-colors hover:text-[#1c1a17] py-1 border-b ${
              activeCategory === 'chikankari'
                ? 'border-[#1c1a17] text-[#1c1a17]'
                : 'border-transparent'
            }`}
          >
            Chikankari
          </button>
          <button
            onClick={() => onSelectCategory('luxury-lawn')}
            className={`transition-colors hover:text-[#1c1a17] py-1 border-b ${
              activeCategory === 'luxury-lawn'
                ? 'border-[#1c1a17] text-[#1c1a17]'
                : 'border-transparent'
            }`}
          >
            Luxury Lawn
          </button>
          <button
            onClick={() => onSelectCategory('festive-organza')}
            className={`transition-colors hover:text-[#1c1a17] py-1 border-b ${
              activeCategory === 'festive-organza'
                ? 'border-[#1c1a17] text-[#1c1a17]'
                : 'border-transparent'
            }`}
          >
            Festive Organza
          </button>
          <button
            onClick={() => onSelectCategory('summer-pret')}
            className={`transition-colors hover:text-[#1c1a17] py-1 border-b ${
              activeCategory === 'summer-pret'
                ? 'border-[#1c1a17] text-[#1c1a17]'
                : 'border-transparent'
            }`}
          >
            Summer Pret
          </button>
          <button
            onClick={onOpenLookbook}
            className="transition-colors hover:text-[#1c1a17] py-1 border-b border-transparent"
          >
            Lookbook
          </button>
          <button
            onClick={onOpenStory}
            className="transition-colors hover:text-[#1c1a17] py-1 border-b border-transparent"
          >
            Heritage
          </button>
        </nav>

        {/* Zone 3: 1–2 primary actions & functional tools */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Currency selector (PKR default, USD, GBP, AED for overseas Pakistanis) */}
          <div className="relative">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              aria-label="Select currency"
              className="text-xs font-semibold text-[#5c564c] hover:text-[#1c1a17] bg-transparent border-0 py-1 pl-1 pr-3 focus:ring-0 cursor-pointer tracking-wider"
            >
              <option value="PKR">PKR (Rs.)</option>
              <option value="USD">USD ($)</option>
              <option value="GBP">GBP (£)</option>
              <option value="AED">AED (د.إ)</option>
            </select>
          </div>

          <span className="text-[#ded8cc] text-xs">|</span>

          {/* Search trigger */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Search summer lawn collection"
            className="p-2 text-[#5c564c] hover:text-[#1c1a17] transition-colors"
          >
            <Search size={18} strokeWidth={1.75} />
          </button>

          {/* Wishlist button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            aria-label={`Wishlist (${wishlist.length} saved)`}
            className="p-2 text-[#5c564c] hover:text-[#1c1a17] transition-colors relative"
          >
            <Heart size={18} strokeWidth={1.75} />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#8b3d29] text-white text-[10px] font-medium flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag CTA */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label={`Shopping bag (${cartCount} items)`}
            className="flex items-center gap-2 px-3.5 py-2 text-xs uppercase tracking-wider font-semibold text-white bg-[#1c1a17] hover:bg-[#33302b] transition-all"
          >
            <ShoppingBag size={15} strokeWidth={2} />
            <span className="hidden sm:inline">Bag</span>
            <span className="font-mono text-[11px] font-semibold text-[#f0ebe1]">({cartCount})</span>
          </button>
        </div>
      </div>

      {/* Expandable Search Input Row */}
      {isSearchOpen && (
        <div className="border-t border-[#eae4d8] bg-[#f2eee6] px-4 sm:px-8 py-3 transition-all animate-fadeIn">
          <div className="max-w-4xl mx-auto flex items-center gap-3">
            <Search size={16} className="text-[#80796e]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by lawn, chikankari, chiffon dupatta, organza, pret, or color..."
              className="w-full bg-transparent text-sm text-[#1c1a17] placeholder-[#80796e] focus:outline-none py-1"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#80796e] hover:text-[#1c1a17] uppercase tracking-wider"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              aria-label="Close search"
              className="text-[#80796e] hover:text-[#1c1a17] p-1 ml-2"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
