import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShippingAddress, OrderConfirmation } from '../types/store';
import {
  X,
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Package,
  Banknote,
  Building2,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    clearCart,
    subtotalPKR,
    discountPKR,
    shippingFeePKR,
    finalTotalPKR,
    formatPrice,
    currency,
    completedOrder,
    setCompletedOrder,
    showToast,
  } = useStore();

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'raast' | 'card'>('cod');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: 'Lahore',
    province: 'Punjab',
    postalCode: '54000',
    country: 'Pakistan',
  });

  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  if (!isCheckoutOpen) return null;

  const handleFillPakistaniDemo = () => {
    setForm({
      fullName: 'Aroosa Liaqat',
      email: 'aroosa.liaqat@gmail.com',
      phone: '0300 4821945',
      addressLine1: 'House 42, Sector Y, Phase 3, DHA',
      addressLine2: 'Near Lalik Jan Chowk',
      city: 'Lahore',
      province: 'Punjab',
      postalCode: '54792',
      country: 'Pakistan',
    });
    setPaymentMethod('cod');
    showToast('Pakistani Address Populated', 'Ready to test Cash on Delivery checkout', 'info');
  };

  const calculatedShipping =
    shippingMethod === 'express' ? shippingFeePKR + 250 : shippingFeePKR;
  const calculatedTotal =
    shippingMethod === 'express' ? finalTotalPKR + 250 : finalTotalPKR;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.fullName || !form.phone || !form.addressLine1 || !form.city) {
      showToast('Incomplete Address', 'Please provide contact number, full name, and address', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderNumber = `NM-${Math.floor(100000 + Math.random() * 900000)}`;
      const courierName = form.country === 'Pakistan' ? 'TCS Express Courier' : 'DHL International';
      const trackingCode = `TCS-PK-${Math.floor(10000000 + Math.random() * 90000000)}`;

      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + (shippingMethod === 'express' ? 2 : 3));

      const newOrder: OrderConfirmation = {
        orderId: orderNumber,
        date: new Date().toLocaleDateString('en-PK', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        estimatedDelivery: deliveryDate.toLocaleDateString('en-PK', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }),
        trackingNumber: trackingCode,
        courier: courierName,
        items: [...cart],
        subtotalPKR,
        discountPKR,
        shippingFeePKR: calculatedShipping,
        totalPKR: calculatedTotal,
        currency,
        address: { ...form },
        paymentMethod:
          paymentMethod === 'cod'
            ? 'Cash on Delivery (Pay upon delivery to courier)'
            : paymentMethod === 'raast'
            ? 'Raast / Direct Bank Transfer (Meezan Bank)'
            : 'Credit/Debit Card (Online Paid)',
      };

      setCompletedOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
      showToast('Order Booked!', `Order #${orderNumber} placed via ${courierName}`, 'success');
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    if (completedOrder) {
      setCompletedOrder(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-[#faf8f5] max-w-4xl w-full border border-[#d6cfc1] shadow-2xl relative my-auto overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#eae4d8] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Lock size={16} className="text-[#1c1a17]" />
            <h3 className="font-editorial text-2xl font-semibold text-[#1c1a17]">
              {completedOrder ? 'Order Confirmed · مبارک ہو' : 'Noor & Mehr Secure Checkout'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close checkout"
            className="p-1.5 text-[#70685b] hover:text-[#1c1a17] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* ORDER SUCCESS SCREEN */}
        {completedOrder ? (
          <div className="p-6 sm:p-10 space-y-8 bg-white max-h-[85vh] overflow-y-auto">
            <div className="text-center max-w-lg mx-auto space-y-3">
              <div className="w-16 h-16 bg-[#edf7ee] text-[#2e7d32] mx-auto rounded-full flex items-center justify-center border border-[#c3e6c6]">
                <CheckCircle2 size={32} />
              </div>
              <p className="text-xs uppercase tracking-widest text-[#70685b] font-semibold">
                Shukriya for Shopping With Us
              </p>
              <h2 className="font-editorial text-3xl font-bold text-[#1c1a17]">
                Order #{completedOrder.orderId}
              </h2>
              <p className="text-xs text-[#524a3e] leading-relaxed">
                An SMS and email confirmation have been sent to{' '}
                <strong className="text-[#1c1a17]">{completedOrder.address.phone}</strong>. 
                Our Lahore dispatch warehouse is preparing your Summer Lawn garments.
              </p>
            </div>

            {/* Courier & Delivery status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-[#f7f4ed] border border-[#eae4d8] text-xs">
              <div>
                <span className="text-[#787163] uppercase tracking-wider block text-[10px]">Courier Partner:</span>
                <span className="font-bold text-[#1c1a17] mt-0.5 block">{completedOrder.courier}</span>
              </div>
              <div>
                <span className="text-[#787163] uppercase tracking-wider block text-[10px]">TCS Tracking Code:</span>
                <span className="font-mono text-[#1c1a17] font-semibold mt-0.5 block">{completedOrder.trackingNumber}</span>
              </div>
              <div>
                <span className="text-[#787163] uppercase tracking-wider block text-[10px]">Estimated Delivery:</span>
                <span className="font-bold text-[#1c1a17] mt-0.5 block">{completedOrder.estimatedDelivery}</span>
              </div>
            </div>

            {/* Receipt Summary */}
            <div className="border border-[#eae4d8] p-4 space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#1c1a17]">
                Booked Garments:
              </h4>
              <div className="divide-y divide-[#f2ede4]">
                {completedOrder.items.map((item) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-10 h-12 object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="font-semibold text-[#1c1a17]">{item.product.name}</p>
                        <p className="text-[11px] text-[#787163]">
                          {item.stitching === 'stitched' ? `Stitched (${item.selectedSize})` : 'Unstitched 3-Piece'} · {item.selectedColor.name} · Qty {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-[#1c1a17]">
                      {formatPrice(item.itemPricePKR * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#eae4d8] space-y-1 text-xs font-mono tabular-nums text-right">
                <div className="flex justify-between text-[#787163]">
                  <span>Subtotal:</span>
                  <span>{formatPrice(completedOrder.subtotalPKR)}</span>
                </div>
                {completedOrder.discountPKR > 0 && (
                  <div className="flex justify-between text-[#2e7d32]">
                    <span>Discount (15%):</span>
                    <span>-{formatPrice(completedOrder.discountPKR)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#787163]">
                  <span>Nationwide Courier:</span>
                  <span>{completedOrder.shippingFeePKR === 0 ? 'Complimentary' : formatPrice(completedOrder.shippingFeePKR)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#1c1a17] pt-2 border-t border-[#eae4d8]">
                  <span>Payable to Courier (COD):</span>
                  <span>{formatPrice(completedOrder.totalPKR)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center pt-2">
              <button
                onClick={handleClose}
                className="px-8 py-3 bg-[#1c1a17] text-white hover:bg-[#33302b] text-xs uppercase tracking-wider font-bold transition-colors"
              >
                Continue Exploring Collection
              </button>
            </div>
          </div>
        ) : (
          /* CHECKOUT FORM */
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
            {/* Quick Demo Autofill Helper */}
            <div className="bg-[#f5f1e8] p-3 border border-[#ded6c8] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[#5e564a]">
                <Package size={15} />
                <span>Testing Pakistani checkout flow?</span>
              </div>
              <button
                type="button"
                onClick={handleFillPakistaniDemo}
                className="px-3 py-1 bg-white hover:bg-[#1c1a17] hover:text-white border border-[#c7bfb1] text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Autofill Pakistani Address
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Customer & Delivery Details */}
              <div className="lg:col-span-7 space-y-5">
                <h4 className="font-editorial text-xl font-semibold text-[#1c1a17] border-b border-[#eae4d8] pb-2">
                  1. Delivery Details in Pakistan
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#696154] mb-1 font-semibold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      placeholder="e.g. Aroosa Liaqat"
                      className="w-full bg-white border border-[#d6cfc1] px-3 py-2 text-xs text-[#1c1a17] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#696154] mb-1 font-semibold">
                      Mobile Number (For Courier SMS & Call) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="0300 1234567"
                      className="w-full bg-white border border-[#d6cfc1] px-3 py-2 text-xs text-[#1c1a17] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#696154] mb-1 font-semibold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="name@gmail.com"
                      className="w-full bg-white border border-[#d6cfc1] px-3 py-2 text-xs text-[#1c1a17] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#696154] mb-1 font-semibold">
                      City *
                    </label>
                    <select
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full bg-white border border-[#d6cfc1] px-3 py-2 text-xs text-[#1c1a17] focus:outline-none cursor-pointer"
                    >
                      <option value="Lahore">Lahore</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Multan">Multan</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Quetta">Quetta</option>
                      <option value="Sialkot">Sialkot</option>
                      <option value="Gujranwala">Gujranwala</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Other Pakistani City">Other Pakistani City</option>
                      <option value="International (Overseas)">International (Overseas)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#696154] mb-1 font-semibold">
                    Complete Street Address (House/Plot No., Street, Sector/Block) *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.addressLine1}
                    onChange={(e) => setForm({ ...form, addressLine1: e.target.value })}
                    placeholder="e.g. House 42, Sector Y, Phase 3, DHA"
                    className="w-full bg-white border border-[#d6cfc1] px-3 py-2 text-xs text-[#1c1a17] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#696154] mb-1">
                      Nearest Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      value={form.addressLine2 || ''}
                      onChange={(e) => setForm({ ...form, addressLine2: e.target.value })}
                      placeholder="Near Lalik Jan Chowk"
                      className="w-full bg-white border border-[#d6cfc1] px-3 py-2 text-xs text-[#1c1a17] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#696154] mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={form.postalCode}
                      onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                      placeholder="54000"
                      className="w-full bg-white border border-[#d6cfc1] px-3 py-2 text-xs text-[#1c1a17] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="pt-2">
                  <h4 className="font-editorial text-xl font-semibold text-[#1c1a17] border-b border-[#eae4d8] pb-2 mb-3">
                    2. Courier Speed
                  </h4>
                  <div className="space-y-2">
                    <label
                      className={`flex items-center justify-between p-3 border cursor-pointer transition-colors ${
                        shippingMethod === 'standard'
                          ? 'border-[#1c1a17] bg-white'
                          : 'border-[#eae4d8] bg-[#f7f4ed]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === 'standard'}
                          onChange={() => setShippingMethod('standard')}
                          className="accent-[#1c1a17]"
                        />
                        <div>
                          <p className="text-xs font-bold text-[#1c1a17]">Standard TCS Nationwide Delivery</p>
                          <p className="text-[11px] text-[#787163]">2-4 Business Days across Pakistan</p>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#1c1a17]">
                        {shippingFeePKR === 0 ? 'Free' : formatPrice(shippingFeePKR)}
                      </span>
                    </label>

                    <label
                      className={`flex items-center justify-between p-3 border cursor-pointer transition-colors ${
                        shippingMethod === 'express'
                          ? 'border-[#1c1a17] bg-white'
                          : 'border-[#eae4d8] bg-[#f7f4ed]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === 'express'}
                          onChange={() => setShippingMethod('express')}
                          className="accent-[#1c1a17]"
                        />
                        <div>
                          <p className="text-xs font-bold text-[#1c1a17]">Priority Express Air Dispatch</p>
                          <p className="text-[11px] text-[#787163]">1-2 Business Days priority routing</p>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#1c1a17]">
                        {formatPrice(shippingFeePKR + 250)}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Payment & Order Summary */}
              <div className="lg:col-span-5 space-y-5">
                <h4 className="font-editorial text-xl font-semibold text-[#1c1a17] border-b border-[#eae4d8] pb-2">
                  3. Payment Method
                </h4>

                {/* Payment Selector Tabs */}
                <div className="grid grid-cols-3 gap-1 p-1 bg-[#eae4d8]">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                      paymentMethod === 'cod'
                        ? 'bg-white text-[#1c1a17] shadow-xs'
                        : 'text-[#615a4e] hover:text-[#1c1a17]'
                    }`}
                  >
                    COD
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('raast')}
                    className={`py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                      paymentMethod === 'raast'
                        ? 'bg-white text-[#1c1a17] shadow-xs'
                        : 'text-[#615a4e] hover:text-[#1c1a17]'
                    }`}
                  >
                    Raast / Bank
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                      paymentMethod === 'card'
                        ? 'bg-white text-[#1c1a17] shadow-xs'
                        : 'text-[#615a4e] hover:text-[#1c1a17]'
                    }`}
                  >
                    Card
                  </button>
                </div>

                {paymentMethod === 'cod' && (
                  <div className="p-4 bg-[#f7f4ed] border border-[#eae4d8] space-y-2 text-xs text-[#524a3e]">
                    <div className="flex items-center gap-2 font-bold text-[#1c1a17]">
                      <Banknote size={16} className="text-[#2e7d32]" />
                      <span>Cash on Delivery (Most Popular in Pakistan)</span>
                    </div>
                    <p>
                      Inspect your Noor & Mehr parcel and hand the exact cash to the TCS rider upon doorstep delivery.
                    </p>
                  </div>
                )}

                {paymentMethod === 'raast' && (
                  <div className="p-4 bg-[#f7f4ed] border border-[#eae4d8] space-y-2 text-xs text-[#524a3e]">
                    <div className="flex items-center gap-2 font-bold text-[#1c1a17]">
                      <Building2 size={16} className="text-[#1c1a17]" />
                      <span>Raast / Instant Bank Transfer</span>
                    </div>
                    <p>
                      Instant transfer via Meezan Bank, HBL, Bank Alfalah or Raast ID: <strong>raast@noor-mehr.pk</strong>.
                    </p>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="p-4 bg-white border border-[#eae4d8] space-y-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#696154] mb-1 font-semibold">
                        Card Number (Visa / Mastercard / PayPak)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4242 •••• •••• 4242"
                          className="w-full bg-[#faf8f5] border border-[#d6cfc1] px-3 py-2 text-xs text-[#1c1a17] focus:outline-none"
                        />
                        <CreditCard size={15} className="absolute right-3 top-2.5 text-[#8c8373]" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#696154] mb-1 font-semibold">
                          Expiry
                        </label>
                        <input
                          type="text"
                          required
                          value={cardExp}
                          onChange={(e) => setCardExp(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full bg-[#faf8f5] border border-[#d6cfc1] px-3 py-2 text-xs text-[#1c1a17] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#696154] mb-1 font-semibold">
                          CVV
                        </label>
                        <input
                          type="text"
                          required
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="CVC"
                          className="w-full bg-[#faf8f5] border border-[#d6cfc1] px-3 py-2 text-xs text-[#1c1a17] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Final Order Review */}
                <div className="p-4 bg-[#f2eee6] border border-[#ded6c8] space-y-2 text-xs font-mono tabular-nums">
                  <div className="flex justify-between text-[#666055]">
                    <span>Items ({cart.reduce((s, i) => s + i.quantity, 0)}):</span>
                    <span>{formatPrice(subtotalPKR)}</span>
                  </div>
                  {discountPKR > 0 && (
                    <div className="flex justify-between text-[#2e7d32]">
                      <span>Summer Discount (15%):</span>
                      <span>-{formatPrice(discountPKR)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#666055]">
                    <span>Nationwide Delivery:</span>
                    <span>{calculatedShipping === 0 ? 'Complimentary' : formatPrice(calculatedShipping)}</span>
                  </div>
                  <div className="pt-2 border-t border-[#ded6c8] flex justify-between font-bold text-sm text-[#1c1a17] font-sans">
                    <span>Payable Total:</span>
                    <span className="font-mono text-base">{formatPrice(calculatedTotal)}</span>
                  </div>
                </div>

                {/* Book Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#1c1a17] hover:bg-[#33302b] text-white text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Booking with Courier...</span>
                  ) : (
                    <>
                      <span>Confirm Order (COD) · {formatPrice(calculatedTotal)}</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#7a7265]">
                  <ShieldCheck size={14} />
                  <span>100% Original Brand Guarantee & 7-Day Exchange</span>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
