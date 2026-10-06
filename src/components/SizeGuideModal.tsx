import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useStore();
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  if (!isSizeGuideOpen) return null;

  const measurements = [
    { size: 'XS (Size 36)', chestIn: '36', waistIn: '33', hipIn: '38', lengthIn: '40', sleeveIn: '21', chestCm: '91', waistCm: '84', hipCm: '96', lengthCm: '101', sleeveCm: '53' },
    { size: 'S (Size 38)', chestIn: '38', waistIn: '35', hipIn: '41', lengthIn: '41', sleeveIn: '21.5', chestCm: '96', waistCm: '89', hipCm: '104', lengthCm: '104', sleeveCm: '55' },
    { size: 'M (Size 40)', chestIn: '41', waistIn: '38', hipIn: '44', lengthIn: '42', sleeveIn: '22', chestCm: '104', waistCm: '96', hipCm: '112', lengthCm: '107', sleeveCm: '56' },
    { size: 'L (Size 42)', chestIn: '44', waistIn: '41', hipIn: '47', lengthIn: '43', sleeveIn: '22.5', chestCm: '112', waistCm: '104', hipCm: '119', lengthCm: '109', sleeveCm: '57' },
    { size: 'XL (Size 44)', chestIn: '47', waistIn: '44', hipIn: '50', lengthIn: '44', sleeveIn: '23', chestCm: '119', waistCm: '112', hipCm: '127', lengthCm: '112', sleeveCm: '58' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#faf8f5] max-w-2xl w-full border border-[#d6cfc1] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-[#eae4d8] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <Ruler size={18} className="text-[#1c1a17]" />
            <h3 className="font-editorial text-2xl font-semibold text-[#1c1a17]">
              Pakistani Ready Kurta & Trouser Size Chart
            </h3>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            aria-label="Close size guide"
            className="p-1.5 text-[#70685b] hover:text-[#1c1a17] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-[#292724]">
          {/* Unit Toggle */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#70685b]">
              All stitched kurtas feature comfortable Pakistani standard room for summer breathability.
            </p>
            <div className="flex items-center border border-[#d6cfc1] bg-[#f5f1e8] p-0.5 shrink-0 ml-4">
              <button
                onClick={() => setUnit('in')}
                className={`px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors ${
                  unit === 'in' ? 'bg-[#1c1a17] text-white shadow-xs' : 'text-[#70685b] hover:text-[#1c1a17]'
                }`}
              >
                Inches
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors ${
                  unit === 'cm' ? 'bg-[#1c1a17] text-white shadow-xs' : 'text-[#70685b] hover:text-[#1c1a17]'
                }`}
              >
                CM
              </button>
            </div>
          </div>

          {/* Measurements Table */}
          <div className="border border-[#eae4d8] overflow-x-auto bg-white">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#f5f1e8] border-b border-[#eae4d8] text-[#70685b] uppercase tracking-wider font-bold">
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Chest</th>
                  <th className="py-3 px-4">Waist</th>
                  <th className="py-3 px-4">Hips</th>
                  <th className="py-3 px-4">Shirt Length</th>
                  <th className="py-3 px-4">Sleeves</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eae4d8] font-mono tabular-nums">
                {measurements.map((m) => (
                  <tr key={m.size} className="hover:bg-[#faf8f5] transition-colors">
                    <td className="py-3 px-4 font-bold text-[#1c1a17] font-sans">{m.size}</td>
                    <td className="py-3 px-4 text-[#524a3e]">{unit === 'in' ? `${m.chestIn}"` : `${m.chestCm} cm`}</td>
                    <td className="py-3 px-4 text-[#524a3e]">{unit === 'in' ? `${m.waistIn}"` : `${m.waistCm} cm`}</td>
                    <td className="py-3 px-4 text-[#524a3e]">{unit === 'in' ? `${m.hipIn}"` : `${m.hipCm} cm`}</td>
                    <td className="py-3 px-4 text-[#524a3e]">{unit === 'in' ? `${m.lengthIn}"` : `${m.lengthCm} cm`}</td>
                    <td className="py-3 px-4 text-[#524a3e]">{unit === 'in' ? `${m.sleeveIn}"` : `${m.sleeveCm} cm`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Measuring Notes */}
          <div className="bg-[#f5f1e8] p-4 border border-[#e2dcd2] space-y-2 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-[#1c1a17]">
              Unstitched vs. Stitched Fabric Notes:
            </h4>
            <p className="text-[#595246]">
              • <strong>Unstitched 3-Piece:</strong> Generous fabric allocation (Shirt 3.25m, Dupatta 2.5m, Trouser 2.5m) easily caters up to XXL tailoring.
            </p>
            <p className="text-[#595246]">
              • <strong>Atelier Tailored:</strong> Hand-crafted by master tailors with pure cotton slip lining, pearl buttons, and finished organza borders.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#eae4d8] bg-white flex justify-end">
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-[#1c1a17] text-white hover:bg-[#33302b] transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
