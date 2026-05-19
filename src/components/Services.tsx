import { Bot, Cpu, Network, BarChart3, Code, Layout } from 'lucide-react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

const FloatingShape = ({ hovered }: { hovered: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains('light-theme'));
    const handler = () => setIsLight(document.documentElement.classList.contains('light-theme'));
    window.addEventListener('theme-change', handler);
    return () => window.removeEventListener('theme-change', handler);
  }, []);
  
  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * (hovered ? 2 : 0.5);
      meshRef.current.rotation.y += delta * (hovered ? 2 : 0.6);
    }
  });

  return (
    <mesh ref={meshRef} scale={hovered ? 1.2 : 1}>
      <octahedronGeometry args={[2]} />
      <meshBasicMaterial color={isLight ? "#FFFFFF" : "#0A0A0A"} transparent opacity={isLight ? 0.2 : 0.6} depthWrite={false} />
      <lineSegments>
        <wireframeGeometry args={[new THREE.OctahedronGeometry(2)]} />
        <lineBasicMaterial color="#FF6B2B" transparent opacity={hovered ? 0.8 : (isLight ? 0.6 : 0.15)} />
      </lineSegments>
    </mesh>
  );
};

const ServiceCard = ({ service, index }: { service: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative p-8 group overflow-hidden bg-white/[0.02] border border-white/5 rounded-lg hover:bg-white/[0.04] transition-all duration-200 perspective-1000"
      style={{ transform: isHovered ? 'rotateX(5deg) translateY(-5px)' : 'none' }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <FloatingShape hovered={isHovered} />
        </Canvas>
      </div>

      <div className="relative z-10 transform-style-3d">
        <div className="w-14 h-14 rounded-lg bg-black border border-white/10 flex items-center justify-center mb-6 text-primary transition-transform duration-500 group-hover:-translate-y-2">
          <service.icon size={28} />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors duration-200">
          {service.title}
        </h3>
        <p className="text-gray-400 leading-relaxed text-sm">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
};

const services = [
  { title: 'Chatbot Development', description: 'Smart conversational agents for customer support, sales, and automation.', icon: Bot },
  { title: 'AI Agents', description: 'Autonomous agents that think, plan, and act on behalf of your business.', icon: Cpu },
  { title: 'AI Integrations', description: 'Seamlessly connect AI into your existing tools: CRM, ERP, Slack, WhatsApp.', icon: Network },
  { title: 'Data Dashboard', description: 'Interactive analytics dashboards that surface real-time business intelligence.', icon: BarChart3 },
  { title: 'AI Tools Development', description: 'Custom machine learning tools and pipelines built for your workflow.', icon: Code },
  { title: 'Landing Page Development', description: 'High-converting landing pages optimized for growth and lead generation.', icon: Layout }
];

const Services = () => {
  return (
    <section id="services" className="py-32 relative bg-[#111111]">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold relative inline-block text-white"
          >
            What We Build
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute -bottom-3 left-0 w-full h-[2px] bg-primary origin-left"
            ></motion.div>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
