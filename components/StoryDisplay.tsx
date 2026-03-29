
import React from 'react';

interface StoryDisplayProps {
  story: string;
  loading: boolean;
  timelineImages: string[];
  generatingImages: boolean;
}

export const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, loading, timelineImages, generatingImages }) => {
  return (
    <div className="relative w-full">
      {/* Retro background shadow */}
      <div className="absolute top-0 left-0 w-full h-full bg-black rounded-none transform translate-x-2 translate-y-2"></div>
      
      <div className="relative bg-white border-4 border-black p-6 min-h-[400px] flex flex-col">
        <div className="mb-4 border-b-4 border-black pb-4 flex justify-between items-center bg-yellow-300 -mx-6 -mt-6 px-6 pt-6">
            <h2 className="text-sm md:text-base font-bold font-retro text-black uppercase">Mission Log</h2>
            <div className="flex gap-2">
                <div className="w-3 h-3 border-2 border-black bg-red-500"></div>
                <div className="w-3 h-3 border-2 border-black bg-yellow-500"></div>
                <div className="w-3 h-3 border-2 border-black bg-green-500"></div>
            </div>
        </div>
        
        {/* Story Text Area */}
        <div className="font-mono text-sm text-slate-800 leading-relaxed whitespace-pre-line mb-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4 opacity-50">
              <div className="w-8 h-8 border-4 border-black border-t-transparent animate-spin rounded-full"></div>
              <p className="text-xs font-retro animate-pulse">Consulting Mainframe...</p>
            </div>
          ) : story ? (
             <div className="animate-fade-in p-2 bg-slate-50 border-2 border-slate-200">
               {story.split('\n').map((paragraph, idx) => (
                 paragraph.trim() && <p key={idx} className="mb-4">{paragraph}</p>
               ))}
             </div>
          ) : (
            <div className="flex items-center justify-center py-12 text-slate-400 italic font-retro text-xs text-center">
              INITIATE DICE ROLL<br/>TO GENERATE SCENARIO
            </div>
          )}
        </div>

        {/* Visual Timeline Area */}
        {(story && !loading) && (
          <div className="mt-auto pt-4 border-t-4 border-black border-dashed">
            <h3 className="text-xs font-retro mb-3 uppercase text-slate-900">Visual Timeline</h3>
            
            {generatingImages ? (
              <div className="flex gap-2 animate-pulse overflow-hidden">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-1/3 aspect-square bg-slate-200 border-2 border-slate-400 flex items-center justify-center">
                     <span className="text-[8px] font-retro text-slate-500">RENDERING...</span>
                   </div>
                 ))}
              </div>
            ) : timelineImages.length > 0 ? (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {timelineImages.map((img, idx) => (
                  <div key={idx} className="flex-1 min-w-[30%] group relative">
                    <div className="w-full aspect-square border-2 border-black bg-black overflow-hidden relative">
                      <img src={img} alt={`Scene ${idx+1}`} className="object-cover w-full h-full hover:scale-110 transition-transform duration-500" />
                      <div className="absolute bottom-0 left-0 bg-black text-white text-[8px] font-retro px-1 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        {idx === 0 ? 'START' : idx === 1 ? 'CRISIS' : 'END'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}
        
        <div className="mt-4 text-[10px] text-slate-500 font-retro flex justify-between uppercase">
            <span>ARC: MAN-IN-HOLE</span>
            <span>STATUS: {loading ? 'LOADING' : story ? 'COMPLETE' : 'IDLE'}</span>
        </div>
      </div>
    </div>
  );
};
