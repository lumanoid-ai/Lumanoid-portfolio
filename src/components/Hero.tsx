import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { motion } from 'framer-motion';
import NetworkSphere from './NetworkSphere';
import MagneticButton from './MagneticButton';

const Hero = () => {
  const [textIndex, setTextIndex] = useState(0);
  const words = ['Chatbots', 'AI Agents', 'AI Integrations', 'Data Dashboards', 'AI Tools', 'Landing Pages'];
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains('light-theme'));
    const handler = () => setIsLight(document.documentElement.classList.contains('light-theme'));
    window.addEventListener('theme-change', handler);
    return () => window.removeEventListener('theme-change', handler);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#0A0A0A]">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <NetworkSphere />
          <Sparkles count={200} scale={12} size={isLight ? 3 : 2} speed={0.4} opacity={isLight ? 0.9 : 0.6} color={isLight ? "#FF6B2B" : "#FF6B2B"} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300">Pioneering Next-Gen AI Solutions</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight text-white">
            We Build the Future <br className="hidden md:block"/>
            with <span className="text-primary tracking-tight">AI</span>
          </h1>

          <div className="text-xl md:text-3xl text-gray-400 mb-12 h-10 font-heading">
            Custom{' '}
            <motion.span
              key={textIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-white border-b-2 border-primary pb-1"
            >
              {words[textIndex]}
            </motion.span>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <MagneticButton strength={0.15}>
              <a href="#services" className="block px-8 py-4 bg-primary text-white font-semibold rounded-[8px] hover:bg-[#E05A1E] transition-all duration-200">
                Explore Services
              </a>
            </MagneticButton>
            
            <MagneticButton strength={0.15}>
              <a href="#contact" className="block px-8 py-4 bg-transparent text-white font-semibold rounded-[8px] border-[1.5px] border-white/30 hover:border-primary hover:text-primary transition-colors duration-200">
                Book a Call
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
