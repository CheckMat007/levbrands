"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, ArrowRight, Menu, X, ChevronDown, 
  MessageCircle, Star, ShieldCheck, TrendingUp, Smartphone, 
  Zap, Layout, Globe, ArrowUpRight
} from 'lucide-react';

/* --- COMPONENTES UTILITÁRIOS --- */

const RevealOnScroll = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
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
      style={{ transitionDelay: `${delay}s` }} 
      className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
    >
      {children}
    </div>
  );
};

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left hover:text-blue-700 transition-colors text-slate-800 group"
      >
        <span className="font-semibold text-lg">{question}</span>
        <span className={`p-2 rounded-full bg-slate-50 group-hover:bg-blue-50 transition-colors duration-300`}>
          <ChevronDown className={`w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
        <p className="text-slate-600 leading-relaxed pr-8">{answer}</p>
      </div>
    </div>
  );
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappLink = "https://wa.me/5592984228634?text=Olá!%20Vi%20seu%20site%20e%20gostaria%20de%20um%20orçamento.";

  const portfolioItems = [
    {
      title: "M2 Projecta",
      desc: "Sistema de gestão que automatiza contratos e organiza o fluxo financeiro da empresa.",
      image: "https://www.m2projecta.com.br/og-image.png", // Certifique-se que essa imagem existe ou troque
      tag: "Gestão & CRM",
      link: "https://www.m2projecta.com.br" // Link real do projeto
    },
    {
      title: "Decmobly",
      desc: "Site institucional moderno para loja de móveis do Amazonas, com foco em performance e SEO local.",
      image: "/decmobly-capa.jpeg", // Substitua pelo caminho real
      tag: "SEO LOCAL",
      link: "https://www.decmobly.com.br"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      
      {/* Navbar com efeito Glassmorphism refinado */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/50 py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter text-slate-900 flex items-center gap-2">
            <span>LEV<span className="font-light text-slate-500">BRANDS</span></span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <a href="#portfolio" className="hover:text-blue-600 transition-colors">Portfólio</a>
            <a href="#servicos" className="hover:text-blue-600 transition-colors">Serviços</a>
            
            <button
              onClick={() => window.open(whatsappLink, '_blank')}
              className="bg-slate-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-200 transition-all flex items-center gap-2 text-xs uppercase tracking-wide"
            >
              Orçamento
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="md:hidden z-50 text-slate-900 cursor-pointer p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
           <a href="#como-funciona" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-slate-800">Processo</a>
           <a href="#portfolio" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-slate-800">Portfólio</a>
           <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-slate-800">Dúvidas</a>
           <button onClick={() => window.open(whatsappLink, '_blank')} className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold w-3/4 text-lg shadow-xl shadow-blue-200">
             Chamar no WhatsApp
           </button>
        </div>
      </nav>

      {/* --- HERO SECTION ASSIMÉTRICA --- */}
      <section className="relative w-full overflow-hidden bg-white pt-32 pb-20 lg:pt-40 lg:pb-32">
        {/* Background Grid */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-125 w-125 rounded-full bg-blue-100 opacity-50 blur-[100px]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Esquerda: Copywriting */}
            <div className={`flex flex-col items-start text-left transition-all duration-1000 ease-out transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-slate-900 mb-6 leading-[1.1]">
                Seu negócio merece um site que <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-700 to-indigo-600"> vende por você.</span>
              </h1>

              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
                Criamos experiências digitais sob medida que transmitem autoridade e convertem visitantes em clientes reais.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
                <button 
                  onClick={() => window.open(whatsappLink, '_blank')}
                  className="group px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 hover:shadow-lg hover:shadow-blue-900/10 transition-all flex items-center justify-center gap-3"
                >
                  <MessageCircle size={20} /> 
                  Quero um orçamento
                </button>
                <a 
                  href="#portfolio"
                  className="px-8 py-4 text-slate-600 font-medium hover:text-blue-700 transition-colors flex items-center justify-center gap-2 group"
                >
                  Ver trabalhos
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Checkpoints */}
              <div className="flex gap-6 text-sm text-slate-500 font-medium border-t border-slate-100 pt-6 w-full">
                <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-600"/> Otimizado para SEO</div>
                <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-600"/> Design Exclusivo</div>
                <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-600"/> Sistema de Gestão Integrado</div>
              </div>
            </div>

            {/* Direita: Mockup 3D */}
            <div className={`hidden lg:block relative transition-all duration-1000 delay-200 ease-out transform ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative mx-auto w-full max-w-150" style={{ perspective: '1000px' }}>
                {/* Elemento decorativo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-linear-to-tr from-blue-100 to-indigo-50 rounded-full blur-3xl -z-10"></div>
                
                {/* O Mockup (Site Flutuante) */}
                <div className="relative rounded-xl bg-white border border-slate-200 shadow-2xl shadow-blue-900/10 overflow-hidden transform -rotate-y-6 rotate-x-[4deg] hover:rotate-0 transition-transform duration-700 ease-out">
                  <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center gap-2">
                    <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400"/><div className="w-2.5 h-2.5 rounded-full bg-amber-400"/><div className="w-2.5 h-2.5 rounded-full bg-green-400"/></div>
                  </div>
                  {/* IMPORTANTE: Coloque aqui o print do seu melhor site */}
                  <div className="aspect-16/10 bg-slate-100 relative group overflow-hidden">
                     {/* Placeholder - Substitua pelo SRC real */}
                     <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-50">
                        <img src="/clinica-demo.png" alt="Site institucional para clínicas" className="object-cover w-full h-full opacity-80" />
                     </div>
                     {/* Reflexo Vidro */}
                     <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent pointer-events-none"></div>
                  </div>
                </div>

                {/* Card Flutuante Pequeno */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg text-green-600"><Smartphone size={20} /></div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Responsivo</p>
                      <p className="text-sm font-bold text-slate-900">Mobile First</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* --- PORTFOLIO (Cards melhorados) --- */}
      <section id="portfolio" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <div className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-2">Portfolio Selecionado</div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Empresas reais, resultados reais.</h2>
            </div>
            <a href={whatsappLink} className="hidden md:flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors">
              Quero um site assim <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {portfolioItems.map((project, i) => (
              <RevealOnScroll key={i} delay={i * 0.1}>
                <div className="group rounded-2xl overflow-hidden border border-slate-100 bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 h-full flex flex-col">
                  {/* Imagem com Zoom suave */}
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-slate-800 shadow-sm">
                      {project.tag}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center justify-between">
                      {project.title}
                      <ArrowUpRight size={18} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1 border-b border-slate-100 pb-4">
                      {project.desc}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div> Online
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <button className="w-full py-4 border border-slate-200 rounded-xl font-bold text-slate-700">Ver mais projetos</button>
          </div>
        </div>
      </section>

      {/* --- O QUE FAZEMOS (Layout Bento Grid) --- */}
      <section id="servicos" className="py-24 px-6 bg-slate-50 relative overflow-hidden">
        {/* Background Grid Sutil */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Mais do que "apenas um site"</h2>
            <p className="text-slate-600">Entregamos a infraestrutura digital completa para sua empresa operar profissionalmente.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 - Institucional */}
            <RevealOnScroll className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4"><Layout /></div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Sites Institucionais</h3>
                <p className="text-slate-600 leading-relaxed">Seu cartão de visitas 24h. Ideal para advogados, clínicas, consultorias e prestadores de serviço que precisam passar credibilidade imediata.</p>
              </div>
              <div className="w-full md:w-1/3 bg-slate-50 rounded-lg h-32 border border-slate-100 flex items-center justify-center text-slate-300">
                <img src="/clinica-demo.png" alt="Site institucional para clínicas" className="object-cover w-full h-full opacity-80" />
                     
              </div>
            </RevealOnScroll>

            {/* Card 2 - Landing Page */}
            <RevealOnScroll delay={0.1} className="bg-slate-900 p-8 rounded-2xl shadow-xl text-white flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4"><Zap className="text-yellow-400" /></div>
                <h3 className="text-xl font-bold mb-2">Landing Pages</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Páginas focadas em uma única ação: venda. Design agressivo para conversão.</p>
              </div>
            </RevealOnScroll>

            {/* Card 3 - Sistemas */}
            <RevealOnScroll delay={0.2} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors">
               <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4"><TrendingUp /></div>
               <h3 className="text-xl font-bold text-slate-900 mb-2">Sistemas Internos</h3>
               <p className="text-slate-600 text-sm leading-relaxed">Painéis administrativos, CRMs simples e automação de planilhas.</p>
            </RevealOnScroll>

            {/* Card 4 - SEO & Performance */}
            <RevealOnScroll delay={0.3} className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center shrink-0"><Smartphone /></div>
                <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-2">Otimização Mobile & SEO</h3>
                   <p className="text-slate-600 leading-relaxed">Não adianta ter site se ele não abre no celular ou não aparece no Google. Nossos projetos já nascem otimizados para ambos.</p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section id="faq" className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Dúvidas Frequentes</h2>
          </div>
          
          <div className="space-y-2">
            <FaqItem 
              question="Eu preciso pagar mensalidade?"
              answer="Depende do pacote. O desenvolvimento do site é um valor único. Para manter o site no ar (hospedagem e domínio), existe um custo anual pequeno que é padrão da internet, mas nós cuidamos de toda essa parte técnica para você."
            />
            <FaqItem 
              question="Quanto tempo demora para ficar pronto?"
              answer="Sites institucionais e Landing Pages levam em média de 7 a 10 dias úteis após o recebimento do material (logo, textos e fotos). Sistemas complexos têm prazos personalizados."
            />
            <FaqItem 
              question="Vocês atendem apenas Manaus?"
              answer="Não. Embora nossa base seja em Manaus/AM, atendemos clientes do Brasil inteiro. Todas as reuniões e entregas são feitas de forma 100% online e segura."
            />
            <FaqItem 
              question="Consigo atualizar o site sozinho depois?"
              answer="Sim! Se for uma necessidade sua, configuramos um painel administrativo amigável onde você pode trocar textos e fotos sem precisar entender de código."
            />
          </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="py-20 px-6 bg-slate-900 text-center relative overflow-hidden">
        {/* Efeitos de fundo */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[linear-gradient(45deg,#1e293b_25%,transparent_25%,transparent_75%,#1e293b_75%,#1e293b),linear-gradient(45deg,#1e293b_25%,transparent_25%,transparent_75%,#1e293b_75%,#1e293b)] bg-size-[20px_20px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-blue-600 opacity-20 blur-[120px] rounded-full"></div>

        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight leading-tight">
            Vamos tirar essa ideia do papel?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-xl mx-auto">
            Não deixe para depois. Fale comigo agora e receba uma proposta personalizada para o seu momento.
          </p>
          <button 
            onClick={() => window.open(whatsappLink, '_blank')}
            className="px-10 py-5 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-500 hover:scale-105 transition-all shadow-xl shadow-blue-900/50 flex items-center justify-center gap-3 mx-auto"
          >
            <MessageCircle className="w-6 h-6" />
            Iniciar Conversa no WhatsApp
          </button>
          <p className="mt-8 text-sm text-slate-500">
            Resposta rápida • Sem compromisso
          </p>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white text-slate-500 py-12 px-6 border-t border-slate-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-bold text-slate-900">LEV BRANDS</span>
            <span>&copy; {new Date().getFullYear()} Todos os direitos reservados.</span>
          </div>
          <div className="flex gap-8 font-medium">
            <a href="https://instagram.com/levbrands" target="_blank" className="hover:text-blue-600 transition-colors">Instagram</a>
            <a href="https://linkedin.com/in/gustavolevenhagen" target="_blank" className="hover:text-blue-600 transition-colors">LinkedIn</a>
            <a href="https://github.com/CheckMat007" target="_blank" className="hover:text-blue-600 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}