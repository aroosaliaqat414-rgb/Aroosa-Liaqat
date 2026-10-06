import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Check, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email', '', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed to VIP Lawn Dispatches', 'You will receive early access before Volume 02 launch', 'success');
  };

  return (
    <footer className="bg-[#141210] text-[#e8e3d8] pt-20 pb-12 border-t border-[#292520]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Newsletter & Brand Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#292520]">
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <h3 className="font-editorial text-3xl font-normal tracking-[0.18em] uppercase text-white">
                NOOR & MEHR
              </h3>
              <span className="font-serif text-lg text-[#d6c7a1]">نور اور مہر</span>
            </div>
            <p className="text-xs text-[#a8a092] leading-relaxed max-w-md font-light">
              Pioneering contemporary luxury lawn, bespoke Chikankari cutwork, and festive organza 
              textiles. Crafted with pride in Lahore, Pakistan, and shipped to discerning wardrobes worldwide.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#e0d6be] font-bold block">
              Summer Lawn VIP Launch Alerts
            </span>
            <p className="text-xs text-[#a8a092] font-light">
              Receive private catalog lookbooks and priority stock reservations before Eid festive releases sell out.
            </p>
            {subscribed ? (
              <div className="p-3 bg-[#24211d] border border-[#3b362e] text-xs text-[#e0d6be] flex items-center gap-2">
                <Check size={14} className="text-[#81c784]" />
                <span>You are subscribed to Noor & Mehr VIP dispatches.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-[#24211d] border border-[#3b362e] text-xs px-3.5 py-2.5 text-white placeholder-[#787163] focus:outline-none focus:border-[#e0d6be]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#e0d6be] text-[#141210] hover:bg-white text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-1.5"
                >
                  <span>Join</span>
                  <ArrowRight size={13} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4-column structured navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs text-[#a8a092]">
          <div className="space-y-3">
            <h4 className="uppercase tracking-widest text-white font-bold text-[11px]">
              Customer Care & COD
            </h4>
            <ul className="space-y-2 font-light">
              <li><a href="#top" className="hover:text-white transition-colors">Cash On Delivery (COD) Terms</a></li>
              <li><a href="#top" className="hover:text-white transition-colors">TCS & Courier Order Tracking</a></li>
              <li><a href="#top" className="hover:text-white transition-colors">7-Day Unstitched Exchange Policy</a></li>
              <li><a href="#top" className="hover:text-white transition-colors">Stitching & Custom Measurement Guide</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="uppercase tracking-widest text-white font-bold text-[11px]">
              Summer Collections
            </h4>
            <ul className="space-y-2 font-light">
              <li><a href="#top" className="hover:text-white transition-colors">Bahaar Luxury Lawn Vol. 01</a></li>
              <li><a href="#top" className="hover:text-white transition-colors">Schiffli Chikankari 3-Piece</a></li>
              <li><a href="#top" className="hover:text-white transition-colors">Eid Festive Organza Edits</a></li>
              <li><a href="#top" className="hover:text-white transition-colors">Summer Lawn Printed Co-ords</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="uppercase tracking-widest text-white font-bold text-[11px]">
              Fabric & Quality
            </h4>
            <ul className="space-y-2 font-light">
              <li><a href="#atelier-story" className="hover:text-white transition-colors">80s Count Combed Pima Lawn</a></li>
              <li><a href="#atelier-story" className="hover:text-white transition-colors">Bemberg Pure Chiffon Dupattas</a></li>
              <li><a href="#atelier-story" className="hover:text-white transition-colors">Colorfast Reactive Printing</a></li>
              <li><a href="#atelier-story" className="hover:text-white transition-colors">Atelier Custom Tailoring Standards</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="uppercase tracking-widest text-white font-bold text-[11px]">
              Flagship Boutiques
            </h4>
            <ul className="space-y-2 font-light">
              <li><span className="text-white font-medium">Lahore:</span> MM Alam Road, Gulberg III</li>
              <li><span className="text-white font-medium">Karachi:</span> Dolmen Mall, Clifton</li>
              <li><span className="text-white font-medium">Islamabad:</span> Beverly Centre, Blue Area</li>
              <li><span className="text-white font-medium">WhatsApp Helpline:</span> +92 300 1234567</li>
            </ul>
          </div>
        </div>

        {/* Bottom quiet copyright */}
        <div className="pt-8 border-t border-[#24211d] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#787163]">
          <div>
            © {new Date().getFullYear()} Noor & Mehr Luxury Pret Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#top" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#top" className="hover:text-white transition-colors">Terms of Sale</a>
            <a href="#top" className="hover:text-white transition-colors">TCS Courier Tracking</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
