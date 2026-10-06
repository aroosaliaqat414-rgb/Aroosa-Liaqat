import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductColor, Product, StitchingType } from '../types/store';
import { PRODUCTS } from '../data/products';
import {
  X,
  Heart,
  Ruler,
  ShoppingBag,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Scissors,
  Check,
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    formatPrice,
    addToCart,
    isWishlisted,
    toggleWishlist,
    setIsSizeGuideOpen,
  } = useStore();

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [stitching, setStitching] = useState<StitchingType>('unstitched');
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [trouserStyle, setTrouserStyle] = useState<'Cigarette Pant' | 'Wide-Leg Culotte' | 'Straight Pant'>('Cigarette Pant');
  const [shirtLength, setShirtLength] = useState<string>('41" (Standard)');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'fabric' | 'stitching' | 'reviews'>('fabric');

  const wishlisted = isWishlisted(product.id);

  const pairedProducts: Product[] = (product.pairedProductIds || [])
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  const isStitched = stitching === 'stitched';
  const unitPrice = product.pricePKR + (isStitched ? product.stitchingPricePKR : 0);

  const handleAddToCart = () => {
    addToCart(
      product,
      isStitched ? selectedSize : 'Unstitched',
      selectedColor,
      stitching,
      quantity,
      isStitched ? { trouserStyle, shirtLength } : undefined
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div className="bg-[#faf8f5] max-w-5xl w-full border border-[#d6cfc1] shadow-2xl relative my-auto overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close product view"
          className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-white text-[#1c1a17] rounded-full transition-transform active:scale-95 shadow-xs border border-[#eae4d8]"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 bg-[#f4efe6] p-4 sm:p-6 flex flex-col gap-4 border-b lg:border-b-0 lg:border-r border-[#eae4d8]">
            {/* Main Image */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#e9e3d8]">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={`${product.name} view ${activeImageIndex + 1}`}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              {product.tag && (
                <div className="absolute top-4 left-4">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#1c1a17] bg-white/95 px-3 py-1 border border-[#eae4d8]">
                    {product.tag}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail switcher */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 aspect-[3/4] border overflow-hidden transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#1c1a17] ring-1 ring-[#1c1a17]'
                        : 'border-[#eae4d8] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Pakistani Trust Assurances */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#dfd7c9] text-center text-[11px] text-[#696154]">
              <div className="flex flex-col items-center gap-1">
                <Truck size={16} className="text-[#1c1a17]" />
                <span>Cash on Delivery (COD) Nationwide</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Scissors size={16} className="text-[#1c1a17]" />
                <span>Master Atelier Tailoring with Lace & Lining</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck size={16} className="text-[#1c1a17]" />
                <span>100% Guaranteed Original Brand Fabric</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white overflow-y-auto space-y-6">
            <div className="space-y-5">
              {/* Category, Pieces & Rating */}
              <div className="flex items-center justify-between text-xs text-[#787163]">
                <div className="uppercase tracking-wider font-bold text-[#8b3d29]">
                  {product.pieces} · {product.category.replace('-', ' ')}
                </div>
                <div className="flex items-center gap-1">
                  <Star size={14} className="fill-[#1c1a17] text-[#1c1a17]" />
                  <span className="font-semibold text-[#1c1a17]">{product.rating}</span>
                  <span className="text-[#8c8373]">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title & Urdu subtitle */}
              <div>
                {product.urduSubtitle && (
                  <p className="font-serif text-sm text-[#8a7f6f] mb-1">
                    {product.urduSubtitle}
                  </p>
                )}
                <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#1c1a17] leading-tight">
                  {product.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#70685b] mt-1 font-light">
                  {product.subtitle}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 font-mono tabular-nums">
                <span className="text-2xl font-bold text-[#1c1a17]">
                  {formatPrice(unitPrice)}
                </span>
                {product.originalPricePKR && (
                  <span className="text-sm text-[#9c9386] line-through">
                    {formatPrice(product.originalPricePKR)}
                  </span>
                )}
                <span className="text-xs text-[#2e7d32] font-sans font-semibold uppercase tracking-wider">
                  In Stock · Ready for Dispatch
                </span>
              </div>

              {/* STITCHING SELECTION (Crucial Pakistani E-Commerce Feature) */}
              <div className="space-y-2 pt-2 border-t border-[#f2ede4]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#70685b] uppercase tracking-wider font-semibold">
                    Stitching Preference:
                  </span>
                  <span className="text-[#8b3d29] font-medium text-[11px]">
                    {stitching === 'unstitched' ? 'Includes full fabric & borders' : '+Rs. 5,500 Tailoring fee'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setStitching('unstitched')}
                    className={`p-3 text-left border transition-all ${
                      stitching === 'unstitched'
                        ? 'border-[#1c1a17] bg-[#faf8f5] shadow-xs'
                        : 'border-[#eae4d8] hover:border-[#cfc5b3]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1c1a17] uppercase tracking-wider">
                        Unstitched
                      </span>
                      {stitching === 'unstitched' && <Check size={14} className="text-[#1c1a17]" />}
                    </div>
                    <p className="text-[11px] text-[#787163] mt-1">
                      Fabric + Embroidered patches in box
                    </p>
                  </button>

                  <button
                    onClick={() => setStitching('stitched')}
                    className={`p-3 text-left border transition-all ${
                      stitching === 'stitched'
                        ? 'border-[#1c1a17] bg-[#faf8f5] shadow-xs'
                        : 'border-[#eae4d8] hover:border-[#cfc5b3]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1c1a17] uppercase tracking-wider">
                        Stitched Pret
                      </span>
                      {stitching === 'stitched' && <Check size={14} className="text-[#1c1a17]" />}
                    </div>
                    <p className="text-[11px] text-[#787163] mt-1">
                      Includes slip, finishing lace & trousers
                    </p>
                  </button>
                </div>
              </div>

              {/* If Stitched: Size & Tailoring Customization */}
              {isStitched && (
                <div className="space-y-3 p-3 bg-[#faf8f5] border border-[#e8e2d5] animate-fadeIn">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#70685b] uppercase tracking-wider font-semibold">
                      Select Ready Size:
                    </span>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="inline-flex items-center gap-1 text-[#1c1a17] hover:underline uppercase tracking-wider font-semibold"
                    >
                      <Ruler size={13} />
                      <span>Pakistani Size Chart</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {['XS', 'S', 'M', 'L', 'XL'].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2 text-xs font-bold uppercase border transition-colors ${
                          selectedSize === sz
                            ? 'border-[#1c1a17] bg-[#1c1a17] text-white'
                            : 'border-[#d6cfc1] bg-white text-[#2b2722] hover:border-[#1c1a17]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>

                  {/* Trouser cut option */}
                  <div className="pt-2 border-t border-[#e8e2d5]">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#70685b] block mb-1">
                      Trouser Stitching Cut:
                    </span>
                    <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                      {(['Cigarette Pant', 'Wide-Leg Culotte', 'Straight Pant'] as const).map((style) => (
                        <button
                          key={style}
                          onClick={() => setTrouserStyle(style)}
                          className={`py-1.5 px-2 border text-center transition-colors ${
                            trouserStyle === style
                              ? 'border-[#1c1a17] bg-[#1c1a17] text-white font-medium'
                              : 'border-[#d6cfc1] bg-white text-[#524a3e]'
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Color Selection */}
              <div className="space-y-2 pt-2 border-t border-[#f2ede4]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#70685b] uppercase tracking-wider font-semibold">Color Palette:</span>
                  <span className="font-semibold text-[#1c1a17]">{selectedColor.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`group relative p-0.5 rounded-full transition-all ${
                        selectedColor.name === c.name ? 'ring-2 ring-[#1c1a17]' : 'hover:scale-105'
                      }`}
                    >
                      <span
                        className="block w-6 h-6 rounded-full border border-black/20"
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Buy Action Buttons */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#d6cfc1] bg-[#faf8f5]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2.5 text-xs text-[#524a3e] hover:text-[#1c1a17]"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-xs font-mono tabular-nums font-bold text-[#1c1a17]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2.5 text-xs text-[#524a3e] hover:text-[#1c1a17]"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 bg-[#1c1a17] text-white hover:bg-[#33302b] text-xs uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <ShoppingBag size={15} />
                    <span>Add To Bag · {formatPrice(unitPrice * quantity)}</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    className="p-3 border border-[#d6cfc1] hover:border-[#1c1a17] bg-white text-[#1c1a17] transition-colors"
                  >
                    <Heart
                      size={18}
                      className={wishlisted ? 'fill-[#8b3d29] text-[#8b3d29]' : 'text-[#736c61]'}
                    />
                  </button>
                </div>
              </div>

              {/* Informational Tabs: Fabric & Box / Stitching / Reviews */}
              <div className="pt-4 border-t border-[#f2ede4]">
                <div className="flex items-center border-b border-[#eae4d8] text-xs font-bold uppercase tracking-wider">
                  <button
                    onClick={() => setActiveTab('fabric')}
                    className={`py-2 px-3 border-b-2 transition-colors ${
                      activeTab === 'fabric'
                        ? 'border-[#1c1a17] text-[#1c1a17]'
                        : 'border-transparent text-[#787163] hover:text-[#1c1a17]'
                    }`}
                  >
                    Fabric & Box
                  </button>
                  <button
                    onClick={() => setActiveTab('stitching')}
                    className={`py-2 px-3 border-b-2 transition-colors ${
                      activeTab === 'stitching'
                        ? 'border-[#1c1a17] text-[#1c1a17]'
                        : 'border-transparent text-[#787163] hover:text-[#1c1a17]'
                    }`}
                  >
                    Craft & Care
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`py-2 px-3 border-b-2 transition-colors ${
                      activeTab === 'reviews'
                        ? 'border-[#1c1a17] text-[#1c1a17]'
                        : 'border-transparent text-[#787163] hover:text-[#1c1a17]'
                    }`}
                  >
                    Reviews ({product.reviewsCount})
                  </button>
                </div>

                <div className="py-4 text-xs leading-relaxed text-[#524a3e]">
                  {activeTab === 'fabric' && (
                    <div className="space-y-3">
                      <p>{product.description}</p>
                      <div>
                        <span className="font-bold text-[#1c1a17] uppercase tracking-wider text-[11px] block mb-1">
                          Box Inclusions (What You Receive):
                        </span>
                        <ul className="list-disc pl-4 space-y-1 text-[#61594e]">
                          {product.unstitchedFabricDetails.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === 'stitching' && (
                    <div className="space-y-3">
                      <div>
                        <span className="font-bold text-[#1c1a17] uppercase tracking-wider text-[11px] block">
                          Textile Composition:
                        </span>
                        <p className="mt-0.5">{product.composition}</p>
                      </div>
                      <div>
                        <span className="font-bold text-[#1c1a17] uppercase tracking-wider text-[11px] block">
                          Embroidery & Craft Technique:
                        </span>
                        <p className="mt-0.5">{product.craftTechnique}</p>
                      </div>
                      <div>
                        <span className="font-bold text-[#1c1a17] uppercase tracking-wider text-[11px] block">
                          Washing & Care:
                        </span>
                        <p className="mt-0.5">{product.careInstructions}</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-4">
                      {product.reviews.map((rev) => (
                        <div key={rev.id} className="border-b border-[#f2ede4] pb-3 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[#1c1a17]">{rev.author}</span>
                            <span className="text-[#8c8373] text-[11px]">{rev.date}</span>
                          </div>
                          <div className="text-[11px] text-[#70685b]">
                            {rev.location} · <span className="text-[#2e7d32]">Verified Pakistani Buyer</span> · {rev.fit}
                          </div>
                          <p className="font-semibold text-[#1c1a17] pt-1">{rev.headline}</p>
                          <p className="text-[#524a3e]">{rev.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Complete The Look */}
              {pairedProducts.length > 0 && (
                <div className="pt-4 border-t border-[#f2ede4]">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-[#1c1a17] mb-3">
                    Pair With Summer Accessories:
                  </h4>
                  <div className="space-y-2">
                    {pairedProducts.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between p-2.5 border border-[#eae4d8] hover:border-[#1c1a17] transition-colors bg-[#faf8f5]"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-10 h-12 object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <p className="text-xs font-semibold text-[#1c1a17] line-clamp-1">{p.name}</p>
                            <p className="text-[11px] text-[#787163] font-mono tabular-nums">
                              {formatPrice(p.pricePKR)}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => addToCart(p, 'Unstitched', p.colors[0], 'unstitched', 1)}
                          className="px-2.5 py-1 text-[11px] uppercase tracking-wider font-bold border border-[#1c1a17] hover:bg-[#1c1a17] hover:text-white transition-colors flex items-center gap-1"
                        >
                          <Plus size={11} />
                          <span>Add</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
