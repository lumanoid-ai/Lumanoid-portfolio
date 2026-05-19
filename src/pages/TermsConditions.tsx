import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { useState, useEffect } from 'react';

const TermsConditions = () => {
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
            Terms & <span className="text-primary">Conditions</span>
          </h1>

          <div className="prose prose-invert prose-orange max-w-none text-gray-300 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p>By accessing and using Luminoid AI's services and website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please refrain from using our services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Services Scope</h2>
              <p>Luminoid AI provides custom artificial intelligence solutions, including AI Agents, Chatbots, and system integrations. The specific scope, deliverables, and timelines for each project will be defined in individual Service Level Agreements (SLAs) or Statements of Work (SOW).</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property</h2>
              <p>Unless explicitly stated otherwise in a custom SLA, pre-existing tools, models, and architectures remain the intellectual property of Luminoid AI. Upon full payment, clients receive a perpetual, non-exclusive license to utilize the delivered solutions for their defined business cases.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Limitation of Liability</h2>
              <p>AI generated outputs are probabilistic. Luminoid AI cannot guarantee 100% accuracy in LLM generations or autonomous agent actions. Clients are responsible for providing 'human-in-the-loop' oversight where critical business or financial operations are reliant on AI.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Revisions</h2>
              <p>We maintain the right to update these terms at our discretion. Continued use of our site and services after any revisions proves your acceptance of the updated terms.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default TermsConditions;
