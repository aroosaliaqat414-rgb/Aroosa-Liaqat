import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ProductColor, Currency, OrderConfirmation, StitchingType, CustomStitchingNotes } from '../types/store';
import { CURRENCY_RATES, PRODUCTS } from '../data/products';

interface ToastMessage {
  id: string;
  title: string;
  subtitle?: string;
  type?: 'success' | 'info' | 'error';
}

interface StoreContextType {
  // Cart
  cart: CartItem[];
  addToCart: (
    product: Product,
    size: string,
    color: ProductColor,
    stitching: StitchingType,
    qty?: number,
    customNotes?: CustomStitchingNotes
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotalPKR: number;
  discountPKR: number;
  appliedPromo: string | null;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  shippingFeePKR: number;
  finalTotalPKR: number;
  freeShippingThresholdPKR: number;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Currency
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (amountInPKR: number) => string;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  // Order Complete
  completedOrder: OrderConfirmation | null;
  setCompletedOrder: (order: OrderConfirmation | null) => void;

  // Toast
  toasts: ToastMessage[];
  showToast: (title: string, subtitle?: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('noor_mehr_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('noor_mehr_wishlist');
      return saved ? JSON.parse(saved) : ['nm-lawn-01'];
    } catch {
      return ['nm-lawn-01'];
    }
  });

  const [currency, setCurrency] = useState<Currency>('PKR');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderConfirmation | null>(null);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('noor_mehr_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('noor_mehr_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const showToast = (title: string, subtitle?: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, title, subtitle, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (
    product: Product,
    size: string,
    color: ProductColor,
    stitching: StitchingType = 'unstitched',
    qty: number = 1,
    customNotes?: CustomStitchingNotes
  ) => {
    const isStitched = stitching === 'stitched';
    const singlePrice = product.pricePKR + (isStitched ? product.stitchingPricePKR : 0);
    const cartItemId = `${product.id}-${stitching}-${size}-${color.name}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          product,
          stitching,
          selectedSize: size,
          selectedColor: color,
          customNotes,
          quantity: qty,
          itemPricePKR: singlePrice,
        },
      ];
    });

    showToast(
      `Added to Bag`,
      `${product.name} (${stitching === 'stitched' ? 'Stitched · ' + size : 'Unstitched'})`
    );
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    const item = cart.find((i) => i.id === cartItemId);
    setCart((prev) => prev.filter((i) => i.id !== cartItemId));
    if (item) {
      showToast('Item Removed', item.product.name, 'info');
    }
  };

  const updateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    const targetProduct = PRODUCTS.find((p) => p.id === productId);
    const title = targetProduct ? targetProduct.name : 'Suit';

    if (wishlist.includes(productId)) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      showToast('Removed from Wishlist', title, 'info');
    } else {
      setWishlist((prev) => [...prev, productId]);
      showToast('Saved to Wishlist', title, 'success');
    }
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotalPKR = cart.reduce((acc, item) => acc + item.itemPricePKR * item.quantity, 0);

  // Free shipping over Rs. 5,000 PKR nationwide
  const freeShippingThresholdPKR = 5000;
  const shippingFeePKR = subtotalPKR >= freeShippingThresholdPKR || subtotalPKR === 0 ? 0 : 350;

  let discountPKR = 0;
  if (appliedPromo === 'SUMMER26') {
    discountPKR = Math.round(subtotalPKR * 0.15);
  } else if (appliedPromo === 'FREESHIP') {
    discountPKR = shippingFeePKR;
  }

  const finalTotalPKR = Math.max(0, subtotalPKR - discountPKR + (appliedPromo === 'FREESHIP' ? 0 : shippingFeePKR));

  const applyPromo = (code: string): boolean => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'SUMMER26') {
      setAppliedPromo('SUMMER26');
      showToast('Promo Code Applied', '15% Summer Lawn promotional discount applied', 'success');
      return true;
    }
    if (normalized === 'FREESHIP') {
      setAppliedPromo('FREESHIP');
      showToast('Promo Code Applied', 'Complimentary nationwide express delivery unlocked', 'success');
      return true;
    }
    showToast('Invalid Code', 'Try "SUMMER26" for 15% off first order', 'error');
    return false;
  };

  const removePromo = () => {
    setAppliedPromo(null);
    showToast('Promo Code Removed', '', 'info');
  };

  const formatPrice = (amountInPKR: number): string => {
    const rateInfo = CURRENCY_RATES[currency];
    const converted = amountInPKR * rateInfo.rate;

    if (currency === 'PKR') {
      return `Rs. ${Math.round(converted).toLocaleString('en-PK')}`;
    }
    if (currency === 'USD') {
      return `$${converted.toFixed(0)}`;
    }
    if (currency === 'GBP') {
      return `£${converted.toFixed(0)}`;
    }
    if (currency === 'AED') {
      return `AED ${Math.round(converted).toLocaleString('en-AE')}`;
    }
    return `${rateInfo.symbol}${Math.round(converted)}`;
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        subtotalPKR,
        discountPKR,
        appliedPromo,
        applyPromo,
        removePromo,
        shippingFeePKR,
        finalTotalPKR,
        freeShippingThresholdPKR,
        wishlist,
        toggleWishlist,
        isWishlisted,
        currency,
        setCurrency,
        formatPrice,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        quickViewProduct,
        setQuickViewProduct,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        completedOrder,
        setCompletedOrder,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
