import React from 'react';

const Watermark: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.03] select-none">
      <div className="w-full h-full grid grid-cols-6 grid-rows-6 gap-8 p-10">
        {Array.from({ length: 36 }).map((_, i) => (
          <div 
            key={i} 
            className="flex items-center justify-center transform -rotate-12"
          >
            <span className="font-serif-en text-xl font-bold text-black whitespace-nowrap">
              FlAstro
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watermark;