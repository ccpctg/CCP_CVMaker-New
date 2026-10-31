import React from 'react';

interface CcpLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'compact' | 'monogram';
  inverted?: boolean;
}

export const CcpLogo: React.FC<CcpLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
  inverted = false,
}) => {
  if (variant === 'monogram') {
    return (
      <div
        className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#fdb813] via-[#f59e0b] to-[#0d3b4c] text-white font-extrabold shadow-md ring-2 ring-amber-400/40 select-none ${
          size === 'sm' ? 'w-8 h-8 text-xs' : size === 'lg' ? 'w-14 h-14 text-xl' : 'w-11 h-11 text-base'
        } ${className}`}
      >
        <span>CCP</span>
        <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
      </div>
    );
  }

  const textColor = inverted ? '#ffffff' : '#0d3b4c';
  const taglineColor = inverted ? '#cbd5e1' : '#475569';

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Outer crop marks blueprint box */}
      <div className="relative px-3 py-1.5 border border-white/20 rounded-sm">
        {/* Corner Crop Crosshairs */}
        <span className="absolute -top-1 -left-1 w-2.5 h-0.5 bg-amber-400/60" />
        <span className="absolute -top-1 -left-1 w-0.5 h-2.5 bg-amber-400/60" />
        <span className="absolute -top-1 -right-1 w-2.5 h-0.5 bg-amber-400/60" />
        <span className="absolute -top-1 -right-1 w-0.5 h-2.5 bg-amber-400/60" />
        <span className="absolute -bottom-1 -left-1 w-2.5 h-0.5 bg-amber-400/60" />
        <span className="absolute -bottom-1 -left-1 w-0.5 h-2.5 bg-amber-400/60" />
        <span className="absolute -bottom-1 -right-1 w-2.5 h-0.5 bg-amber-400/60" />
        <span className="absolute -bottom-1 -right-1 w-0.5 h-2.5 bg-amber-400/60" />

        <div className="flex flex-col items-center leading-none">
          <span className="text-[10px] tracking-wider font-light text-slate-300 self-start pl-0.5">
            Creative
          </span>

          <div className="flex items-center gap-1 my-0.5">
            {/* Word CONCEPT with Sun 'O' */}
            <div className="flex items-center font-black tracking-tight text-white text-base sm:text-lg">
              <span>C</span>
              <span className="relative flex items-center justify-center mx-0.5">
                <span className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#ef4444] via-[#f59e0b] to-[#fdb813] shadow-inner" />
              </span>
              <span>NCEPT</span>
            </div>
            {/* Point */}
            <span className="text-white text-base sm:text-lg font-light tracking-wide ml-1">
              Point
            </span>
          </div>

          {/* Underline Flourish Wave */}
          <div className="w-full flex justify-center -mt-0.5 mb-1">
            <svg width="70" height="6" viewBox="0 0 70 6" fill="none">
              <path
                d="M1 3C15 5.5 35 1 69 4"
                stroke="#fdb813"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Tagline */}
          <span className="text-[8px] font-medium tracking-widest text-slate-200 uppercase mt-0.5">
            Your Vision • Our Creativity
          </span>
        </div>
      </div>
    </div>
  );
};
