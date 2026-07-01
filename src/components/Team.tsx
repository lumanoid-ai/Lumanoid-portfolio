import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { useState, useEffect } from 'react';

const LinkedinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const team = [
  { name: 'Muhammad Areeb Khan', role: 'Developer', image: '/images/areeb.png', linkedin: 'https://www.linkedin.com/in/muhammad-areeb-khan-a09564360' },
  { name: 'Musab Ahmed', role: 'Developer', image: '/images/Musab.png', linkedin: 'https://www.linkedin.com/in/musab-ahmed-93b91727b ' },
  { name: 'Mohammad Ghous', role: 'Developer', image: '/images/ghous.jpeg', linkedin: 'https://www.linkedin.com/in/muhammad-ghous-01ab29255' },
  { name: 'Syed Mahmood Ejaz', role: 'Developer / Marketing head', image: '/images/me.jpeg', linkedin: 'https://www.linkedin.com/in/syed-mahmood-ejaz-a93910207' },
];

const Team = () => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains('light-theme'));
    const handler = () => setIsLight(document.documentElement.classList.contains('light-theme'));
    window.addEventListener('theme-change', handler);
    return () => window.removeEventListener('theme-change', handler);
  }, []);

  return (
    <section id="team" className="py-32 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Particles via ThreeJS */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Canvas>
          <ambientLight intensity={0.5} />
          <Sparkles count={100} scale={15} size={isLight ? 3 : 2} speed={0.3} opacity={isLight ? 0.9 : 0.5} color="#FF6B2B" />
          <Sparkles count={100} scale={15} size={isLight ? 2 : 1} speed={0.2} opacity={isLight ? 0.6 : 0.3} color={isLight ? "#444444" : "#FFFFFF"} />
        </Canvas>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold relative inline-block text-white"
          >
            The Minds Behind Luminoid
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute -bottom-3 left-0 w-full h-[2px] bg-primary origin-left"
            ></motion.div>
          </motion.h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#111111] border border-white/5 rounded-lg overflow-hidden group hover:border-primary/50 transition-all duration-300"
            >
              <div className="h-72 overflow-hidden bg-black flex items-center justify-center">
                <img src={member.image} alt={member.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-white tracking-tight mb-2">{member.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{member.role}</p>
                <a 
                  href={member.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
                >
                  <LinkedinIcon />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;