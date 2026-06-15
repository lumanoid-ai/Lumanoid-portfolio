
import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LinkedinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5 py-16 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <Canvas>
          <ambientLight intensity={0.5} />
          <Sparkles count={50} scale={10} size={1} speed={0.1} opacity={0.3} color="#FFFFFF" />
        </Canvas>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          
          <div className="text-center md:text-left">
            <Link to="/" className="flex items-center gap-2 mb-3 justify-center md:justify-start group">
              <motion.div 
                animate={{ y: [-2, 2, -2], rotate: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-6 h-6 bg-primary rounded-sm transform rotate-45 group-hover:rotate-90 transition-transform duration-300"
              ></motion.div>
              <span className="text-xl font-bold font-heading text-white tracking-tight">Luminoid AI</span>
            </Link>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">Powering the next generation of intelligent businesses through cutting-edge artificial intelligence.</p>
          </div>

          <div className="flex gap-4">
            <a href="https://www.linkedin.com/in/lumanoid-ai-335246401" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[#111111] border border-white/5 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors duration-200">
              <LinkedinIcon />
            </a>
            <a href="https://www.instagram.com/your-instagram-handle" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[#111111] border border-white/5 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors duration-200">
              <InstagramIcon />
            </a>
            <a href="https://www.facebook.com/your-facebook-page" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[#111111] border border-white/5 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors duration-200">
              <FacebookIcon />
            </a>
            <a href="https://x.com/LumanoidAI" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[#111111] border border-white/5 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors duration-200">
              <TwitterIcon />
            </a>
          </div>

        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Luminoid AI. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors duration-200">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;