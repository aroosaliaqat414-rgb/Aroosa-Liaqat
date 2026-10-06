import React from 'react';
import { ArrowDown, Compass, Sparkles } from 'lucide-react';
import { PAKISTANI_HERO_IMAGE } from '../data/products';

interface HeroSectionProps {
  onExploreCollection: () => void;
  onOpenLookbook: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCollection,
  onOpenLookbook,
}) => {
  return (
    <section className="relative w-full bg-[#181614] text-[#fbfaf8] overflow-hidden">
      {/* Hero Media Background */}
      <div className="relative w-full h-[78vh] min-h-[580px] max-h-[820px]">
        <img
          src={PAKISTANI_HERO_IMAGE}
          alt="Noor & Mehr Summer Lawn 2026 Campaign - Pakistani Luxury Embroidered Lawn in Heritage Lahore Veranda"
          className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.04]"
          referrerPolicy="no-referrer"
        />

        {/* Contrast Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/35 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141210]/60 via-transparent to-transparent" />

        {/* Content Container */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 sm:pb-16">
          <div className="max-w-2xl">
            {/* Editorial kicker */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs uppercase tracking-[0.28em] text-[#e0d6be] font-semibold">
                Bahaar · Summer Lawn & Festive '26
              </span>
              <span className="text-[#a69c87]">·</span>
              <span className="text-xs text-[#d6c7a1] font-serif italic tracking-wide">
                Volume 01
              </span>
            </div>

            {/* Display headline */}
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-wide leading-[1.08] mb-4 text-balance">
              The Poetry of Pakistani Summer Lawn
            </h1>

            {/* Editorial prose */}
            <p className="text-[#ded6c5] text-sm sm:text-base leading-relaxed font-light mb-8 max-w-xl">
              Featherweight 80s count Pima cotton lawn, intricate Schiffli Chikankari cutwork, 
              and billowing pure Bemberg chiffon dupattas inspired by Mughal garden architecture. 
              Available unstitched or with bespoke atelier tailoring.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreCollection}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider bg-white text-[#171717] hover:bg-[#ede7da] transition-colors shadow-sm"
              >
                <span>Shop Summer Lawn</span>
                <ArrowDown size={14} />
              </button>

              <button
                onClick={onOpenLookbook}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-medium uppercase tracking-wider text-white border border-[#eae6de]/40 hover:border-white hover:bg-white/10 transition-colors backdrop-blur-xs"
              >
                <Compass size={14} />
                <span>Summer Lookbook</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Adjacency Strip for Pakistani Market */}
      <div className="border-t border-[#312d26] bg-[#1a1815] py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs tracking-wider text-[#aba18f] uppercase font-light">
          <div>
            <span className="text-[#ede5d4] font-medium">Cash On Delivery</span> · All Major Pakistani Cities
          </div>
          <div className="hidden sm:block">
            <span className="text-[#ede5d4] font-medium">Custom Tailoring</span> · Standard & Bespoke Sizes
          </div>
          <div>
            <span className="text-[#ede5d4] font-medium">Worldwide Shipping</span> · 3-5 Days via DHL Express
          </div>
        </div>
      </div>
    </section>
  );
};
