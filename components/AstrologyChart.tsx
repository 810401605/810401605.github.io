import React from 'react';
import { ChartLayers, LAYERS } from '../types';
import { getAssetUrl } from '../services/assetService';
import { motion } from 'framer-motion';

interface Props {
  data: ChartLayers;
  label: string;
}

const AstrologyChart: React.FC<Props> = ({ data, label }) => {
  return (
    <div className="flex flex-col items-center group">
      <div className="relative w-72 h-72 md:w-96 md:h-96">
        
        {/* Animated Ink Frame Layers - Creating a breathing, organic border */}
        <div className="absolute -inset-4 bg-gray-900/5 rounded-[40%] ink-blob animate-pulse blur-xl pointer-events-none"></div>
        <div className="absolute -inset-2 bg-gray-800/10 rounded-[50%] ink-blob pointer-events-none" style={{ animationDuration: '10s' }}></div>
        <div className="absolute -inset-1 border-2 border-gray-900/20 rounded-[45%] ink-blob pointer-events-none" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
        
        {/* Main Chart Container */}
        <div className="relative w-full h-full rounded-full bg-[#fdfbf7] shadow-2xl overflow-hidden border-4 border-double border-gray-300 z-10 transition-transform duration-700 group-hover:scale-[1.02]">
             {/* Paper Texture */}
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E")` }}></div>

             {/* Layers */}
             {LAYERS.map((layer, index) => (
              <motion.img
                key={layer}
                src={getAssetUrl(layer, data[layer])}
                alt={layer}
                className="absolute top-0 left-0 w-full h-full object-contain mix-blend-multiply"
                style={{ zIndex: index + 1 }}
                initial={{ opacity: 0, rotate: -20, scale: 1.2 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ 
                  duration: 1.5, 
                  delay: index * 0.15, 
                  ease: [0.16, 1, 0.3, 1] // Custom ease out expo
                }}
              />
            ))}
            
             {/* Inner Ring Decoration */}
             <div className="absolute inset-4 rounded-full border border-dashed border-gray-400 opacity-30 pointer-events-none" />
        </div>
      </div>
      
      {/* Label */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
        className="mt-8 text-center relative z-20"
      >
        <span className="font-serif-en text-3xl text-gray-900 tracking-widest block drop-shadow-sm">{label}</span>
        <div className="w-8 h-1 bg-gray-900 mx-auto mt-2 rounded-full opacity-50"></div>
      </motion.div>
    </div>
  );
};

export default AstrologyChart;