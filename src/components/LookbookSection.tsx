import React, { useState } from 'react';
import { LOOKBOOK_ITEMS, PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { Plus, ArrowRight, Sparkles } from 'lucide-react';

export const LookbookSection: React.FC = () => {
  const { setQuickViewProduct, addToCart, formatPrice } = useStore();
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [activePin, setActivePin] = useState<string | null>(null);

  const look = LOOKBOOK_ITEMS[activeLookIndex];

  return (
    <section id="lookbook" className="py-20 bg-[#f4efe6] border-b border-[#eae4d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-[0.24em] text-[#807767] font-semibold">
                Bahaar Summer Lawn '26
              </span>
              <span className="text-[#807767]">·</span>
              <span className="text-xs font-serif italic text-[#8b3d29] font-medium">
                Volume 01 Editorial
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1c1a17] tracking-wide">
              The Summer Lawn Lookbook
            </h2>
          </div>

          {/* Look Switcher tabs */}
          <div className="flex items-center gap-2 border border-[#d6cfc1] bg-white p-1">
            {LOOKBOOK_ITEMS.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveLookIndex(index);
                  setActivePin(null);
                }}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-colors ${
                  activeLookIndex === index
                    ? 'bg-[#1c1a17] text-white shadow-xs'
                    : 'text-[#70685b] hover:text-[#1c1a17]'
                }`}
              >
                Look 0{index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Lookbook Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-[#eae4d8] p-4 sm:p-8">
          {/* Main Visual with interactive hotspots */}
          <div className="lg:col-span-8 relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#e6dfd1] group">
            <img
              src={look.image}
              alt={look.title}
              className="w-full h-full object-cover object-center filter contrast-[1.03]"
              referrerPolicy="no-referrer"
            />

            {/* Interactive garment hotspots */}
            {look.pieces.map((piece) => {
              const product = PRODUCTS.find((p) => p.id === piece.productId);
              const isOpen = activePin === piece.productId;

              return (
                <div
                  key={piece.productId}
                  className="absolute z-20"
                  style={{ top: piece.position.top, left: piece.position.left }}
                >
                  <button
                    onClick={() => setActivePin(isOpen ? null : piece.productId)}
                    aria-label={`View ${piece.name}`}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform shadow-md ${
                      isOpen
                        ? 'bg-[#1c1a17] text-white scale-110'
                        : 'bg-white/95 text-[#1c1a17] hover:scale-110'
                    }`}
                  >
                    <Plus size={16} className={isOpen ? 'rotate-45 transition-transform' : 'transition-transform'} />
                  </button>

                  {/* Hotspot Floating Product Card */}
                  {isOpen && product && (
                    <div className="absolute left-10 top-1/2 -translate-y-1/2 w-60 bg-white p-3 border border-[#cfc5b3] shadow-xl z-30 animate-fadeIn text-xs">
                      <div className="flex gap-2.5">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-16 object-cover shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex flex-col justify-between">
                          <div>
                            <p className="font-bold text-[#1c1a17] line-clamp-1">{product.name}</p>
                            <p className="font-mono tabular-nums text-[#8b3d29] text-[11px] font-bold mt-0.5">
                              {formatPrice(product.pricePKR)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 pt-1">
                            <button
                              onClick={() => setQuickViewProduct(product)}
                              className="text-[10px] uppercase font-bold text-[#1c1a17] hover:underline"
                            >
                              Stitching
                            </button>
                            <span className="text-[#d6cfc1]">·</span>
                            <button
                              onClick={() => addToCart(product, 'Unstitched', product.colors[0], 'unstitched', 1)}
                              className="text-[10px] uppercase font-bold text-[#8b3d29] hover:underline"
                            >
                              Add Unstitched
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs text-white text-[11px] uppercase tracking-widest px-3 py-1 font-light">
              Tap + pins to explore pieces
            </div>
          </div>

          {/* Look Details Column */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-[#807767] font-semibold">
                  {look.subtitle}
                </span>
                {look.urduTitle && (
                  <span className="font-serif text-sm text-[#8b3d29]">
                    {look.urduTitle}
                  </span>
                )}
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#1c1a17]">
                {look.title}
              </h3>
              <p className="text-xs leading-relaxed text-[#595245] font-light">
                {look.description}
              </p>
            </div>

            {/* Garments in this look */}
            <div className="space-y-3 pt-4 border-t border-[#eae4d8]">
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#1c1a17]">
                Featured in Ensemble:
              </h4>
              <div className="space-y-2">
                {look.pieces.map((piece) => {
                  const product = PRODUCTS.find((p) => p.id === piece.productId);
                  if (!product) return null;

                  return (
                    <div
                      key={piece.productId}
                      className="p-3 border border-[#eae4d8] hover:border-[#1c1a17] transition-colors flex items-center justify-between bg-[#faf8f5]"
                    >
                      <div>
                        <p className="text-xs font-bold text-[#1c1a17]">{product.name}</p>
                        <p className="text-[11px] font-mono tabular-nums text-[#787163]">
                          {formatPrice(product.pricePKR)}
                        </p>
                      </div>
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="p-1.5 text-[#1c1a17] hover:bg-[#1c1a17] hover:text-white transition-colors"
                        title="View garment"
                      >
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
