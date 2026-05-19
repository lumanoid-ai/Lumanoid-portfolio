import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Grid } from '@react-three/drei';
import { useState, useEffect } from 'react';

const Contact = () => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains('light-theme'));
    const handler = () => setIsLight(document.documentElement.classList.contains('light-theme'));
    window.addEventListener('theme-change', handler);
    return () => window.removeEventListener('theme-change', handler);
  }, []);

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-[#111111]">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 transform-gpu rotate-x-60 scale-150 origin-bottom translate-y-1/4">
        <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
          <Grid
            renderOrder={-1}
            position={[0, -1, 0]}
            infiniteGrid
            fadeDistance={10}
            sectionColor="#FF6B2B"
            cellColor={isLight ? "#FFAA88" : "#FF6B2B"}
            sectionThickness={isLight ? 1.5 : 1}
            cellThickness={isLight ? 0.8 : 0.5}
          />
        </Canvas>
      </div>
      
      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
          >
            Ready to Transform Your Business with <span className="text-primary">AI?</span>
          </motion.h2>
          <p className="text-gray-400 text-base">Leave your details and we'll get back to you to schedule a discovery call.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#1A1A1A] p-8 md:p-10 border border-white/5 rounded-lg shadow-xl relative"
        >
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Name</label>
              <input type="text" className="w-full bg-[#111111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-all duration-200 focus:-translate-y-0.5 shadow-sm" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email</label>
              <input type="email" className="w-full bg-[#111111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-all duration-200 focus:-translate-y-0.5 shadow-sm" placeholder="john@company.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Company</label>
              <input type="text" className="w-full bg-[#111111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-all duration-200 focus:-translate-y-0.5 shadow-sm" placeholder="Company Inc." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Service Interest</label>
              <select className="w-full bg-[#111111] border border-white/10 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-primary transition-all duration-200 focus:-translate-y-0.5 appearance-none shadow-sm">
                <option>AI Chatbots</option>
                <option>AI Agents</option>
                <option>AI Integrations</option>
                <option>Other / Not Sure</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-300">Message</label>
              <textarea rows={4} className="w-full bg-[#111111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-all duration-200 focus:-translate-y-0.5 resize-none shadow-sm" placeholder="Tell us about your project..."></textarea>
            </div>
            <div className="md:col-span-2 pt-4">
              <button type="button" className="w-full py-4 bg-primary text-white font-semibold rounded-lg relative overflow-hidden transition-all duration-200 active:translate-y-1 shadow-[0_4px_0_#CC5522] active:shadow-[0_0px_0_#CC5522]">
                Send Message
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
