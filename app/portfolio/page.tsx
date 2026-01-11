"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { 
  Search, 
  ExternalLink, 
  Github, 
  Code2, 
  Database, 
  Server, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  X, 
  ChevronRight,
  LayoutTemplate,
  Terminal,
  ArrowUpRight,
  Filter,
  ArrowLeft
} from 'lucide-react';

/* --- DADOS MOCKADOS --- */

const TECH_STACK = {
  frontend: ["React.js", "Next.js", "Tailwind CSS", "TypeScript", "Redux", "Framer Motion"],
  backend: ["Node.js", "Express", "Python", "NestJS", "PHP Laravel"],
  database: ["PostgreSQL", "MongoDB", "Redis", "Firebase"],
  devops: ["Docker", "AWS", "CI/CD", "Vercel"]
};

const PROJECTS = [
  {
    id: 1,
    title: "M2 Projecta - Gestão & CRM",
    category: "Sistema Web Full Stack",
    image: "https://www.m2projecta.com.br/og-image.png",
    shortDesc: "Ecossistema digital completo com Vitrine, CRM Administrativo e Área do Cliente exclusiva.",
    clientGoal: "Modernizar a operação da empresa para eliminar processos manuais, centralizar a gestão de contratos e oferecer uma experiência profissional e segura para a entrega de arquivos aos clientes.",
    solution: "Desenvolvemos uma aplicação robusta utilizando Next.js 14 (App Router). O sistema integra três frentes: uma vitrine pública com SEO dinâmico, um painel administrativo para gestão de projetos/clientes e um portal seguro onde clientes acompanham timelines e baixam entregáveis.",
    challenges: "Implementar controle de acesso baseado em papéis (RBAC) para separar Gestores de Clientes, integração com Blob Storage para uploads e otimização de SEO com metadados gerados via banco de dados.",
    results: "Digitalização completa do fluxo de trabalho, desde a captação até a entrega, garantindo maior segurança nos contratos e agilidade na comunicação com o cliente.",
    techs: ["Next.js 14", "TypeScript", "Prisma ORM", "Tailwind CSS", "PostgreSQL", "NextAuth.js"],
    link: "https://www.m2projecta.com.br",
    repo: null
  },
  
];

/* --- COMPONENTES --- */

const TechBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
    {children}
  </span>
);

const SectionTitle = ({ icon: Icon, title }: { icon: any, title: string }) => (
  <div className="flex items-center gap-2 mb-4 text-white">
    <Icon size={18} className="text-neutral-400" />
    <h3 className="font-bold text-sm uppercase tracking-widest">{title}</h3>
  </div>
);

const ProjectModal = ({ project, onClose }: { project: any, onClose: () => void }) => {
  if (!project) return null;

  return (
    
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
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
      <div 
        className="bg-neutral-900 border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl relative animate-in zoom-in-95 duration-200 scrollbar-hide"
        onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar dentro do modal
      >
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-white hover:text-black transition-colors z-10"
        >
          <X size={20} />
        </button>

        {/* Header Image */}
        <div className="w-full h-64 md:h-80 relative">
          {/* Usando img normal para facilitar uso de URLs externas sem configurar next.config.js */}
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-linear-to-t from-neutral-900 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 md:left-10">
            <span className="px-3 py-1 bg-white text-black text-xs font-bold rounded mb-3 inline-block">
              {project.category}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{project.title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10 grid md:grid-cols-3 gap-10">
          
          {/* Main Details (Left 2/3) */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">O Desafio</h3>
              <p className="text-neutral-400 leading-relaxed">{project.clientGoal}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-3">A Solução</h3>
              <p className="text-neutral-400 leading-relaxed mb-4">{project.solution}</p>
              
              <div className="bg-neutral-950 border border-white/5 p-5 rounded-lg">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Terminal size={16} /> Detalhes Técnicos & Desafios
                </h4>
                <p className="text-neutral-500 text-sm">{project.challenges}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">Resultados</h3>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-green-500 mt-1 shrink-0" size={20} />
                <p className="text-neutral-300 font-medium">{project.results}</p>
              </div>
            </div>
          </div>

          {/* Sidebar (Right 1/3) */}
          <div className="md:col-span-1 space-y-8">
            <div>
              <h4 className="text-sm text-neutral-500 uppercase tracking-widest mb-4 font-bold">Tecnologias</h4>
              <div className="flex flex-wrap gap-2">
                {project.techs.map((tech: string) => (
                  <TechBadge key={tech}>{tech}</TechBadge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm text-neutral-500 uppercase tracking-widest mb-4 font-bold">Links</h4>
              <div className="flex flex-col gap-3">
                <a 
                  href={project.link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-white text-black font-bold py-3 rounded hover:bg-neutral-200 transition-colors"
                >
                  Visitar Site <ExternalLink size={16} />
                </a>
                {project.repo ? (
                  <a 
                    href={project.repo} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-transparent border border-white/20 text-white py-3 rounded hover:bg-white/10 transition-colors"
                  >
                    Ver Código <Github size={16} />
                  </a>
                ) : (
                  <div className="flex items-center justify-center gap-2 w-full bg-neutral-800 text-neutral-500 py-3 rounded cursor-not-allowed text-sm">
                    Repositório Privado <Github size={16} />
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const categories = ["Todos", "Sistema Web", "Landing Page", "Site Institucional", "Área do Cliente"];
  const whatsappLink = "https://wa.me/5511999999999?text=Olá!%20Vi%20seu%20portfólio%20e%20gostaria%20de%20solicitar%20um%20orçamento.";

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(project => {
      const matchesCategory = selectedCategory === "Todos" || project.category === selectedCategory;
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            project.techs.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 font-sans selection:bg-white selection:text-black flex flex-col md:flex-row">
      
      {/* --- SIDEBAR LATERAL (Esquerda) --- */}
      <aside className="w-full md:w-80 lg:w-96 bg-black border-r border-white/10 md:h-screen md:sticky md:top-0 flex flex-col overflow-y-auto scrollbar-hide z-20">
        
        {/* Header Sidebar */}
        <div className="p-8 border-b border-white/10">
          <Link href="/" className="group flex items-center gap-2 mb-1">
             <ArrowLeft size={16} className="text-neutral-500 group-hover:-translate-x-1 transition-transform"/>
             <span className="text-neutral-500 text-xs uppercase tracking-widest group-hover:text-white transition-colors">Voltar para Home</span>
          </Link>
          <Link href="/">
            <h1 className="text-2xl font-bold tracking-tighter text-white cursor-pointer">
              LEV <span className="font-light text-neutral-500">BRANDS</span>
            </h1>
          </Link>
          <p className="text-xs text-neutral-500 uppercase tracking-widest mt-1">Digital Solutions</p>
        </div>

        {/* Conteúdo Sidebar */}
        <div className="p-8 space-y-10 flex-1">
          
          {/* Intro */}
          <div>
            <SectionTitle icon={LayoutTemplate} title="Quem Somos" />
            <p className="text-sm leading-relaxed text-neutral-400">
              Especialistas em desenvolvimento web sob medida. Não usamos templates prontos; criamos ecossistemas digitais focados em escalabilidade e performance.
            </p>
          </div>

          {/* Tech Stack */}
          <div className="space-y-6">
            <SectionTitle icon={Cpu} title="Tech Stack" />
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-white text-sm font-semibold mb-2">
                  <Code2 size={14} className="text-blue-500" /> Front-end
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {TECH_STACK.frontend.map(tech => <TechBadge key={tech}>{tech}</TechBadge>)}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-white text-sm font-semibold mb-2">
                  <Server size={14} className="text-green-500" /> Back-end
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {TECH_STACK.backend.map(tech => <TechBadge key={tech}>{tech}</TechBadge>)}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-white text-sm font-semibold mb-2">
                  <Database size={14} className="text-yellow-500" /> Database
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {TECH_STACK.database.map(tech => <TechBadge key={tech}>{tech}</TechBadge>)}
                </div>
              </div>
            </div>
          </div>

          {/* Metodologia */}
          <div>
            <SectionTitle icon={Layers} title="Metodologia" />
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-white mt-0.5" />
                <span>Desenvolvimento 100% autoral</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-white mt-0.5" />
                <span>Foco em Core Web Vitals (SEO)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-white mt-0.5" />
                <span>Segurança e criptografia</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Sidebar */}
        <div className="p-8 border-t border-white/10 bg-neutral-900/50">
          <button 
            onClick={() => window.open(whatsappLink, '_blank')}
            className="w-full py-3 bg-white text-black font-bold text-sm rounded hover:bg-neutral-200 transition-colors"
          >
            Solicitar Orçamento
          </button>
          <div className="flex justify-center gap-4 mt-6">
            <Github className="text-neutral-500 hover:text-white cursor-pointer transition-colors" size={20} />
            <ExternalLink className="text-neutral-500 hover:text-white cursor-pointer transition-colors" size={20} />
          </div>
        </div>
      </aside>

      {/* --- ÁREA PRINCIPAL (Direita) --- */}
      <main className="flex-1 p-6 md:p-12 lg:p-16 relative">
        
        {/* Header Main - Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Portfólio</h2>
            <p className="text-neutral-500">Explore nossos projetos recentes e estudos de caso.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Search */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-white transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Buscar projeto ou tecnologia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 bg-neutral-900 border border-white/10 text-white rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-white/30 transition-all text-sm placeholder:text-neutral-600"
              />
            </div>
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide border-b border-white/5">
          <Filter size={16} className="text-neutral-500 mr-2 shrink-0" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                selectedCategory === cat 
                ? 'bg-white text-black' 
                : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de Projetos */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative bg-neutral-900 border border-white/5 rounded-xl overflow-hidden cursor-pointer hover:border-white/20 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image Cover */}
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                  {/* Usando img normal para evitar erros de domínio no next.config */}
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 backdrop-blur text-white p-2 rounded-full">
                    <ArrowUpRight size={20} />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs font-bold text-neutral-500 uppercase tracking-wide">{project.category}</span>
                      <h3 className="text-xl font-bold text-white mt-1 group-hover:text-neutral-200 transition-colors">{project.title}</h3>
                    </div>
                  </div>
                  
                  <p className="text-neutral-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.shortDesc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techs.slice(0, 3).map((t: string) => (
                      <span key={t} className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-1 rounded border border-white/5">
                        {t}
                      </span>
                    ))}
                    {project.techs.length > 3 && (
                      <span className="text-[10px] text-neutral-500 py-1 px-1">+{project.techs.length - 3}</span>
                    )}
                  </div>

                  <div className="flex items-center text-white text-xs font-bold uppercase tracking-widest group-hover:underline decoration-white/30 underline-offset-4">
                    Ver Detalhes <ChevronRight size={14} className="ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-neutral-500">
            <Search size={48} className="mb-4 opacity-20" />
            <p className="text-lg">Nenhum projeto encontrado para esta pesquisa.</p>
            <button 
              onClick={() => {setSearchTerm(""); setSelectedCategory("Todos")}}
              className="mt-4 text-white underline hover:text-neutral-300"
            >
              Limpar filtros
            </button>
          </div>
        )}

        {/* Footer Main */}
        <div className="mt-24 pt-8 border-t border-white/5 text-center md:text-left text-neutral-600 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>Mostrando {filteredProjects.length} de {PROJECTS.length} projetos</p>
          <p>© {new Date().getFullYear()} LEV BRANDS Portfolio</p>
        </div>
      </main>

      {/* --- MODAL DE DETALHES --- */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

      <style>{`
        /* Utilitários para esconder scrollbar mantendo funcionalidade */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}