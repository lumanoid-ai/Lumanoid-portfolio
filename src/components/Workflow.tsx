import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { useState, useEffect } from 'react';

const steps = [
  { num: '01', title: 'Discovery Call', desc: 'Understanding your unique business needs.' },
  { num: '02', title: 'Custom AI Design', desc: 'Architecting the perfect intelligent solution.' },
  { num: '03', title: 'Build & Test', desc: 'Developing and rigorously testing the model.' },
  { num: '04', title: 'Deploy & Scale', desc: 'Launching and scaling for maximum ROI.' },
];

const Workflow = () => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains('light-theme'));
    const handler = () => setIsLight(document.documentElement.classList.contains('light-theme'));
    window.addEventListener('theme-change', handler);
    return () => window.removeEventListener('theme-change', handler);
  }, []);

  return (
    <section className="py-32 relative overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <Canvas>
          <ambientLight intensity={0.5} />
          <Sparkles count={50} scale={10} size={2} speed={0.2} opacity={isLight ? 0.6 : 0.2} color={isLight ? "#333333" : "#FFFFFF"} />
          <Sparkles count={20} scale={10} size={isLight ? 4 : 3} speed={0.5} opacity={isLight ? 0.9 : 0.5} color="#FF6B2B" />
        </Canvas>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold relative inline-block text-white"
          >
            How It Works
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute -bottom-3 left-0 w-full h-[2px] bg-primary origin-left"
            ></motion.div>
          </motion.h2>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative mt-12">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-8 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 z-0">
             <motion.div 
               initial={{ scaleX: 0 }}
               whileInView={{ scaleX: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1.5, ease: "easeInOut" }}
               className="h-full bg-primary origin-left w-full shadow-[0_0_10px_#FF6B2B]"
             />
          </div>

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative z-10 flex flex-col w-full md:w-1/4 mb-10 md:mb-0 px-4 md:items-center"
            >
              <motion.div 
                initial={{ rotateY: -180, opacity: 0 }}
                whileInView={{ rotateY: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="w-16 h-16 rounded-lg bg-[#111111] border border-primary flex items-center justify-center text-xl font-bold text-primary mb-6 shadow-md"
              >
                {step.num}
              </motion.div>
              <h3 className="text-xl font-bold mb-2 text-white md:text-center tracking-tight">{step.title}</h3>
              <p className="text-gray-400 text-sm md:text-center leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workflow;
