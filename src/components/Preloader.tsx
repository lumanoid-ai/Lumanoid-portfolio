import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const fullText = "INITIALIZING LUMINOID ENGINE...";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, currentIndex));
      currentIndex++;
      if (currentIndex > fullText.length) {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 900);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-primary"
        >
          <div className="relative flex flex-col items-center">
            {/* Stylized Spinner */}
            <div className="relative w-24 h-24 mb-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="absolute inset-0 border border-white/5 border-t-primary border-l-primary rounded-full blur-[2px]"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute inset-2 border border-white/10 border-b-primary rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-primary rounded-sm transform rotate-45 animate-pulse"></div>
              </div>
            </div>
            
            {/* Typing Text */}
            <div className="text-xs md:text-sm tracking-[0.3em] font-heading font-semibold text-white uppercase flex items-center gap-1">
              {text}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="inline-block w-2 h-4 bg-primary"
              ></motion.span>
            </div>
            
            <div className="mt-4 text-[10px] text-gray-600 tracking-[0.2em] font-mono">
              SYSTEM MEMORY OK • NEURAL NET ONLINE
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
