import React from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    formatPrice,
    addToCart,
    setQuickViewProduct,
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = wishlist
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is typeof PRODUCTS[0] => Boolean(p));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-[#faf8f5] h-full shadow-2xl flex flex-col justify-between border-l border-[#dcd6c8] animate-slideLeft">
        {/* Header */}
        <div className="p-5 border-b border-[#eae4d8] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Heart size={18} className="text-[#8b3d29] fill-[#8b3d29]" />
            <h3 className="font-editorial text-2xl font-semibold text-[#1c1a17]">
              Saved Summer Suits
            </h3>
            <span className="font-mono text-xs text-[#787163] tabular-nums">
              ({wishlistedProducts.length})
            </span>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close wishlist"
            className="p-1.5 text-[#787163] hover:text-[#1c1a17] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistedProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#787163]">
              <div className="w-16 h-16 border border-[#d6cfc1] flex items-center justify-center rounded-full mb-4 text-[#8a8373]">
                <Heart size={24} />
              </div>
              <h4 className="font-editorial text-xl font-semibold text-[#1c1a17] mb-1">
                Your wishlist is empty
              </h4>
              <p className="text-xs text-[#787163] max-w-xs mb-6">
                Save your favorite luxury lawn and festive organza designs to review before launch stock runs out.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="px-6 py-2.5 bg-[#1c1a17] text-white text-xs uppercase tracking-wider font-bold hover:bg-[#33302b] transition-colors"
              >
                Browse Summer Lawn
              </button>
            </div>
          ) : (
            wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="flex gap-4 p-3.5 bg-white border border-[#eae4d8] hover:border-[#cfc5b3] transition-colors"
              >
                {/* Image */}
                <div
                  className="w-20 aspect-[3/4] bg-[#f4efe6] shrink-0 overflow-hidden cursor-pointer"
                  onClick={() => {
                    setIsWishlistOpen(false);
                    setQuickViewProduct(product);
                  }}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        onClick={() => {
                          setIsWishlistOpen(false);
                          setQuickViewProduct(product);
                        }}
                        className="text-xs font-semibold text-[#1c1a17] leading-snug line-clamp-2 cursor-pointer hover:underline"
                      >
                        {product.name}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        aria-label="Remove from wishlist"
                        className="text-[#9e9688] hover:text-[#c93b2b] transition-colors p-0.5"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <p className="text-[11px] text-[#70685b] mt-0.5 uppercase tracking-wider font-medium">
                      {product.pieces} · {product.category.replace('-', ' ')}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#f5f1e8] flex items-center justify-between gap-2 mt-2">
                    <span className="font-mono tabular-nums text-xs font-bold text-[#1c1a17]">
                      {formatPrice(product.pricePKR)}
                    </span>

                    <button
                      onClick={() => {
                        addToCart(product, 'Unstitched', product.colors[0], 'unstitched', 1);
                      }}
                      className="px-3 py-1.5 bg-[#1c1a17] hover:bg-[#33302b] text-white text-[11px] uppercase tracking-wider font-bold transition-colors flex items-center gap-1.5"
                    >
                      <ShoppingBag size={12} />
                      <span>Add Unstitched</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistedProducts.length > 0 && (
          <div className="p-4 border-t border-[#eae4d8] bg-white">
            <button
              onClick={() => {
                wishlistedProducts.forEach((p) => {
                  addToCart(p, 'Unstitched', p.colors[0], 'unstitched', 1);
                });
              }}
              className="w-full py-3 bg-[#1c1a17] hover:bg-[#33302b] text-white text-xs uppercase tracking-wider font-bold transition-colors"
            >
              Move All Unstitched to Bag
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
