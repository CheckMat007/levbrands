'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import { Playfair_Display, Lato } from 'next/font/google';

// --- CONFIGURAÇÃO DE FONTES (Next.js Fonts) ---
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
});

// --- DADOS INICIAIS (Mock Database) ---
// ATUALIZAÇÃO: Adicionado campo 'description'
const initialProjects = [
  { 
    id: 1, 
    title: 'Cozinha Clean Minimalista', 
    category: 'cozinha', 
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Um projeto focado na otimização de espaço e luminosidade. Utilizamos laca branca acetinada e puxadores ocultos para manter a linguagem minimalista. A bancada em quartzo branco completa a sofisticação.'
  },
  { 
    id: 2, 
    title: 'Quarto Casal Imbuia', 
    category: 'quarto', 
    image: 'https://finger.ind.br/wp-content/uploads/2019/06/6-dicas-para-montar-seu-quarto-de-casal-planejado-1024x683.jpg',
    description: 'Aconchego foi a palavra-chave. Madeira tom Imbuia com cabeceira estofada em linho cru. O armário possui portas de correr com sistema de amortecimento e iluminação interna em LED.'
  },
  { 
    id: 3, 
    title: 'Sala de Estar Integrada', 
    category: 'sala', 
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Painel ripado em madeira natural que esconde a fiação e integra a TV ao ambiente. Nichos iluminados para decoração e um rack suspenso que facilita a limpeza e amplia a sensação de espaço.'
  },
  { 
    id: 4, 
    title: 'Banheiro Mármore e Madeira', 
    category: 'banheiro', 
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Gabinete suspenso em madeira naval tratada para resistir à umidade, combinando perfeitamente com o revestimento em mármore calacata. Gavetas com divisórias organizadoras em acrílico.'
  },
  { 
    id: 5, 
    title: 'Cozinha Americana Preta', 
    category: 'cozinha', 
    image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Modernidade pura. MDF preto trama com detalhes em serralheria industrial. A ilha central serve como mesa de jantar e área de preparação, integrando quem cozinha com os convidados.'
  },
  { 
    id: 6, 
    title: 'Home Office Planejado', 
    category: 'sala', 
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Estação de trabalho ergonômica com ampla bancada e gaveteiro volante. Prateleiras superiores para livros com suporte invisível, criando um ambiente limpo e propício para a concentração.'
  }
];

export default function DecmoblyPage() {
  // --- ESTADOS (State Management) ---
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'admin'>('home');
  const [projects, setProjects] = useState(initialProjects);
  const [filter, setFilter] = useState('todos');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoWidgetOpen, setDemoWidgetOpen] = useState(false);
  
  // NOVO ESTADO: Controle do Modal de Detalhes
  const [selectedProject, setSelectedProject] = useState<any>(null); // Armazena o projeto clicado

  // Estados para Login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Estados para Novo Projeto (Admin)
  // ATUALIZAÇÃO: Adicionado 'description'
  const [newProject, setNewProject] = useState({ title: '', category: 'cozinha', image: '', description: '' });

  // --- LÓGICA / ACTIONS ---

  const handleNavigate = (view: 'home' | 'login' | 'admin') => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    if (view === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      handleNavigate('admin');
    } else {
      alert('Credenciais inválidas! Tente admin / admin');
    }
  };

  const handleLogout = () => {
    if (confirm("Deseja realmente sair?")) {
      setUsername('');
      setPassword('');
      handleNavigate('home');
    }
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    // Garante que se a descrição estiver vazia, coloca um texto padrão
    const desc = newProject.description.trim() === '' ? 'Descrição do projeto não informada.' : newProject.description;
    
    const projectToAdd = { id: newId, ...newProject, description: desc };
    
    setProjects([projectToAdd, ...projects]);
    setNewProject({ title: '', category: 'cozinha', image: '', description: '' }); // Reset form
    alert('Projeto adicionado com sucesso!');
  };

  const handleDeleteProject = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este projeto?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  // Filtragem
  const filteredProjects = filter === 'todos' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className={`${playfair.variable} ${lato.variable} font-sans min-h-screen bg-[#fdfbf7] text-gray-700`}>
      {/* Carregar Ícones Externos */}
      <Script src="https://unpkg.com/@phosphor-icons/web" strategy="lazyOnload" />

      {/* ================= MODAL DE DETALHES DO PROJETO ================= */}
      {selectedProject && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 animate-in fade-in duration-300">
          {/* Overlay Escuro */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          ></div>
          
          {/* Card do Modal */}
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 flex flex-col md:flex-row">
            {/* Botão Fechar */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 bg-white/80 text-gray-800 rounded-full p-2 hover:bg-white transition z-20"
            >
              <i className="ph ph-x text-xl"></i>
            </button>

            {/* Imagem do Modal */}
            <div className="md:w-1/2 h-64 md:h-auto relative">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Conteúdo do Modal */}
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <span className="text-[#5c4d3c] text-xs font-bold uppercase tracking-widest mb-2 border-b border-[#efe4cd] pb-2 inline-block w-max">
                {selectedProject.category}
              </span>
              <h3 className="font-serif text-3xl md:text-4xl text-[#5c4d3c] font-bold mb-6 leading-tight">
                {selectedProject.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                {selectedProject.description}
              </p>
              
              <div className="mt-auto">
                <button 
                  onClick={() => { setSelectedProject(null); window.location.href='#contato'; }}
                  className="bg-[#5c4d3c] text-white px-6 py-3 rounded hover:bg-gray-800 transition w-full md:w-auto text-center"
                >
                  Solicitar Orçamento Similar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= BARRA DE NAVEGAÇÃO ================= */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${currentView !== 'home' ? 'hidden' : 'bg-[#fdfbf7]/90 backdrop-blur-md border-b border-[#efe4cd] shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex flex-col cursor-pointer" onClick={() => handleNavigate('home')}>
              <span className="font-serif text-3xl text-[#5c4d3c] font-bold tracking-wide">Decmobly</span>
              <span className="text-xs text-gray-400 uppercase tracking-widest -mt-1 font-sans">Móveis Planejados</span>
            </div>

            {/* Menu Desktop */}
            <div className="hidden md:flex space-x-8 items-center">
              {['Projetos', 'Sobre', 'Contato'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="relative group text-[#5c4d3c] font-medium"
                >
                  {item}
                  <span className="absolute bottom-0.5 left-0 w-0 h-px bg-[#5c4d3c] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              <button 
                onClick={() => handleNavigate('login')} 
                className="px-5 py-2 border border-[#5c4d3c] text-[#5c4d3c] rounded hover:bg-[#5c4d3c] hover:text-white transition duration-300 text-sm"
              >
                Área Restrita
              </button>
            </div>

            {/* Menu Mobile Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-[#5c4d3c] focus:outline-none">
                <i className="ph ph-list text-2xl"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-[#efe4cd] p-4 shadow-lg animate-in slide-in-from-top-2">
            {['Projetos', 'Sobre', 'Contato'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-[#5c4d3c] border-b border-gray-100 last:border-0"
              >
                {item}
              </a>
            ))}
            <button 
              onClick={() => handleNavigate('login')} 
              className="block w-full text-left py-3 text-[#5c4d3c] font-bold mt-2"
            >
              Área do Cliente
            </button>
          </div>
        )}
      </nav>

      {/* Espaçador para o Menu Fixo (apenas na home) */}
      {currentView === 'home' && <div className="h-20"></div>}

      {/* ================= VIEW: HOME ================= */}
      {currentView === 'home' && (
        <main className="animate-in fade-in duration-500">
          
          {/* Hero Section */}
          <section className="relative bg-[#f7f1e3] py-20 lg:py-32 overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#efe4cd] rounded-full opacity-50 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#e5d3b0] rounded-full opacity-30 blur-3xl"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
                <h1 className="font-serif text-5xl md:text-6xl text-[#5c4d3c] font-bold leading-tight mb-6">
                  Transformamos madeira em <span className="italic text-gray-600">sonhos.</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
                  Projetos exclusivos que unem funcionalidade e design atemporal. Da sua imaginação para o conforto do seu lar.
                </p>
                <a href="#projetos" className="inline-block bg-[#5c4d3c] text-white px-8 py-3 rounded shadow-lg hover:bg-gray-800 transition duration-300 transform hover:-translate-y-1">
                  Ver Projetos Realizados
                </a>
              </div>
              <div className="md:w-1/2 w-full">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Cozinha Planejada" className="rounded-lg shadow-2xl z-10 relative w-full h-auto" />
                  <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded shadow-lg z-20 hidden md:block">
                    <p className="font-serif text-[#5c4d3c] text-xl font-bold">150+</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Projetos Entregues</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Seção Projetos */}
          <section id="projetos" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl md:text-4xl text-[#5c4d3c] font-bold mb-4">Nossos Projetos</h2>
                <p className="text-gray-500">Navegue pelas categorias e clique para ver os detalhes.</p>
                
                {/* Filtros */}
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {['todos', 'cozinha', 'quarto', 'sala', 'banheiro'].map((cat) => (
                    <button 
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`px-6 py-2 rounded-full border text-sm transition-colors capitalize ${
                        filter === cat 
                          ? 'bg-[#5c4d3c] text-white border-[#5c4d3c]' 
                          : 'border-[#efe4cd] text-gray-600 hover:bg-[#f7f1e3]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid da Galeria */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.length === 0 ? (
                  <p className="col-span-3 text-center text-gray-400 py-10">Nenhum projeto encontrado nesta categoria.</p>
                ) : (
                  filteredProjects.map((project) => (
                    <div 
                      key={project.id} 
                      onClick={() => setSelectedProject(project)} // AÇÃO DE CLIQUE PARA ABRIR O MODAL
                      className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer bg-white"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-[#5c4d3c]/0 group-hover:bg-[#5c4d3c]/40 transition duration-300 flex items-center justify-center">
                          <span className="text-white opacity-0 group-hover:opacity-100 font-serif text-lg border border-white px-4 py-2 bg-white/10 backdrop-blur-sm">Ver Detalhes</span>
                        </div>
                      </div>
                      <div className="p-4 bg-white border-t border-gray-100">
                        <p className="text-xs text-[#5c4d3c] font-bold uppercase tracking-wide mb-1">{project.category}</p>
                        <h3 className="font-serif text-lg text-gray-800 group-hover:text-[#5c4d3c] transition">{project.title}</h3>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          {/* Seção Sobre */}
          <section id="sobre" className="py-20 bg-[#fdfbf7]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Marceneiro" className="rounded-lg shadow-xl grayscale hover:grayscale-0 transition duration-500 w-full" />
              </div>
              <div className="md:w-1/2">
                <h2 className="font-serif text-3xl text-[#5c4d3c] font-bold mb-6">Tradição em cada detalhe</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  A <span className="font-bold text-[#5c4d3c]">Decmobly</span> nasceu da paixão pela marcenaria clássica combinada com as tendências modernas de design de interiores.
                </p>
                <ul className="space-y-3 mt-6">
                  {['Garantia estendida em todos os projetos', 'Projeto 3D incluso no orçamento', 'Pontualidade rigorosa na entrega'].map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <i className="ph ph-check-circle text-[#5c4d3c] mr-2 text-xl"></i> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Seção Contato */}
          <section id="contato" className="py-20 bg-[#5c4d3c] text-[#fdfbf7]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h2 className="font-serif text-3xl font-bold mb-6">Vamos conversar?</h2>
                  <p className="mb-8 text-[#efe4cd]">Entre em contato para agendar uma visita ou solicitar um orçamento sem compromisso.</p>
                  <div className="space-y-4">
                    <div className="flex items-center"><i className="ph ph-whatsapp-logo text-2xl mr-4"></i> (97) 98420-8329</div>
                    <div className="flex items-center"><i className="ph ph-envelope-simple text-2xl mr-4"></i> contato@decmobly.com.br</div>
                    <div className="flex items-center"><i className="ph ph-map-pin text-2xl mr-4"></i> Av. dos Marceneiros, 1200 - SP</div>
                  </div>
                </div>
                
                <div className="bg-white/5 p-8 rounded-lg border border-white/10">
                  <form onSubmit={(e) => { e.preventDefault(); alert('Mensagem enviada com sucesso! (Demo)'); }}>
                    <div className="mb-4">
                      <label className="block text-sm mb-2">Nome</label>
                      <input type="text" className="w-full bg-transparent border border-[#efe4cd]/30 rounded p-3 focus:outline-none focus:border-[#efe4cd] transition" placeholder="Seu nome" />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm mb-2">Email</label>
                      <input type="email" className="w-full bg-transparent border border-[#efe4cd]/30 rounded p-3 focus:outline-none focus:border-[#efe4cd] transition" placeholder="seu@email.com" />
                    </div>
                    <button type="submit" className="w-full bg-[#f7f1e3] text-[#5c4d3c] font-bold py-3 rounded hover:bg-white transition">Enviar Mensagem</button>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-[#5c4d3c] border-t border-white/10 py-8 text-center text-sm text-[#efe4cd]/60">
            <p>&copy; 2024 Decmobly Móveis Planejados. Todos os direitos reservados.</p>
          </footer>
        </main>
      )}

      {/* ================= VIEW: LOGIN ================= */}
      {currentView === 'login' && (
        <section className="min-h-screen flex items-center justify-center bg-[#fdfbf7] animate-in fade-in zoom-in-95 duration-300">
          <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl border border-[#f7f1e3]">
            <div className="text-center mb-8">
              <span className="font-serif text-3xl text-[#5c4d3c] font-bold tracking-wide">Decmobly</span>
              <p className="text-gray-500 text-sm mt-2">Área Administrativa</p>
            </div>
            
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Usuário</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-[#e5d3b0]" 
                  placeholder="admin" 
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-[#e5d3b0]" 
                  placeholder="admin" 
                />
              </div>
              <button type="submit" className="w-full bg-[#5c4d3c] text-white font-bold py-3 rounded hover:bg-gray-800 transition">Entrar</button>
            </form>
            <div className="mt-4 text-center">
              <button onClick={() => handleNavigate('home')} className="text-sm text-gray-500 hover:text-[#5c4d3c] underline">Voltar para o site</button>
            </div>
            <p className="text-xs text-center text-gray-400 mt-6">(Dica: use "admin" / "admin")</p>
          </div>
        </section>
      )}

      {/* ================= VIEW: ADMIN DASHBOARD ================= */}
      {currentView === 'admin' && (
        <section className="min-h-screen bg-gray-50 animate-in fade-in duration-300">
          <div className="flex flex-col h-screen">
            {/* Admin Header */}
            <div className="bg-[#5c4d3c] text-white p-4 flex justify-between items-center shadow-md">
              <h2 className="font-serif font-bold text-xl">Decmobly <span className="text-sm font-sans font-normal opacity-70">| Gestão</span></h2>
              <button onClick={handleLogout} className="text-sm bg-white/10 px-4 py-2 rounded hover:bg-white/20 transition">Sair</button>
            </div>

            {/* Admin Content */}
            <div className="flex-1 p-8 overflow-auto">
              <div className="max-w-5xl mx-auto">
                
                {/* Adicionar Novo Projeto */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
                  <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center"><i className="ph ph-plus-circle mr-2"></i> Adicionar Novo Projeto</h3>
                  <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Título do Projeto</label>
                      <input 
                        type="text" 
                        required 
                        value={newProject.title}
                        onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-[#5c4d3c]" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Categoria</label>
                      <select 
                        value={newProject.category}
                        onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-[#5c4d3c]"
                      >
                        <option value="cozinha">Cozinha</option>
                        <option value="sala">Sala</option>
                        <option value="quarto">Quarto</option>
                        <option value="banheiro">Banheiro</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">URL da Imagem</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="https://..." 
                        value={newProject.image}
                        onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-[#5c4d3c]" 
                      />
                    </div>
                    {/* NOVO CAMPO: DESCRIÇÃO NO ADMIN */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Descrição Detalhada</label>
                      <textarea 
                        rows={3}
                        placeholder="Descreva os materiais usados, estilo e detalhes do projeto..." 
                        value={newProject.description}
                        onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-[#5c4d3c]" 
                      />
                    </div>

                    <div className="md:col-span-2 text-right">
                      <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700 transition">Salvar Projeto</button>
                    </div>
                  </form>
                </div>

                {/* Lista de Projetos Atuais */}
                <h3 className="font-bold text-gray-800 text-lg mb-4">Projetos Publicados ({projects.length})</h3>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
                      <tr>
                        <th className="p-4 border-b">Imagem</th>
                        <th className="p-4 border-b">Título</th>
                        <th className="p-4 border-b">Categoria</th>
                        <th className="p-4 border-b text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((p) => (
                        <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50">
                          <td className="p-4"><img src={p.image} alt="" className="w-12 h-12 rounded object-cover" /></td>
                          <td className="p-4 font-medium text-gray-800">
                            {p.title}
                            {/* Exibe um trecho da descrição para confirmação */}
                            <p className="text-xs text-gray-400 truncate max-w-50">{p.description}</p>
                          </td>
                          <td className="p-4"><span className="bg-[#f7f1e3] text-[#5c4d3c] px-2 py-1 rounded text-xs uppercase font-bold">{p.category}</span></td>
                          <td className="p-4 text-right">
                            <button onClick={() => handleDeleteProject(p.id)} className="text-red-500 hover:text-red-700 text-sm font-bold">Excluir</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= DEMO WIDGET ================= */}
      <div className="fixed bottom-6 right-6 z-50">
        {demoWidgetOpen && (
          <div className="absolute bottom-14 right-0 bg-white p-6 rounded-lg shadow-2xl border border-[#efe4cd] w-80 animate-in slide-in-from-bottom-5 mb-2">
            <h4 className="font-bold text-[#5c4d3c] border-b pb-2 mb-2">Demonstração</h4>
            <p className="text-xs text-gray-500 mb-4">Esta versão foi desenvolvida para demonstrar o funcionamento do projeto.</p>
            <ul className="text-sm space-y-2 mb-4">
              <li className="flex items-center text-gray-700"><i className="ph ph-check text-green-500 mr-2"></i> Área de projetos interativa</li>
              <li className="flex items-center text-gray-700"><i className="ph ph-check text-green-500 mr-2"></i> Modal de Detalhes (Novo!)</li>
              <li className="flex items-center text-gray-700"><i className="ph ph-check text-green-500 mr-2"></i> Painel de Gestão Completo</li>
            </ul>
            <button onClick={() => setDemoWidgetOpen(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
              <i className="ph ph-x"></i>
            </button>
          </div>
        )}
        <button 
          onClick={() => setDemoWidgetOpen(!demoWidgetOpen)} 
          className="bg-[#5c4d3c] text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-800 transition transform hover:scale-105"
        >
          <i className="ph ph-code text-3xl"></i>
        </button>
      </div>
    </div>
  );
}