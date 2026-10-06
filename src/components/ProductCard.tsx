import React, { useState } from 'react';
import { Product, ProductColor } from '../types/store';
import { useStore } from '../context/StoreContext';
import { Heart, Eye, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isEditorial?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, isEditorial = false }) => {
  const {
    formatPrice,
    addToCart,
    isWishlisted,
    toggleWishlist,
    setQuickViewProduct,
  } = useStore();

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const handleQuickAddUnstitched = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default to unstitched for quick add
    addToCart(product, 'Unstitched', selectedColor, 'unstitched', 1);
  };

  return (
    <article
      className="group relative flex flex-col bg-white border border-[#eae4d8] hover:border-[#cfc5b3] transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setQuickViewProduct(product)}
    >
      {/* Product Image Frame */}
      <div className={`relative w-full overflow-hidden bg-[#f4efe6] ${isEditorial ? 'aspect-[4/5]' : 'aspect-[3/4]'}`}>
        {!imageError && product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#ede6da] text-[#787163]">
            <span className="font-editorial text-2xl font-light italic mb-1">Noor & Mehr</span>
            <span className="text-xs tracking-wider uppercase">{product.category}</span>
          </div>
        )}

        {/* Tag */}
        {product.tag && (
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#1c1a17] bg-white/95 px-2.5 py-1 backdrop-blur-xs border border-[#eae4d8]">
              {product.tag}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-[#1c1a17] transition-transform active:scale-90 shadow-xs backdrop-blur-xs"
        >
          <Heart
            size={16}
            className={wishlisted ? 'fill-[#8b3d29] text-[#8b3d29]' : 'text-[#524e47]'}
          />
        </button>

        {/* Quick View Button on Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          className={`absolute bottom-16 right-3 z-10 p-2 rounded-full bg-white/95 text-[#1c1a17] hover:bg-white transition-all shadow-xs backdrop-blur-xs ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
          aria-label="Quick View Details"
        >
          <Eye size={16} />
        </button>

        {/* Quick Add Bar on Hover */}
        <div
          className={`absolute bottom-0 inset-x-0 bg-white/95 border-t border-[#eae4d8] p-3 transition-all duration-300 z-10 backdrop-blur-xs ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-wider text-[#736c61] font-semibold">
              {product.pieces.toUpperCase()} ENSEMBLE
            </span>
            <span className="text-[10px] text-[#2e7d32] font-medium">COD Available</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleQuickAddUnstitched}
              className="flex-1 py-1.5 px-2 text-xs font-semibold uppercase tracking-wider bg-[#1c1a17] text-white hover:bg-[#33302b] transition-colors text-center"
            >
              Add Unstitched
            </button>
            <button
              onClick={() => setQuickViewProduct(product)}
              className="py-1.5 px-3 text-xs font-semibold uppercase tracking-wider border border-[#1c1a17] text-[#1c1a17] hover:bg-[#f5f1e8] transition-colors"
            >
              Stitch Options
            </button>
          </div>
        </div>
      </div>

      {/* Card Metadata */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3 bg-white">
        <div>
          {/* Metadata */}
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#7d7568] mb-1 font-semibold">
            <span>{product.pieces} · {product.category.replace('-', ' ')}</span>
            {product.urduSubtitle && (
              <span className="font-serif text-[12px] text-[#8c8272] tracking-normal font-normal">
                {product.urduSubtitle}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-editorial text-lg text-[#1a1917] font-semibold leading-snug line-clamp-2 group-hover:text-[#524a3e] transition-colors">
            {product.name}
          </h3>

          {/* Fabric subtitle */}
          <p className="text-xs text-[#736c61] mt-1 line-clamp-1 font-light">
            {product.subtitle}
          </p>
        </div>

        {/* Color swatches & Price */}
        <div className="pt-2 border-t border-[#f2ede4] flex items-center justify-between gap-2">
          {/* Swatches */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c)}
                title={c.name}
                aria-label={`Select ${c.name}`}
                className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                  selectedColor.name === c.name
                    ? 'ring-1 ring-[#1c1a17] ring-offset-1 scale-110'
                    : 'border-[#b5ada0] opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 font-mono tabular-nums text-right">
            {product.originalPricePKR && (
              <span className="text-xs text-[#9c9486] line-through">
                {formatPrice(product.originalPricePKR)}
              </span>
            )}
            <span className="text-sm font-bold text-[#1c1a17]">
              {formatPrice(product.pricePKR)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
