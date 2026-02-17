import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Clock, ChevronRight } from 'lucide-react';
import { DivinationResult } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  history: DivinationResult[];
  onSelect: (item: DivinationResult) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}

const HistorySidebar: React.FC<Props> = ({ isOpen, onClose, history, onSelect, onDelete, onClear }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-[#f8f6f2] shadow-2xl z-50 flex flex-col border-l border-gray-200"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-white/50">
              <h2 className="font-serif-en text-xl text-gray-800 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                History
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors cursor-pointer">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {history.length === 0 ? (
                <div className="text-center text-gray-400 mt-20 font-serif-en text-lg">
                   No History Yet
                </div>
              ) : (
                history.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
                  >
                    {/* Main Click Area for Selection */}
                    <div 
                        className="absolute inset-0 z-0 cursor-pointer"
                        onClick={() => onSelect(item)} 
                    />

                    <div className="relative z-10 flex justify-between items-start mb-2 pointer-events-none">
                      <span className="text-xs font-mono text-gray-400">
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                      {/* Delete Button - Needs pointer-events-auto because parent has none */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(item.id);
                        }}
                        className="pointer-events-auto p-2 -mr-2 -mt-2 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors z-20 cursor-pointer"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="relative z-0 pointer-events-none">
                        <h3 className="font-medium text-gray-800 line-clamp-2 pr-4 font-serif-en">
                        {item.question}
                        </h3>
                        <div className="mt-3 flex items-center text-sm text-purple-900 font-medium opacity-0 group-hover:opacity-100 transition-opacity font-serif-en">
                        View Chart <ChevronRight className="w-4 h-4 ml-1" />
                        </div>
                    </div>
                    
                    {/* Decorative mark */}
                    <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gray-50 rounded-full z-0 pointer-events-none" />
                  </motion.div>
                ))
              )}
            </div>
            
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
              <span className="text-xs text-gray-400 font-mono">FlAstro Storage</span>
              {history.length > 0 && (
                 <button 
                  onClick={onClear}
                  className="text-xs text-red-500 hover:text-red-700 font-serif-en flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-red-50 cursor-pointer"
                 >
                   <Trash2 className="w-3 h-3" /> Clear All
                 </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default HistorySidebar;