import React, { useState, useEffect } from 'react';
import { 
  History, 
  Sparkles, 
  DownloadCloud, 
  Feather,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { ChartLayers, DivinationResult, LAYERS } from './types';
import { cacheAllAssets } from './services/assetService';

import Watermark from './components/Watermark';
import InkEffects from './components/InkEffects';
import InkLandscape from './components/InkLandscape';
import { InkButton } from './components/InkButton';
import AstrologyChart from './components/AstrologyChart';
import HistorySidebar from './components/HistorySidebar';

// Utility for random integer 1-12
const getRandomInt = () => Math.floor(Math.random() * 12) + 1;

const generateRandomChart = (): ChartLayers => {
  const chart: Partial<ChartLayers> = {};
  LAYERS.forEach(layer => {
    chart[layer] = getRandomInt();
  });
  return chart as ChartLayers;
};

const App: React.FC = () => {
  // State
  const [question, setQuestion] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentResult, setCurrentResult] = useState<DivinationResult | null>(null);
  const [history, setHistory] = useState<DivinationResult[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Caching State
  const [cachingProgress, setCachingProgress] = useState(0);
  const [isCaching, setIsCaching] = useState(false);

  // Load History on Mount
  useEffect(() => {
    // Migrating old key if necessary, or just starting fresh/parallel
    const saved = localStorage.getItem('flastro_history'); 
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // Save History on Change
  useEffect(() => {
    localStorage.setItem('flastro_history', JSON.stringify(history));
  }, [history]);

  const handleGenerate = () => {
    // Question is optional now. 
    // If empty, use current formatted date/time.
    const finalQuestion = question.trim() ? question : new Date().toLocaleString();

    setIsGenerating(true);

    // Simulate "Divination" calculation time with animation
    setTimeout(() => {
      // Use random suffix to ensure unique IDs even if generated same ms
      const newResult: DivinationResult = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        question: finalQuestion,
        chart1: generateRandomChart(),
        chart2: generateRandomChart()
      };

      setCurrentResult(newResult);
      setHistory(prev => [newResult, ...prev]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCacheAssets = async () => {
    setIsCaching(true);
    setCachingProgress(0);
    try {
      await cacheAllAssets((progress) => {
        setCachingProgress(progress);
      });
      alert("Resources cached successfully! You can now use this offline.");
    } catch (error) {
      alert("Failed to cache resources.");
    } finally {
      setIsCaching(false);
    }
  };

  const handleDeleteHistory = (id: string) => {
    if (window.confirm("Delete this record?")) {
      setHistory(prev => prev.filter(item => item.id !== id));
      if (currentResult?.id === id) {
        setCurrentResult(null);
        setQuestion('');
      }
    }
  };

  const handleClearHistory = () => {
    if (history.length === 0) return;
    if (window.confirm("Delete all history records? This cannot be undone.")) {
      setHistory([]);
      setCurrentResult(null);
      setQuestion('');
    }
  };

  const handleSelectHistory = (item: DivinationResult) => {
    setCurrentResult(item);
    setQuestion(item.question);
    setSidebarOpen(false);
  };

  const handleReset = () => {
    setCurrentResult(null);
    setQuestion('');
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center overflow-x-hidden">
      <Watermark />
      <InkEffects />
      <InkLandscape />
      
      {/* Top Bar */}
      <nav className="w-full p-6 flex justify-between items-center z-20 relative">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-serif-en font-bold text-lg border-2 border-gray-700 shadow-xl">
            Fl
          </div>
          <h1 className="text-2xl font-serif-en font-bold tracking-widest text-gray-900 hidden md:block">
            FlAstro
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={handleCacheAssets} 
            disabled={isCaching}
            className="hidden md:flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            title="Download offline resources"
          >
            {isCaching ? (
              <span className="font-mono">{cachingProgress}%</span>
            ) : (
              <>
                <DownloadCloud className="w-4 h-4" />
                <span className="font-serif-en">Offline Mode</span>
              </>
            )}
          </button>
          
          <InkButton 
            variant="secondary" 
            onClick={() => setSidebarOpen(true)}
            icon={<History className="w-4 h-4" />}
          >
            History
          </InkButton>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 z-10 flex flex-col relative">
        
        {/* Intro / Question Section */}
        <AnimatePresence mode="wait">
          {!currentResult && !isGenerating ? (
            <motion.div 
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center min-h-[50vh]"
            >
              <div className="text-center mb-10">
                <h2 className="text-5xl md:text-7xl font-serif-en text-gray-900 mb-4 drop-shadow-sm tracking-tight">Divination</h2>
                <p className="font-ink text-3xl md:text-4xl text-gray-600 tracking-wide">
                  星盘流转 · 问心求索
                </p>
              </div>

              <div className="w-full max-w-xl relative group">
                {/* Glow effect behind input */}
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                
                <div className="relative bg-white/60 backdrop-blur-md rounded-lg p-1 shadow-lg border border-gray-200/50">
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Enter your question (optional)..."
                    className="w-full h-32 p-4 bg-transparent border-none focus:ring-0 text-center text-lg text-gray-800 font-serif-en resize-none placeholder:text-gray-500"
                  />
                  <div className="flex justify-center pb-4">
                     <InkButton onClick={handleGenerate} icon={<Sparkles className="w-4 h-4" />}>
                       Generate
                     </InkButton>
                  </div>
                </div>
              </div>

               {/* Mobile offline button fallback */}
               <div className="mt-8 md:hidden text-center">
                <button 
                    onClick={handleCacheAssets} 
                    disabled={isCaching}
                    className="text-xs text-gray-400 underline font-serif-en"
                  >
                    {isCaching ? `Downloading... ${cachingProgress}%` : "Download Offline Assets"}
                  </button>
               </div>
            </motion.div>
          ) : isGenerating ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-gray-900 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="mt-8 font-serif-en text-xl animate-pulse text-gray-700 tracking-widest">
                Divining...
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full"
            >
              {/* Result Header */}
              <div className="text-center mb-12 relative">
                <div className="inline-block relative bg-white/40 backdrop-blur-sm rounded-lg shadow-sm border border-white/50">
                   <h2 className="text-2xl md:text-3xl font-serif-en font-bold text-gray-900 px-8 py-4 border-b border-gray-200">
                     {currentResult?.question}
                   </h2>
                   <div className="text-sm font-mono text-gray-500 py-2">
                     {new Date(currentResult!.timestamp).toLocaleString()}
                   </div>
                </div>
                
                <button 
                  onClick={handleReset}
                  className="absolute top-0 right-0 p-2 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
                  title="New Divination"
                >
                  <RefreshCw className="w-6 h-6" />
                </button>
              </div>

              {/* Charts Container */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center justify-center">
                {currentResult && (
                  <>
                    <AstrologyChart data={currentResult.chart1} label="Emotion" />
                    <AstrologyChart data={currentResult.chart2} label="Truth" />
                  </>
                )}
              </div>

              <div className="mt-16 text-center max-w-2xl mx-auto">
                 <div className="p-6 bg-white/40 backdrop-blur-sm rounded-xl border border-white/50 shadow-sm">
                    <Feather className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                    <p className="font-ink text-2xl text-gray-800 leading-loose">
                      星盘已成。观星如观心，万象皆由心生。
                    </p>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="w-full p-4 text-center z-10 opacity-40">
        <p className="text-xs font-serif-en">© {new Date().getFullYear()} FlAstro</p>
      </footer>

      {/* Sidebar Overlay */}
      <HistorySidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        history={history}
        onSelect={handleSelectHistory}
        onDelete={handleDeleteHistory}
        onClear={handleClearHistory}
      />
    </div>
  );
};

export default App;