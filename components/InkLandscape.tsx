import React from 'react';
import { motion } from 'framer-motion';

const InkLandscape: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden flex flex-col justify-end">
      {/* Background Mist */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-100/20 to-gray-200/50" />

      {/* Layer 3 (Furthest - Lightest) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute bottom-0 left-0 right-0 h-[40vh] opacity-30"
      >
         <svg viewBox="0 0 1440 320" className="w-full h-full object-cover" preserveAspectRatio="none">
           <path fill="#9ca3af" fillOpacity="0.5" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
         </svg>
      </motion.div>

      {/* Layer 2 (Middle - Medium) */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2.5, delay: 0.2 }}
        className="absolute bottom-0 left-0 right-0 h-[35vh] opacity-40 mix-blend-multiply"
      >
         <svg viewBox="0 0 1440 320" className="w-full h-full object-cover" preserveAspectRatio="none">
             <filter id="blurFilter2">
                 <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
             </filter>
           <path filter="url(#blurFilter2)" fill="#6b7280" fillOpacity="0.6" d="M0,192L60,197.3C120,203,240,213,360,202.7C480,192,600,160,720,165.3C840,171,960,213,1080,224C1200,235,1320,213,1380,202.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
         </svg>
      </motion.div>

      {/* Layer 1 (Closest - Darkest with Ink Texture) */}
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 3, delay: 0.4 }}
        className="absolute bottom-0 left-0 right-0 h-[30vh] opacity-60 mix-blend-multiply"
      >
         <svg viewBox="0 0 1440 320" className="w-full h-full object-cover" preserveAspectRatio="none">
             <filter id="inkBlur">
                 <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                 <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
                 <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
             </filter>
           <path filter="url(#inkBlur)" fill="#374151" fillOpacity="0.8" d="M0,160L48,176C96,192,192,224,288,229.3C384,235,480,213,576,192C672,171,768,149,864,160C960,171,1056,213,1152,229.3C1248,245,1344,235,1392,229.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
         </svg>
      </motion.div>
    </div>
  );
};

export default InkLandscape;