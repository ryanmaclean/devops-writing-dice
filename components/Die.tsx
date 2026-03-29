
import React, { useRef, useState, useLayoutEffect, useMemo, useEffect } from "react";
import { DieData } from "../types";

interface DieProps {
  data: DieData;
  rolling: boolean;
  onToggleLock: (id: string) => void;
}

export const Die: React.FC<DieProps> = ({ data, rolling, onToggleLock }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [halfSize, setHalfSize] = useState(50);
  const [landing, setLanding] = useState(false);
  const prevRolling = useRef(rolling);

  // Measure container to ensure perfect cube shape regardless of grid size
  useLayoutEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setHalfSize(containerRef.current.clientWidth / 2);
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Detect end of rolling to trigger landing animation
  useEffect(() => {
    if (prevRolling.current && !rolling) {
      setLanding(true);
      const timer = setTimeout(() => setLanding(false), 400); // Match CSS duration
      return () => clearTimeout(timer);
    }
    prevRolling.current = rolling;
  }, [rolling]);

  // Determine styles based on locked state
  const lockedStyles = data.isLocked 
    ? "opacity-90 grayscale-[0.6] ring-4 ring-slate-900 z-0 scale-95" 
    : "hover:scale-105 cursor-pointer active:scale-95 z-10 hover:z-20 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]";

  // PS1/Devil Dice Style: Solid colors, less transparency, more "plastic" look
  const faceCommonClass = `cube-face ${data.color}`;

  // Get random "filler" options for other faces to simulate a real die with values
  const fillerOptions = useMemo(() => {
    const opts = data.options.length > 0 ? data.options : ["?", "?", "?", "?", "?"];
    // Shuffle and pick 5
    return [...opts]
      .sort(() => 0.5 - Math.random())
      .slice(0, 5)
      // Ensure we have 5 items even if options are few
      .concat(["...", "...", "...", "...", "..."])
      .slice(0, 5);
  }, [data.options, data.id]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full aspect-square ${lockedStyles} transition-all duration-300 select-none perspective-container`}
      onClick={() => onToggleLock(data.id)}
      style={{ '--die-half': `${halfSize}px` } as React.CSSProperties}
    >
      <div className="scene">
        <div className={`bounce-wrapper ${landing ? 'animate-land' : ''}`}>
          <div className={`cube ${rolling && !data.isLocked ? "animate-tumble" : ""}`}>
            
            {/* FRONT FACE - Main Value (The Result) */}
            <div className={`${faceCommonClass} face-front flex-col p-2`}>
              {/* Category Label - Retro Style */}
              <div className="bg-black text-white px-2 py-0.5 mb-1 w-full text-center border-b-2 border-white/20">
                <span className="text-[8px] uppercase tracking-widest font-retro">
                  {data.category}
                </span>
              </div>
              
              <div className="flex-grow flex items-center justify-center w-full overflow-hidden px-1">
                <span className="text-xs sm:text-sm md:text-base font-bold leading-tight font-retro text-center break-words drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
                  {data.value}
                </span>
              </div>

              {data.isLocked && (
                <div className="absolute top-1 right-1 text-red-500 drop-shadow-md bg-black border border-white rounded-none p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            {/* OTHER FACES - Render filler content for realistic tumble */}
            {[
              { class: 'face-back', val: fillerOptions[0] },
              { class: 'face-right', val: fillerOptions[1] },
              { class: 'face-left', val: fillerOptions[2] },
              { class: 'face-top', val: fillerOptions[3] },
              { class: 'face-bottom', val: fillerOptions[4] },
            ].map((face, idx) => (
              <div key={idx} className={`${faceCommonClass} ${face.class} flex-col p-2 bg-blend-multiply`}>
                 <div className="opacity-50 flex items-center justify-center w-full h-full text-center text-[8px] font-retro leading-tight">
                  {face.val}
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};
