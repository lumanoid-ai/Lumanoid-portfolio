import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import ChatWidget from './ChatWidget';
import MagneticButton from './MagneticButton';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);
  
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
    window.dispatchEvent(new Event('theme-change'));
  }, [isLight]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'Services', 'Projects', 'Team', 'Contact'];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${isScrolled ? 'bg-black/70 navbar-scrolled backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 bg-primary rounded-sm transform rotate-45 group-hover:rotate-90 transition-transform duration-200"></div>
            <span className="text-xl font-bold font-heading tracking-tight text-white group-hover:text-primary transition-colors duration-200">
              Luminoid AI
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-8">
              {navLinks.map((link) => {
                const targetUrl = link === 'Home' ? '/' : (isHome ? `#${link.toLowerCase()}` : `/#${link.toLowerCase()}`);
                return (
                  <a 
                    key={link} 
                    href={targetUrl} 
                    className="relative text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium tracking-wide group"
                  >
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-200 group-hover:w-full"></span>
                  </a>
                );
              })}
            </div>
            <MagneticButton strength={0.1}>
              <button 
                onClick={() => setIsChatOpen(true)}
                className="hidden md:block px-6 py-2.5 bg-transparent border-[1.5px] border-primary text-primary hover:bg-primary hover:text-white rounded-[8px] font-semibold transition-all duration-200"
              >
                Get a Free Consultation
              </button>
            </MagneticButton>
            <button 
              onClick={() => setIsLight(!isLight)} 
              className="w-10 h-10 rounded-lg bg-black/10 border border-white/10 flex items-center justify-center text-white hover:text-primary transition-colors"
            >
              {isLight ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button 
                onClick={() => setIsLight(!isLight)} 
                className="w-10 h-10 rounded-lg bg-black/10 border border-white/10 flex items-center justify-center text-white hover:text-primary transition-colors"
              >
                {isLight ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button className="text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/5 py-6 px-6 flex flex-col gap-4 shadow-xl">
            {navLinks.map((link) => {
              const targetUrl = link === 'Home' ? '/' : (isHome ? `#${link.toLowerCase()}` : `/#${link.toLowerCase()}`);
              return (
                <a 
                  key={link} 
                  href={targetUrl} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-white text-base font-medium tracking-wide"
                >
                  {link}
                </a>
              );
            })}
            <button 
              onClick={() => { setIsChatOpen(true); setIsMobileMenuOpen(false); }}
              className="w-full text-center mt-4 px-6 py-3 bg-transparent border-[1.5px] border-primary text-primary hover:bg-primary hover:text-white rounded-lg font-semibold transition-colors duration-200"
            >
              Get a Free Consultation
            </button>
          </div>
        )}
      </nav>
      
      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default Navbar;
