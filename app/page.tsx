"use client";

import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import { 
  Code, Layout, BarChart, Users, Zap, MessageCircle, 
  ArrowRight, Menu, X, Database, Monitor, Github, Linkedin, Instagram, 
  
} from 'lucide-react';

/**
 * UTILS & HOOKS
 */

// Hook para seguir o mouse
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent | any) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);
  return mousePosition;
};

/**
 * COMPONENTES VISUAIS
 */

// Cartão com efeito "Spotlight" (brilho que segue o mouse)
const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-neutral-900/50 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// Mockup Abstrato de Interface (Para as Prévias)
const ProjectMockup = ({ type }: { type: 'dashboard' | 'mobile' | 'web' }) => {
  if (type === 'dashboard') {
    return (
      <div className="w-full h-48 bg-neutral-800 rounded-lg p-3 flex flex-col gap-2 overflow-hidden border border-white/5 opacity-80 group-hover:opacity-100 transition-opacity">
        <div className="flex gap-2 mb-2">
          <div className="w-20 h-full bg-neutral-700 rounded animate-pulse" />
          <div className="flex-1 flex flex-col gap-2">
            <div className="w-full h-8 bg-neutral-700 rounded opacity-50" />
            <div className="flex gap-2">
              <div className="w-1/2 h-20 bg-neutral-700/50 rounded" />
              <div className="w-1/2 h-20 bg-neutral-700/50 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (type === 'mobile') {
    return (
      <div className="flex justify-center h-48">
        <div className="w-24 h-full bg-neutral-800 rounded-xl border-4 border-neutral-700 p-1 flex flex-col gap-1">
          <div className="w-full h-1/2 bg-neutral-700/50 rounded-lg" />
          <div className="w-full h-2 bg-neutral-600 rounded-full" />
          <div className="w-full h-2 bg-neutral-600 rounded-full" />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-48 bg-neutral-800 rounded-t-lg border-t-8 border-x-8 border-neutral-700 relative overflow-hidden group-hover:-translate-y-2 transition-transform duration-500">
      <div className="w-full h-6 bg-neutral-700 flex items-center gap-1 px-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-red-500" />
        <div className="w-2 h-2 rounded-full bg-yellow-500" />
        <div className="w-2 h-2 rounded-full bg-green-500" />
      </div>
      <div className="p-4 grid grid-cols-3 gap-2">
        <div className="col-span-2 h-24 bg-neutral-600/30 rounded" />
        <div className="h-24 bg-neutral-600/30 rounded" />
      </div>
    </div>
  );
};

// Animação de Scroll
const RevealOnScroll = ({ children, delay = 0, width = "100%" }: { children: React.ReactNode, delay?: number, width?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      style={{ width, transitionDelay: `${delay}s` }} 
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {children}
    </div>
  );
};

// Faixa Infinita (Marquee)
const InfiniteMarquee = () => {
  return (
    <div className="relative flex overflow-x-hidden bg-white text-black py-3 border-y border-white/10 select-none">
      <div className="animate-marquee whitespace-nowrap flex gap-8 items-center font-bold uppercase tracking-widest text-sm">
        {Array(20).fill("Development • Design • Strategy • Performance • ").map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mousePos = useMousePosition();

  // Controle da Navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Analytics Loader (Substituindo next/script)
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-Q97SRMMPT7";
    script.async = true;
    document.body.appendChild(script);

    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-Q97SRMMPT7');
    `;
    document.body.appendChild(inlineScript);

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
      if (document.body.contains(inlineScript)) document.body.removeChild(inlineScript);
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const services = [
    { icon: <Monitor size={28} />, title: "Sites Institucionais", desc: "Design premium e performance otimizada." },
    { icon: <Layout size={28} />, title: "Landing Pages", desc: "Foco total em conversão e copywriting." },
    { icon: <Code size={28} />, title: "Sistemas Web", desc: "Soluções SaaS e ferramentas internas." },
    { icon: <BarChart size={28} />, title: "Dashboards", desc: "Visualização de dados em tempo real." },
    { icon: <Users size={28} />, title: "Área do Cliente", desc: "Ambientes logados seguros." },
    { icon: <Database size={28} />, title: "APIs & Integrações", desc: "Conexão entre ferramentas." }
  ];

  const projects = [
    { title: "Dashboard Financeiro", cat: "SaaS / Fintech", type: "dashboard" as const, desc: "Painel administrativo para gestão de ativos." },
    { title: "App Delivery", cat: "Mobile Web", type: "mobile" as const, desc: "PWA focado em experiência do usuário mobile." },
    { title: "E-commerce Premium", cat: "Web", type: "web" as const, desc: "Loja virtual de alta performance." }
  ];

  const whatsappLink = "https://wa.me/5592984228634?text=Olá!%20Vi%20seu%20site%20e%20quero%20escalar%20meu%20negócio.";

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black overflow-x-hidden relative">
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .bg-grid {
          background-size: 50px 50px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }
      `}</style>

      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid mask-[linear-gradient(to_bottom,transparent,black)]" />
        <div 
          className="absolute inset-0 bg-black/90 transition-colors duration-700"
          style={{
            background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.06), transparent 40%)`
          }}
        />
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter cursor-pointer flex items-center gap-2" onClick={() => scrollToSection('hero')}>
            <div>LEV <span className="font-light text-neutral-400">BRANDS</span></div>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-neutral-300">
  {['Serviços', 'Sobre', 'Projetos'].map((item) => (
    <button
      key={item}
      onClick={() => {
        // VERIFICAÇÃO ADICIONADA AQUI:
        if (item === 'Projetos') {
          window.location.href = '/portfolio'; // Leva para a página de portfólio
        } else {
          // Mantém o comportamento original para 'Serviços' e 'Sobre'
          scrollToSection(item.toLowerCase().replace('ç', 'c').replace('õ', 'o'));
        }
      }}
      className="hover:text-white transition-colors relative group"
    >
      {item}
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover:w-full"></span>
    </button>
  ))}
  
  <button
    onClick={() => window.open(whatsappLink, '_blank')}
    className="bg-white text-black px-5 py-2 rounded-full font-bold hover:bg-neutral-200 transition-all flex items-center gap-2 text-sm hover:scale-105 active:scale-95"
  >
    Iniciar Projeto <ArrowRight size={14} />
  </button>
</div>

          <div className="md:hidden text-white cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
           {['Sobre', 'Serviços', 'Projetos', 'Processo'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-2xl font-bold hover:text-neutral-400">
                {item}
              </button>
            ))}
            <button onClick={() => window.open(whatsappLink, '_blank')} className="bg-white text-black px-8 py-3 rounded-full font-bold">Falar no WhatsApp</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-white/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 border border-white/10 rounded-full bg-white/5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs uppercase tracking-widest text-neutral-300 font-medium">Disponível para novos projetos</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none mb-8">
              Transformamos código <br />
              <span className="bg-linear-to-r from-neutral-200 to-neutral-600 bg-clip-text text-transparent">em faturamento.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Estúdio de desenvolvimento especializado em criar ecossistemas digitais de alta conversão. Design, estratégia e tecnologia em um só lugar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => window.open(whatsappLink, '_blank')}
                className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded hover:bg-neutral-200 transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                <Zap size={20} className="fill-black" /> Solicitar Orçamento
              </button>
              <button 
                onClick={() => scrollToSection('projetos')}
                className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white rounded hover:bg-white/5 transition-all flex items-center justify-center gap-2 hover:border-white/50"
              >
                Ver Portfólio
              </button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Marquee Section */}
      <InfiniteMarquee />

      

      {/* Services Section */}
      <section id="servicos" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Nossa Expertise</h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                Soluções end-to-end para sua empresa.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <RevealOnScroll key={index} delay={index * 0.05}>
                <SpotlightCard className="h-full">
                  <div className="p-8 h-full flex flex-col items-start hover:bg-white/5 transition-colors">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">{service.desc}</p>
                  </div>
                </SpotlightCard>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Process Mini Section */}
      <section id="sobre" className="relative z-10 py-20 px-6 border-y border-white/5 bg-neutral-900/20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="p-4">
            <h3 className="text-4xl font-bold text-white mb-1">+50</h3>
            <p className="text-neutral-500 text-sm uppercase tracking-wider">Projetos Entregues</p>
          </div>
          <div className="p-4">
            <h3 className="text-4xl font-bold text-white mb-1">24/7</h3>
            <p className="text-neutral-500 text-sm uppercase tracking-wider">Suporte Dedicado</p>
          </div>
          <div className="p-4">
             <h3 className="text-4xl font-bold text-white mb-1">100%</h3>
             <p className="text-neutral-500 text-sm uppercase tracking-wider">No Prazo</p>
          </div>
          <div className="p-4">
            <h3 className="text-4xl font-bold text-white mb-1">Global</h3>
            <p className="text-neutral-500 text-sm uppercase tracking-wider">Atuação Remota</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-neutral-900/50 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <RevealOnScroll>
            <h2 className="text-4xl md:text-7xl font-bold mb-8 text-white tracking-tighter">
              Vamos construir o <br/> futuro da sua marca?
            </h2>
            <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto">
              Sua ideia merece uma execução impecável. Entre em contato hoje e receba uma proposta personalizada em até 24h.
            </p>
            <button 
              onClick={() => window.open(whatsappLink, '_blank')}
              className="px-12 py-6 bg-white text-black text-lg font-bold rounded-full hover:bg-neutral-200 transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center justify-center gap-3 mx-auto"
            >
              <MessageCircle size={24} className="fill-black" /> Começar Agora
            </button>
          </RevealOnScroll>
        </div>
      </section>

      {/* Footer Minimalista */}
      <footer className="relative z-10 bg-black border-t border-white/10 pt-16 pb-8 px-6 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold tracking-tighter text-white mb-2 flex items-center gap-2">
               
               LEV BRANDS
            </h2>
          </div>

          <div className="flex gap-6 items-center">
            <a href="https://github.com/CheckMat007" target="_blank" className="text-neutral-500 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"><Github size={20} /></a>
            <a href="https://instagram.com/levbrands" target="_blank" className="text-neutral-500 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"><Instagram size={20} /></a>
            <a href="www.linkedin.com/in/gustavolevenhagen" target="_blank" className="text-neutral-500 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"><Linkedin size={20} /></a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto text-center text-neutral-600 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} LEV BRANDS.</p>
          <p className="flex items-center gap-2 mt-2 md:mt-0"><Code size={12} /> Desenvolvido com Next.js & Tailwind</p>
        </div>
      </footer>

      
    </div>
  );
}