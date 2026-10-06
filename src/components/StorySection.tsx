import React from 'react';
import { Sparkles, Feather, Scissors } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="atelier-story" className="py-24 bg-[#1a1816] text-[#fbfaf8] border-b border-[#312d27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-[0.26em] text-[#e0d6be] font-semibold">
                Pakistani Textile Heritage
              </span>
              <span className="text-[#a69c87]">·</span>
              <span className="text-xs font-serif italic text-[#d6c7a1]">
                لاھور کی کاریگری
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-white">
              The Living Art of Pakistani Summer Lawn
            </h2>
            <p className="text-sm text-[#dfd7c7] leading-relaxed font-light">
              From the historic looms of Faisalabad to our design atelier in Gulberg, Lahore, 
              Pakistani lawn is globally renowned as the quintessential summer luxury cloth. 
              We spin exclusively with extra-long staple combed 80s count Pima cotton to produce 
              an airy, featherweight weave that naturally breathes through humid subcontinental summers.
            </p>
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-[#38332c]">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#e0d6be] text-xs font-bold uppercase tracking-wider">
                  <Feather size={14} />
                  <span>80s Count Lawn</span>
                </div>
                <p className="text-xs text-[#a39b8c] font-light">
                  Featherlight Pima cotton weave with superior cooling breathability.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#e0d6be] text-xs font-bold uppercase tracking-wider">
                  <Scissors size={14} />
                  <span>Schiffli Cutwork</span>
                </div>
                <p className="text-xs text-[#a39b8c] font-light">
                  Intricate eyelet bore embroidery executed by Punjabi master artisans.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#e0d6be] text-xs font-bold uppercase tracking-wider">
                  <Sparkles size={14} />
                  <span>Pure Chiffon</span>
                </div>
                <p className="text-xs text-[#a39b8c] font-light">
                  Bemberg pure silk & chiffon dupattas with pearl crochet borders.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-6 bg-[#24211d] p-8 border border-[#3b362e] space-y-6">
            <div className="flex items-center justify-between border-b border-[#3b362e] pb-4">
              <span className="text-xs uppercase tracking-widest text-[#aba18f]">Atelier Origin</span>
              <span className="text-xs font-mono text-[#e0d6be]">Gulberg III, Lahore, Pakistan</span>
            </div>

            <div className="space-y-3">
              <h3 className="font-editorial text-2xl text-white">
                Bespoke Atelier Stitching Unit
              </h3>
              <p className="text-xs text-[#bab1a1] leading-relaxed">
                Every Noor & Mehr stitched order is handled by dedicated master tailors. 
                From matching organic cotton slip linings and double-fold daman finishing 
                to hand-sewn pearl potli buttons and custom trouser cuts, we recreate the 
                bespoke boutique fitting experience right to your doorstep.
              </p>
            </div>

            <div className="p-4 bg-[#1c1a17] border border-[#312d27] flex items-center justify-between text-xs">
              <div>
                <p className="text-[#ede5d4] font-semibold">Need custom size adjustments or bridal queries?</p>
                <p className="text-[#8f8779] text-[11px]">Our Lahore master tailors are available on WhatsApp Concierge.</p>
              </div>
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 bg-[#e0d6be] text-[#1a1816] hover:bg-white text-[11px] uppercase tracking-wider font-bold transition-colors shrink-0 ml-3"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
