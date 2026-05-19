import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Lightbulb, ShieldCheck } from 'lucide-react';

const cards = [
  {
    title: 'Mission',
    icon: Target,
    desc: 'To demystify artificial intelligence and build scalable, intelligent systems that dramatically accelerate human potential.',
    color: 'from-[#FF6B2B]/20 to-transparent',
    border: 'border-[#FF6B2B]/30'
  },
  {
    title: 'Vision',
    icon: Lightbulb,
    desc: 'A future where every business, regardless of size, can operate with the autonomous intelligence of a tech giant.',
    color: 'from-white/10 to-transparent',
    border: 'border-white/20'
  },
  {
    title: 'Values',
    icon: ShieldCheck,
    desc: 'Integrity in data, relentless innovation in engineering, and a commitment to transparent, ethical AI deployment.',
    color: 'from-[#FF6B2B]/10 to-transparent',
    border: 'border-[#FF6B2B]/20'
  }
];

const AboutCompany = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains('light-theme'));
    const handler = () => setIsLight(document.documentElement.classList.contains('light-theme'));
    window.addEventListener('theme-change', handler);
    return () => window.removeEventListener('theme-change', handler);
  }, []);

  // Framer Motion ScrollTrigger equivalent (Locomotive style Horizontal Scroll)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  return (
    <section ref={targetRef} className={`relative h-[300vh] ${isLight ? 'bg-[#FAFAFA]' : 'bg-[#0A0A0A]'}`}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Title */}
        <div className="absolute top-32 left-6 md:left-12 z-50">
          <h2 className={`text-4xl md:text-5xl font-bold tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>
            Our Foundation
          </h2>
          <div className="w-20 h-1 bg-primary mt-4"></div>
        </div>

        {/* Horizontal scroll container */}
        <motion.div style={{ x }} className="flex px-6 md:px-12 pt-20 w-[300vw]">
          {cards.map((card, idx) => (
            <div key={idx} className="w-[100vw] flex-shrink-0 flex items-center justify-start md:justify-center pr-6 md:pr-24">
              <div className={`w-full max-w-3xl ${isLight ? 'bg-white shadow-xl' : 'bg-[#111111]'} border ${card.border} rounded-2xl p-10 md:p-16 relative overflow-hidden group transition-all duration-500`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-20 pointer-events-none`}></div>
                
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8 relative z-10">
                  <div className="w-20 h-20 rounded-2xl bg-black border border-white/10 flex items-center justify-center flex-shrink-0">
                    <card.icon size={40} className="text-primary" />
                  </div>
                  <div>
                    <h3 className={`text-4xl md:text-5xl font-bold mb-4 tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>{card.title}</h3>
                    <p className={`text-lg md:text-xl leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                      {card.desc}
                    </p>
                  </div>
                </div>
                
                {/* Visual Flourish */}
                <div className={`absolute -bottom-10 -right-10 text-[250px] pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6 ${isLight ? 'text-black/5' : 'text-white/5'}`}>
                  <card.icon />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

      </div>    
    </section>
  );
};

export default AboutCompany;
