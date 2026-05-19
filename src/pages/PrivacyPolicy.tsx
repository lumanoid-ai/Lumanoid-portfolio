import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { useState, useEffect } from 'react';

const PrivacyPolicy = () => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains('light-theme'));
    const handler = () => setIsLight(document.documentElement.classList.contains('light-theme'));
    window.addEventListener('theme-change', handler);
    return () => window.removeEventListener('theme-change', handler);
  }, []);

  return (
    <main className="pt-32 pb-20 bg-[#0A0A0A] min-h-screen relative overflow-hidden">
      {/* Premium Aesthetic Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(to right, ${isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.04)'} 1px, transparent 1px), linear-gradient(to bottom, ${isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.04)'} 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 100% 100% at 50% 0%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 50% 0%, #000 40%, transparent 100%)'
        }}
      ></div>

      {/* 3D Floating Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Canvas>
          <ambientLight intensity={0.5} />
          <Sparkles count={50} scale={12} size={isLight ? 2 : 1.5} speed={0.2} opacity={isLight ? 0.6 : 0.3} color={isLight ? "#444444" : "#FFFFFF"} />
          <Sparkles count={30} scale={12} size={isLight ? 3 : 2} speed={0.4} opacity={isLight ? 0.9 : 0.5} color="#FF6B2B" />
        </Canvas>
      </div>

      <div className="absolute top-0 right-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8">
            <span className="text-sm font-medium text-gray-300">Last Updated: October 2023</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-10 text-white tracking-tight">
            Privacy <span className="text-primary">Policy</span>
          </h1>

          <div className="prose prose-invert prose-orange max-w-none text-gray-300 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
              <p>We collect information that you provide directly to us when using our services, including but not limited to:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-400">
                <li>Contact information (such as name, email address, and phone number)</li>
                <li>Business details and requirement specifications</li>
                <li>Communication records and chat transcripts</li>
                <li>Technical data necessary for AI integrations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-400">
                <li>Provide, maintain, and improve our customized AI solutions</li>
                <li>Develop new services, integrations, and intelligent agents</li>
                <li>Communicate with you regarding our services, updates, and support</li>
                <li>Ensure the security and technical integrity of our platforms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Data Sharing and Security</h2>
              <p>We do not sell your personal data. We only share information with certified third-party vendors necessary for providing our AI architecture services, such as cloud providers and strict LLM APIs that conform to enterprise data privacy agreements.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Your Rights</h2>
              <p>Depending on your location, you may have the right to access, correct, or delete your personal data. To exercise these rights, please contact us via our official channels.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
