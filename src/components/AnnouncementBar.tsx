import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside aria-label="Announcement" className="bg-[#1f1d19] text-[#f4efe6] text-xs py-2 px-4 flex items-center justify-between border-b border-[#3b362e] tracking-wide relative z-40 transition-all">
      <div className="flex-1 text-center font-normal flex items-center justify-center gap-2">
        <Sparkles size={12} className="text-[#d8cca8] hidden sm:inline" />
        <span>Bahaar Summer Lawn '26 is Live</span>
        <span className="text-[#8c857b]">·</span>
        <span>Free Nationwide Cash on Delivery (COD) on orders over Rs. 5,000</span>
        <span className="text-[#8c857b] hidden md:inline">·</span>
        <span className="text-[#d8cca8] font-medium hidden md:inline">Use code SUMMER26 for 15% off</span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        aria-label="Dismiss banner"
        className="text-[#8c857b] hover:text-[#f4efe6] p-1 transition-colors ml-2"
      >
        <X size={13} />
      </button>
    </aside>
  );
};
