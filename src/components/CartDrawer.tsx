import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag, Truck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    subtotalPKR,
    discountPKR,
    appliedPromo,
    applyPromo,
    removePromo,
    shippingFeePKR,
    finalTotalPKR,
    freeShippingThresholdPKR,
    formatPrice,
    setIsCheckoutOpen,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');

  if (!isCartOpen) return null;

  const freeShippingRemaining = Math.max(0, freeShippingThresholdPKR - subtotalPKR);
  const progressPercent = Math.min(100, Math.round((subtotalPKR / freeShippingThresholdPKR) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyPromo(promoInput)) {
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-[#faf8f5] h-full shadow-2xl flex flex-col justify-between border-l border-[#dcd6c8] animate-slideLeft">
        {/* Header */}
        <div className="p-5 border-b border-[#eae4d8] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#1c1a17]" />
            <h3 className="font-editorial text-2xl font-semibold text-[#1c1a17]">
              Shopping Bag
            </h3>
            <span className="font-mono text-xs text-[#787163] tabular-nums">
              ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close bag"
            className="p-1.5 text-[#787163] hover:text-[#1c1a17] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator (Rs. 5,000 threshold) */}
        <div className="bg-[#f3eee4] px-5 py-3 border-b border-[#eae4d8] text-xs">
          {freeShippingRemaining > 0 ? (
            <p className="text-[#47433c]">
              Add <span className="font-bold text-[#1c1a17]">{formatPrice(freeShippingRemaining)}</span> more for complimentary nationwide delivery.
            </p>
          ) : (
            <p className="text-[#236329] font-medium flex items-center gap-1.5">
              <span>✓</span> You have unlocked free nationwide express delivery!
            </p>
          )}
          <div className="w-full h-1.5 bg-[#dbd4c5] mt-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1c1a17] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#787163]">
              <div className="w-16 h-16 border border-[#d6cfc1] flex items-center justify-center rounded-full mb-4 text-[#8a8373]">
                <ShoppingBag size={24} />
              </div>
              <h4 className="font-editorial text-xl font-semibold text-[#1c1a17] mb-1">
                Your shopping bag is empty
              </h4>
              <p className="text-xs text-[#787163] max-w-xs mb-6">
                Discover the Bahaar Summer Lawn '26 collection with delicate Chikankari and pure chiffon dupattas.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 bg-[#1c1a17] text-white text-xs uppercase tracking-wider font-bold hover:bg-[#33302b] transition-colors"
              >
                Explore Summer Lawn
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3.5 bg-white border border-[#eae4d8] hover:border-[#cfc5b3] transition-colors"
              >
                {/* Image */}
                <div className="w-20 aspect-[3/4] bg-[#f4efe6] shrink-0 overflow-hidden">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-[#1c1a17] leading-snug line-clamp-2">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                        className="text-[#9e9688] hover:text-[#c93b2b] transition-colors p-0.5"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="flex flex-col gap-0.5 text-[11px] text-[#70685b] mt-1">
                      <span className="font-medium text-[#8b3d29]">
                        {item.stitching === 'stitched' ? `Stitched Pret (${item.selectedSize})` : 'Unstitched 3-Piece'}
                      </span>
                      {item.customNotes?.trouserStyle && (
                        <span>Trouser: {item.customNotes.trouserStyle}</span>
                      )}
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2 h-2 rounded-full inline-block"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        {item.selectedColor.name}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Stepper & Price */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#f5f1e8] mt-2">
                    <div className="flex items-center border border-[#d6cfc1]">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-[#5c564c] hover:text-[#1c1a17]"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 text-xs font-mono font-bold text-[#1c1a17]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-[#5c564c] hover:text-[#1c1a17]"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="font-mono tabular-nums text-xs font-bold text-[#1c1a17]">
                      {formatPrice(item.itemPricePKR * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#eae4d8] bg-white space-y-4">
            {/* Promo Code Input */}
            <div>
              {appliedPromo ? (
                <div className="flex items-center justify-between p-2 bg-[#f3eee4] text-xs">
                  <div className="flex items-center gap-1.5 text-[#1c1a17] font-semibold">
                    <Tag size={13} />
                    <span>Promo Applied: {appliedPromo}</span>
                  </div>
                  <button
                    onClick={removePromo}
                    className="text-xs text-[#a63429] hover:underline uppercase tracking-wider"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo code (e.g. SUMMER26)"
                    className="flex-1 bg-[#faf8f5] border border-[#d6cfc1] text-xs px-3 py-2 uppercase tracking-wider focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#f0eae0] hover:bg-[#1c1a17] hover:text-white text-xs uppercase tracking-wider font-semibold transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-[#635d52] font-mono tabular-nums">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="text-[#1c1a17] font-semibold">{formatPrice(subtotalPKR)}</span>
              </div>

              {discountPKR > 0 && (
                <div className="flex items-center justify-between text-[#2e7d32]">
                  <span>Summer Promotional Discount (15%)</span>
                  <span>-{formatPrice(discountPKR)}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span>Nationwide Courier Delivery</span>
                <span className="text-[#1c1a17]">
                  {shippingFeePKR === 0 ? 'Complimentary' : formatPrice(shippingFeePKR)}
                </span>
              </div>

              <div className="pt-2 border-t border-[#eae4d8] flex items-center justify-between text-sm font-bold text-[#1c1a17] font-sans">
                <span>Total Amount</span>
                <span className="font-mono text-base">{formatPrice(finalTotalPKR)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 bg-[#1c1a17] hover:bg-[#33302b] text-white text-xs uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={14} />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#80796e]">
              <Truck size={14} />
              <span>Cash on Delivery (COD) Available Nationwide</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
