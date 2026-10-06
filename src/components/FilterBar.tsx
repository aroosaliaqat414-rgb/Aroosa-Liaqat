import React from 'react';
import { ProductCategory, PieceType } from '../types/store';
import { LayoutGrid, Columns2 } from 'lucide-react';

interface FilterBarProps {
  category: ProductCategory;
  setCategory: (c: ProductCategory) => void;
  pieceType: PieceType;
  setPieceType: (p: PieceType) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
  isEditorialView: boolean;
  setIsEditorialView: (v: boolean) => void;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  category,
  setCategory,
  pieceType,
  setPieceType,
  sortBy,
  setSortBy,
  isEditorialView,
  setIsEditorialView,
  totalCount,
}) => {
  const categories: { label: string; value: ProductCategory }[] = [
    { label: 'All Suits', value: 'all' },
    { label: 'Chikankari Lawn', value: 'chikankari' },
    { label: 'Luxury Lawn', value: 'luxury-lawn' },
    { label: 'Festive Organza', value: 'festive-organza' },
    { label: 'Summer Pret', value: 'summer-pret' },
    { label: 'Co-Ords', value: 'co-ords' },
    { label: 'Dupattas', value: 'accessories' },
  ];

  const piecesList: { label: string; value: PieceType }[] = [
    { label: 'All Silhouettes', value: 'all' },
    { label: '3-Piece Suits', value: '3-piece' },
    { label: '2-Piece Sets', value: '2-piece' },
    { label: '1-Piece Kurtas', value: '1-piece' },
  ];

  return (
    <div className="border-b border-[#eae4d8] bg-[#faf8f5] py-5 sticky top-20 z-20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Top filter row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Segmented category tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const active = category === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-[#1c1a17] text-white shadow-xs'
                      : 'text-[#696154] hover:text-[#1c1a17] hover:bg-[#ede7da]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
            {/* View grid switch */}
            <div className="hidden sm:flex items-center border border-[#d6cfc1] bg-[#f5f1e8] p-0.5">
              <button
                onClick={() => setIsEditorialView(false)}
                aria-label="3-column standard grid"
                className={`p-1.5 transition-colors ${
                  !isEditorialView ? 'bg-white text-[#1c1a17] shadow-xs' : 'text-[#857d6f] hover:text-[#1c1a17]'
                }`}
                title="Catalog Grid"
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => setIsEditorialView(true)}
                aria-label="2-column editorial view"
                className={`p-1.5 transition-colors ${
                  isEditorialView ? 'bg-white text-[#1c1a17] shadow-xs' : 'text-[#857d6f] hover:text-[#1c1a17]'
                }`}
                title="Editorial Showcase"
              >
                <Columns2 size={15} />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-xs text-[#787163] uppercase tracking-wider hidden sm:inline">
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-semibold text-[#2b2722] bg-[#f5f1e8] border border-[#d6cfc1] px-2.5 py-1.5 focus:outline-none cursor-pointer tracking-wider"
              >
                <option value="featured">Volume 01 Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bottom subtle secondary bar: Piece Filter & count */}
        <div className="flex items-center justify-between text-xs text-[#787163] pt-1">
          {/* Pieces */}
          <div className="flex items-center gap-3">
            <span className="uppercase tracking-wider text-[11px] text-[#9c9383]">Ensemble:</span>
            {piecesList.map((p) => (
              <button
                key={p.value}
                onClick={() => setPieceType(p.value)}
                className={`transition-colors uppercase tracking-wider text-[11px] ${
                  pieceType === p.value
                    ? 'text-[#1c1a17] font-bold underline underline-offset-4 decoration-1'
                    : 'text-[#787163] hover:text-[#1c1a17]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Garment count */}
          <div className="font-mono text-[11px] text-[#8c8373] tabular-nums">
            {totalCount} {totalCount === 1 ? 'Design' : 'Designs'} in Collection
          </div>
        </div>
      </div>
    </div>
  );
};
