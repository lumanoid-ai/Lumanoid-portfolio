import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import React, { useRef, useState } from 'react';

const projectsByCategory = {
  'AI Agents': [
    { name: 'Smart Callender Assistant', category: 'AI Agent', desc: 'Automated workflows with Google Calendar for intelligent meeting scheduling, conflict resolution, and event management', image: '/images/smart calender.jpeg', demoLink: 'https://drive.google.com/file/d/1UMjngmvNO2LWoaXf080sGypmMPGRH6zG/view?usp=sharing' },
    { name: 'Auto Email Sender', category: 'AI Agent', desc: 'Automated email workflow system streamlining communication and outreach processes', image: '/images/email sender.png', demoLink: 'https://drive.google.com/file/d/1fpAsOuJIA7FcKIjHY9QDBMgQ_OUiP7Fl/view?usp=sharing' },
  ],
  'Chatbots': [
    { name: 'Smart Business Chatbot', category: 'Chatbot', desc: 'RAG-powered business chatbot using LangGraph workflow, ChromaDB vector storage, Groq LLM, and Tavily web search with real-time streaming responses via Flask SSE.', image: '/images/business chatbot.png', demoLink: 'https://drive.google.com/file/d/10ABXdm-33i6MpKzYxrGehCZbJOj6XMFa/view?usp=sharing' },
    { name: 'PDF reader', category: 'AI Tool', desc: 'RAG-powered PDF chatbot using ChromaDB vector storage, Sentence Transformers embeddings, and Google Gemini API for context-aware responses.', image: '/images/Enterpreneur chatbot.png', demoLink: 'https://drive.google.com/file/d/11Yxjpg2tCq0JPF1bvtv0fk-vQsQD7VKi/view?usp=sharing' },
    { name: 'Chatbot for entrepreneurs', category: 'Chatbot', desc: 'Predictive analytics engine for smarter business decisions.', image: '/images/Enterpreneur chatbot.png', demoLink: 'https://drive.google.com/file/d/1tzFn0gZyHFXIoZ2Td2q5TVrf1fQywiFw/view?usp=sharing' },
    { name: 'AI travelling Chatbot', category: 'Chatbot', desc: 'Smart travel planner providing destination insights, packing recommendations, and trip preparation assistance', image: '/images/AI travelling chat bot.png', demoLink: 'https://drive.google.com/file/d/1MAHjCN8n4d7vdZTRvrUKh_M_PmCd9Mq8/view?usp=sharing' },
  ],
  'AI Tools': [
    { name: 'Language Translator', category: 'AI Tool', desc: 'Real-time language translation tool enabling seamless communication across multiple languages', image: '/images/Language translator.png', demoLink: 'https://drive.google.com/file/d/1WgcPYNig2J72-8WE8tozobmJQbys66l1/view?usp=sharing' },
    { name: 'Web Scrapper', category: 'AI Tool', desc: 'AI-powered web scraper using Playwright for dynamic rendering, Groq LLM for intelligent extraction, automatic pagination detection, and Supabase storage with structured output.', image: '/images/web scrapper.jpeg', demoLink: 'https://drive.google.com/file/d/1l9LNbW0P5Vu2IL7EucROaYfmYKe5D65f/view?usp=sharing' },  
  ],
  'GEN AI': [
    { name: 'LOGO Generator', category: 'GEN AI', desc: 'AI logo generator using Stable Diffusion XL with LoRA fine-tuning, Gemini prompt enhancement, and Pillow post-processing for brand-ready outputs via Flask API.', image: '/images/Logo generator.JPG', demoLink: 'https://drive.google.com/file/d/1qOpQIp89xrmFQJHSafjdg-p9ZMjugM2D/view?usp=sharing' },
    { name: 'Product Photography', category: 'GEN AI', desc: 'AI-driven product photography tool using OpenCV for preprocessing, rembg for background removal, Google Gemini for prompt-based editing, and Supabase storage with Flask backend.', image: '/images/product photography.JPG', demoLink: 'https://drive.google.com/file/d/1CpR1Nj7QWTnzgjd5fIwvijeskKE8XDu0/view?usp=sharing' },
    { name: 'AI driven Learning platform', category: 'GEN AI', desc: ' A 3D Virtual AI Mentor supporting Text-to-Text, Speech-to-Text, Text-to-Speech, and Speech-to-Speech using pre-trained transformer models (no external APIs).', image: '/images/AI driven learning.jpeg', demoLink: 'https://drive.google.com/file/d/1GnaSaYXGeE8Ge7esflZgvzf6Ux5elizv/view?usp=sharing' },
    
  ]
};

const relatedProjectsByCategory = {
  'Data Science': [
    { name: 'Air Quality Prediction', category: 'Data Science', desc: 'End-to-end system with Flask REST APIs, XGBoost (Bayesian optimization), Streamlit dashboard, microservices, Docker, and CI/CD pipeline.', image: '/images/Air Quality.png', demoLink: 'https://drive.google.com/file/d/1TuPxN5iEzEw9ZAQlskXSuxCmgiws6kas/view?usp=sharing' },
    { name: 'Space Prediction', category: 'Data Science', desc: 'Predicts rocket landing success using Random Forest + GridSearchCV, SpaceX live API, EDA with Plotly & Folium, deployed via interactive Streamlit dashboard.', image: '/images/Space X.png', demoLink: 'https://drive.google.com/file/d/1sVBD4o7XTyfnloWB6HMua6IXWh4IetZm/view?usp=sharing' },
  ],
  'UI/UX': [
    { name: 'Social Media Application Design for teens', category: 'UI/UX', desc: 'Safe social space for teens connecting authentic friendships through personality tags and auto-formed tribes', image: '/images/FYT.png', demoLink: 'https://drive.google.com/file/d/1rCS0fzyoIhOx5uo0m5SR3PDh_uGxYn04/view?usp=sharing' },
    { name: 'E-commerce Website (Daraz Clone)', category: 'UI/UX', desc: 'UX research and redesign identifying pain points in cluttered layouts, navigation, and product displays', image: '/images/Daraz clone.png', demoLink: 'https://drive.google.com/file/d/1grhG1sUrYamH7fiXX6tAuIleF0UOGfk_/view?usp=sharing' },
    { name: 'Whatsapp Clone', category: 'UI/UX', desc: 'Multilingual messaging app prototype featuring group chats, privacy modes, and Urdu/English/Arabic support', image: '/images/Whatsapp clone.png', demoLink: 'https://drive.google.com/file/d/13OrZEFuoHfVKQWv0ZwH7T9wHsGjGIq93/view?usp=sharing' },
    { name: 'Food Delivery Application', category: 'UI/UX', desc: 'Full-featured delivery platform with bilingual support, live tracking, and seamless ordering experience', image: '/images/food express.png', demoLink: 'https://drive.google.com/file/d/1ehz4wlu76xeQ4qWEatZpmE4zaPlnmR0b/view?usp=sharing' }
  ]
};

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set((mouseX / width) - 0.5);
    y.set((mouseY / height) - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="perspective-1000 touch-pan-y"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        className="group relative rounded-lg overflow-hidden border border-white/5 bg-[#1A1A1A] transform-style-3d cursor-pointer shadow-lg"
      >
        {/* Shine effect */}
        <div className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%]"></div>
        
        <div className="h-48 overflow-hidden relative border-b border-white/5">
          <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10 w-full h-full"></div>
          <img src={project.image} alt={project.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
        </div>
        <div className="p-8 relative z-20 bg-[#1A1A1A]">
          <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">{project.category}</div>
          <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{project.name}</h3>
          <p className="text-gray-400 mb-6 text-sm">{project.desc}</p>
          
          <a
            href={project.demoLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-white text-sm font-semibold hover:text-primary transition-colors duration-200"
          >
            Watch Demo <ArrowUpRight size={16} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CategorySection = ({ title, projects }: { title: string, projects: any[] }) => {
  return (
    <div className="mb-16">
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-bold text-white mb-8"
      >
        {title}
      </motion.h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

const Projects = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <section id="projects" className="py-32 bg-[#111111] border-y border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold relative inline-block text-white"
          >
            Our Work
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute -bottom-3 left-0 w-full h-[2px] bg-primary origin-left"
            ></motion.div>
          </motion.h2>
        </div>
        
        <CategorySection title="AI Agents" projects={projectsByCategory['AI Agents']} />
        <CategorySection title="Chatbots" projects={projectsByCategory['Chatbots']} />
        <CategorySection title="AI Tools" projects={projectsByCategory['AI Tools']} />
        <CategorySection title="GEN AI" projects={projectsByCategory['GEN AI']} />

        {showMore && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <CategorySection title="Data Science" projects={relatedProjectsByCategory['Data Science']} />
            <CategorySection title="UI/UX" projects={relatedProjectsByCategory['UI/UX']} />
          </motion.div>
        )}

        <div className="flex justify-center mt-12">
          <motion.button
            onClick={() => setShowMore(!showMore)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-200 shadow-lg"
          >
            {showMore ? 'Show Less' : 'Show More Projects'}
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Projects;