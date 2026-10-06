import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#171717] text-white p-3.5 shadow-xl border border-[#3b3834] flex items-start justify-between gap-3 animate-slideUp text-xs"
        >
          <div className="flex items-start gap-2.5">
            {toast.type === 'error' ? (
              <AlertCircle size={16} className="text-[#e57373] shrink-0 mt-0.5" />
            ) : toast.type === 'info' ? (
              <Info size={16} className="text-[#90caf9] shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 size={16} className="text-[#a5d6a7] shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-semibold text-white tracking-wide">{toast.title}</p>
              {toast.subtitle && (
                <p className="text-[#c2bcaf] text-[11px] mt-0.5 font-light">{toast.subtitle}</p>
              )}
            </div>
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            aria-label="Dismiss notification"
            className="text-[#8f887c] hover:text-white transition-colors p-0.5"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
