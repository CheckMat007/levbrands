"use client";

import React, { useState, useEffect, useRef } from 'react';
// Importação do componente de Script do Next.js
import Script from 'next/script'; 
import { 
  Code, 
  Layout, 
  BarChart, 
  Users, 
  Zap, 
  CheckCircle, 
  MessageCircle, 
  ArrowRight, 
  Menu, 
  X, 
  Database,
  Monitor,
  Instagram 
} from 'lucide-react';

/**
 * Componente Reutilizável para Animação de Scroll
 */
const RevealOnScroll = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`
      }}
    >
      {children}
    </div>
  );
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const services = [
    { icon: <Monitor size={32} />, title: "Sites Institucionais", desc: "Presença digital sólida com design premium e performance otimizada para SEO." },
    { icon: <Layout size={32} />, title: "Landing Pages", desc: "Páginas focadas em conversão com copywriting persuasivo e design estratégico." },
    { icon: <Code size={32} />, title: "Sistemas Web", desc: "Soluções personalizadas para resolver dores específicas do seu negócio." },
    { icon: <BarChart size={32} />, title: "Dashboards", desc: "Painéis administrativos intuitivos para gestão de dados e métricas em tempo real." },
    { icon: <Users size={32} />, title: "Área do Cliente", desc: "Ambientes seguros e exclusivos para interação e retenção da sua base de clientes." },
    { icon: <Database size={32} />, title: "Integrações & APIs", desc: "Conectamos seu sistema a ferramentas externas (CRMs, Gateways, ERPs)." }
  ];

  const differentials = [
    { title: "100% Personalizado", desc: "Nada de templates prontos. Código feito sob medida." },
    { title: "Código Escalável", desc: "Arquitetura pronta para crescer com sua empresa." },
    { title: "Alta Performance", desc: "Velocidade de carregamento otimizada (Core Web Vitals)." },
    { title: "Segurança", desc: "Proteção de dados e boas práticas de desenvolvimento." }
  ];

  const processSteps = [
    { num: "01", title: "Imersão", desc: "Entendemos seu modelo de negócio e objetivos." },
    { num: "02", title: "Planejamento", desc: "Definição de arquitetura, tecnologias e cronograma." },
    { num: "03", title: "Design & Code", desc: "Prototipação UI/UX seguida de desenvolvimento ágil." },
    { num: "04", title: "Entrega", desc: "Testes rigorosos, deploy e treinamento da equipe." }
  ];

  const whatsappLink = "https://wa.me/5592984228634?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20LEV%20BRANDS.";
  const instagramLink = "https://www.instagram.com/levbrands";

  return (
    <div className="min-h-screen font-sans selection:bg-white selection:text-black overflow-x-hidden">
      
      {/* --- INÍCIO DO SCRIPT DO GOOGLE --- */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-Q97SRMMPT7"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-Q97SRMMPT7');
        `}
      </Script>
      {/* --- FIM DO SCRIPT DO GOOGLE --- */}

      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-neutral-900 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] bg-neutral-800 rounded-full blur-[100px] opacity-30"></div>
      </div>

      {/* Navbar */}
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter cursor-pointer" onClick={() => scrollToSection('hero')}>
            LEV <span className="font-light text-neutral-400">BRANDS</span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-neutral-300">
            <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">Sobre</button>
            <button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Serviços</button>
            <button onClick={() => scrollToSection('process')} className="hover:text-white transition-colors">Processo</button>
            <button onClick={() => window.location.href = "/portfolio"} className="text-left text-neutral-300 py-2 border-b border-white/5">Portfólio</button>
            <button 
              onClick={() => window.open(whatsappLink, '_blank')}
              className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-neutral-200 transition-colors flex items-center gap-2"
            >
              Falar no WhatsApp <ArrowRight size={16} />
            </button>
          </div>

          <div className="md:hidden text-white cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-black border-b border-white/10 p-6 flex flex-col space-y-4 md:hidden animate-fade-in-down">
            <button onClick={() => scrollToSection('about')} className="text-left text-neutral-300 py-2 border-b border-white/5">Sobre</button>
            <button onClick={() => scrollToSection('services')} className="text-left text-neutral-300 py-2 border-b border-white/5">Serviços</button>
            <button onClick={() => scrollToSection('process')} className="text-left text-neutral-300 py-2 border-b border-white/5">Processo</button>
            <button onClick={() => window.location.href = "/portfolio"} className="text-left text-neutral-300 py-2 border-b border-white/5">Portfólio</button>
            <button 
              onClick={() => window.open(whatsappLink, '_blank')}
              className="w-full bg-white text-black py-3 rounded text-center font-bold mt-2"
            >
              Falar no WhatsApp
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <RevealOnScroll>
            <div className="inline-block px-3 py-1 mb-6 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm">
              <span className="text-xs uppercase tracking-widest text-neutral-300">Inovação & Tecnologia</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight pb-2 mb-8 bg-linear-to-b from-white to-neutral-500 bg-clip-text text-transparent">
              Soluções digitais sob medida <br className="hidden md:block"/> para escalar o seu negócio.
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Desenvolvemos sites, sistemas web e ferramentas personalizadas que unem design sofisticado e alta tecnologia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => window.open(whatsappLink, '_blank')}
                className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded hover:bg-neutral-200 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} /> Iniciar Projeto
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white rounded hover:bg-white/5 transition-all flex items-center justify-center gap-2"
              >
                Ver Serviços
              </button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ... Restante das seções (About, Services, Process, CTA, Footer) permanece igual ... */}
      
      {/* About Section */}
      <section id="about" className="relative z-10 py-20 bg-neutral-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <RevealOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Sobre a LEV BRANDS</h2>
            <p className="text-neutral-400 mb-6 text-lg leading-relaxed">
              Somos um estúdio de desenvolvimento focado em criar ecossistemas digitais robustos. Não entregamos apenas código; entregamos ferramentas que otimizam processos e aumentam faturamento.
            </p>
            <div className="flex gap-8">
              <div>
                <h3 className="text-3xl font-bold text-white">+50</h3>
                <span className="text-sm text-neutral-500 uppercase tracking-wider">Projetos</span>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">100%</h3>
                <span className="text-sm text-neutral-500 uppercase tracking-wider">Satisfação</span>
              </div>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-neutral-700 to-neutral-900 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-black border border-white/10 p-8 rounded-lg aspect-video flex flex-col justify-center items-center text-center">
                <Code size={48} className="text-white mb-4" />
                <h3 className="text-xl font-semibold">Tecnologia de Ponta</h3>
                <p className="text-neutral-500 mt-2">React, Node, Next.js e Cloud Computing</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Footer (Simplified for the example) */}
      <footer className="relative z-10 bg-black border-t border-white/10 pt-16 pb-8 px-6 text-sm">
        <div className="max-w-7xl mx-auto text-center text-neutral-600">
           <p>&copy; {new Date().getFullYear()} LEV BRANDS. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all flex items-center justify-center group"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}