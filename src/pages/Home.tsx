import Hero from '../components/Hero';
import AboutCompany from '../components/AboutCompany';
import Services from '../components/Services';
import Workflow from '../components/Workflow';
import Projects from '../components/Projects';
import Team from '../components/Team';
import Contact from '../components/Contact';

const Home = () => {
  const marqueeText = "Chatbots • AI Agents • Integrations • Automation • LLMs • Custom GPTs • ";
  const marqueeRepeated = Array(10).fill(marqueeText).join(" ");

  return (
    <main>
      <Hero />
      
      {/* Marquee Section */}
      <div className="py-6 bg-[#111111] border-y border-white/5 overflow-hidden relative">
        <div className="whitespace-nowrap flex animate-marquee">
           <span className="text-lg md:text-xl font-bold text-gray-500 font-heading tracking-widest">{marqueeRepeated}</span>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="container mx-auto px-6 py-16 hidden md:flex justify-between items-center text-center max-w-5xl">
        <div><h4 className="text-4xl font-bold text-white mb-2 tracking-tight">12+</h4><p className="text-sm font-medium text-primary uppercase tracking-widest">Projects Delivered</p></div>
        <div><h4 className="text-4xl font-bold text-white mb-2 tracking-tight">10+</h4><p className="text-sm font-medium text-primary uppercase tracking-widest">Happy Clients</p></div>
        <div><h4 className="text-4xl font-bold text-white mb-2 tracking-tight">3</h4><p className="text-sm font-medium text-primary uppercase tracking-widest">AI Services</p></div>
        <div><h4 className="text-4xl font-bold text-white mb-2 tracking-tight">100%</h4><p className="text-sm font-medium text-primary uppercase tracking-widest">Custom Built</p></div>
      </div>

      <AboutCompany />
      <Services />
      <Workflow />
      <Projects />
      <Team />
      <Contact />
    </main>
  );
};

export default Home;
