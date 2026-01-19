'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function ClinicPage() {
  // --- Estados ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Estado do formulário
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    especialidade: '',
    mensagem: ''
  });

  // --- Efeitos ---
  
  // Detectar scroll para mudar a navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Handlers ---

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  
  // Fecha o menu ao clicar em um link
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de envio
    console.log('Dados enviados:', formData);
    setShowSuccessModal(true);
    setFormData({ nome: '', telefone: '', especialidade: '', mensagem: '' }); // Reset
  };

  return (
    <div className="font-sans text-slate-600 antialiased bg-slate-50 scroll-smooth">
      {/* Em Next.js "puro", links de CSS externos devem ir no layout.tsx ou Head.
        Como pediu arquivo único, injetamos aqui para garantir que os ícones funcionem.
      */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@500;600;700;800&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

        .font-heading { font-family: 'Montserrat', sans-serif; }
        
        /* Animação do Modal */
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        
        /* Pulse do WhatsApp */
        @keyframes pulse-custom {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(37, 211, 102, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        .animate-pulse-custom { animation: pulse-custom 2s infinite; }
      `}</style>

      {/* --- Navbar --- */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg py-2' : 'bg-white shadow-md py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="shrink-0 flex items-center gap-2 cursor-pointer" onClick={(e) => handleLinkClick(e as any, 'inicio')}>
              <div className="bg-sky-500 text-white p-2 rounded-lg">
                <i className="fa-solid fa-heart-pulse text-xl md:text-2xl"></i>
              </div>
              <span className="font-heading font-bold text-xl md:text-2xl text-slate-900">
                Vida<span className="text-sky-500">&</span>Saúde
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              {['Início', 'Especialidades', 'Corpo Clínico', 'Depoimentos'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-').replace('í', 'i')}`}
                  onClick={(e) => handleLinkClick(e, item === 'Início' ? 'inicio' : item === 'Corpo Clínico' ? 'equipe' : item.toLowerCase())}
                  className="text-slate-700 hover:text-sky-500 font-medium transition"
                >
                  {item}
                </a>
              ))}
              <a 
                href="#contato"
                onClick={(e) => handleLinkClick(e, 'contato')}
                className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2.5 rounded-full font-bold transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Agendar Consulta
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={toggleMenu}
                className="text-slate-900 hover:text-sky-500 focus:outline-none p-2"
                aria-label="Menu principal"
              >
                <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl animate-fade-in">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {[
                { label: 'Início', id: 'inicio' },
                { label: 'Especialidades', id: 'especialidades' },
                { label: 'Corpo Clínico', id: 'equipe' },
                { label: 'Depoimentos', id: 'depoimentos' }
              ].map((link) => (
                <a 
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-sky-500 hover:bg-slate-50 border-b border-slate-50 last:border-0"
                >
                  {link.label}
                </a>
              ))}
              <a 
                href="#contato"
                onClick={(e) => handleLinkClick(e, 'contato')}
                className="block w-full text-center mt-4 bg-sky-500 text-white px-4 py-3 rounded-lg font-bold shadow-md active:bg-sky-700"
              >
                Agendar Agora
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <section 
        id="inicio" 
        className="relative min-h-screen flex items-center pt-24 pb-4 bg-slate-900"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.65)), url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed' // Pode ser removido em mobile se causar lag
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-0">
          <div className="md:w-2/3 lg:w-1/2 text-white">
            <div className="inline-block bg-teal-500/20 border border-teal-500/30 rounded-full px-4 py-1 mb-6 backdrop-blur-sm">
              <span className="text-teal-400 font-semibold text-xs md:text-sm uppercase tracking-wide">
                <i className="fa-solid fa-star mr-1"></i> Cuidado Especializado
              </span>
            </div>
            
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Sua saúde merece o <span className="text-sky-500">melhor cuidado</span> possível.
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl text-slate-200 mb-8 leading-relaxed max-w-lg">
              Atendimento humanizado, tecnologia de ponta e especialistas dedicados ao seu bem-estar e da sua família.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contato"
                onClick={(e) => handleLinkClick(e, 'contato')}
                className="bg-sky-500 hover:bg-sky-600 text-white text-center px-8 py-4 rounded-lg font-bold text-lg transition shadow-lg hover:shadow-sky-500/50 flex items-center justify-center gap-2"
              >
                <i className="fa-regular fa-calendar-check"></i> Agendar Consulta
              </a>
              <a 
                href="https://wa.me/5511999999999" 
                target="_blank" 
                rel="noreferrer"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white text-center px-8 py-4 rounded-lg font-bold text-lg transition flex items-center justify-center gap-2"
              >
                <i className="fa-brands fa-whatsapp"></i> WhatsApp
              </a>
            </div>
            
            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
              {[
                { val: '+15', label: 'Anos' },
                { val: '+10k', label: 'Pacientes' },
                { val: '4.9', label: 'Avaliação' }
              ].map((stat, idx) => (
                <div key={idx}>
                  <p className="text-2xl md:text-3xl font-bold text-sky-500">{stat.val}</p>
                  <p className="text-xs md:text-sm text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Diferenciais (Cards Flutuantes) --- */}
      <section className="relative z-10 mt-10 px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-12">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: 'fa-user-doctor', color: 'text-sky-500', bg: 'bg-sky-50', title: 'Especialistas', desc: 'Corpo clínico formado nas melhores universidades.' },
                  { icon: 'fa-microscope', color: 'text-teal-500', bg: 'bg-teal-50', title: 'Tecnologia', desc: 'Equipamentos de última geração para diagnósticos precisos.' },
                  { icon: 'fa-heart-circle-check', color: 'text-blue-600', bg: 'bg-blue-50', title: 'Humanização', desc: 'Acolhimento desde a recepção até o pós-consulta.' }
                ].map((item, idx) => (
                  <div key={idx} className="text-center md:text-left p-4 rounded-xl hover:bg-slate-50 transition duration-300">
                    <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-xl flex items-center justify-center text-2xl mb-4 mx-auto md:mx-0`}>
                      <i className={`fa-solid ${item.icon}`}></i>
                    </div>
                    <h3 className="font-heading text-lg md:text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm md:text-base">{item.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* --- Especialidades --- */}
      <section id="especialidades" className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-sky-500 font-bold uppercase tracking-wider mb-2 text-sm md:text-base">Nossos Serviços</h2>
            <h3 className="font-heading text-2xl md:text-4xl font-bold text-slate-900">Especialidades Médicas</h3>
            <div className="w-20 h-1 bg-sky-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Cardiologia', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', desc: 'Saúde do coração e sistema circulatório.' },
              { title: 'Pediatria', img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', desc: 'Acompanhamento do desenvolvimento infantil.' },
              { title: 'Dermatologia', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', desc: 'Cuidados com pele, cabelos e unhas.' },
              { title: 'Ortopedia', img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', desc: 'Tratamento de ossos e articulações.' }
            ].map((esp, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-slate-100 transform hover:-translate-y-1">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition z-10"></div>
                  <img src={esp.img} alt={esp.title} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500" />
                </div>
                <div className="p-6">
                  <h4 className="font-heading text-xl font-bold text-slate-900 mb-2">{esp.title}</h4>
                  <p className="text-sm text-slate-500 mb-4">{esp.desc}</p>
                  <a href="#contato" onClick={(e) => handleLinkClick(e, 'contato')} className="text-sky-500 font-semibold text-sm hover:underline flex items-center gap-1">
                    Agendar <i className="fa-solid fa-arrow-right text-xs"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a href="#contato" onClick={(e) => handleLinkClick(e, 'contato')} className="inline-block border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white font-bold py-3 px-8 rounded-full transition duration-300">
              Ver todas as especialidades
            </a>
          </div>
        </div>
      </section>

      {/* --- Corpo Clínico --- */}
      <section id="equipe" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-sky-500 font-bold uppercase tracking-wider mb-2 text-sm md:text-base">Nossa Equipe</h2>
            <h3 className="font-heading text-2xl md:text-4xl font-bold text-slate-900">Médicos de Confiança</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Dra. Ana Silva', role: 'Cardiologista', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
              { name: 'Dr. Carlos Mendes', role: 'Pediatra', img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
              { name: 'Dra. Juliana Costa', role: 'Dermatologista', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' }
            ].map((doc, idx) => (
              <div key={idx} className="group relative rounded-2xl overflow-hidden shadow-md">
                <div className="aspect-3/4 overflow-hidden bg-gray-200">
                  <img src={doc.img} alt={doc.name} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-slate-900/90 via-slate-900/70 to-transparent p-6 text-white pt-20">
                  <h4 className="font-heading text-xl font-bold">{doc.name}</h4>
                  <p className="text-sky-400 font-medium text-sm">{doc.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Depoimentos --- */}
      <section id="depoimentos" className="py-16 md:py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="font-heading text-2xl md:text-4xl font-bold text-slate-900">O que nossos pacientes dizem</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { name: 'Mariana Souza', text: 'Atendimento excelente! Desde a recepção até a consulta. A clínica é muito organizada.' },
              { name: 'Roberto Almeida', text: 'Fiz meu check-up completo em um só lugar. A agilidade nos resultados foi impressionante.' },
              { name: 'Fernanda Lima', text: 'A Dra. Ana é maravilhosa. Explica tudo com muita calma. Recomendo de olhos fechados.' }
            ].map((rev, idx) => (
              <div key={idx} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="flex text-yellow-400 text-sm mb-4">
                  {[...Array(5)].map((_, i) => <i key={i} className="fa-solid fa-star"></i>)}
                </div>
                <p className="text-slate-600 mb-6 italic text-sm md:text-base">"{rev.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-900">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{rev.name}</p>
                    <p className="text-xs text-slate-400">Paciente</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10">Perguntas Frequentes</h3>
          <div className="space-y-4">
            {[
              { q: 'Quais convênios vocês aceitam?', a: 'Aceitamos Unimed, Bradesco, Amil, SulAmérica e outros. Consulte pelo WhatsApp.' },
              { q: 'Como faço para agendar?', a: 'Pelo formulário abaixo, telefone fixo ou WhatsApp.' },
              { q: 'Realizam exames no local?', a: 'Sim, realizamos exames laboratoriais, de imagem e cardiológicos.' }
            ].map((faq, idx) => (
              <details key={idx} className="group bg-slate-50 rounded-lg p-4 cursor-pointer [&_summary::-webkit-details-marker]:hidden border border-transparent hover:border-sky-100 transition">
                <summary className="flex items-center justify-between font-medium text-slate-900 list-none">
                  {faq.q}
                  <span className="transition group-open:rotate-180 text-sky-500">
                    <i className="fa-solid fa-chevron-down"></i>
                  </span>
                </summary>
                <p className="text-slate-600 mt-4 leading-relaxed text-sm animate-fade-in">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* --- Contato --- */}
      <section id="contato" className="bg-slate-900 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Info */}
            <div className="order-2 lg:order-1">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">Entre em Contato</h2>
              <p className="text-slate-300 mb-8">Estamos prontos para cuidar de você. Agende sua consulta.</p>
              
              <div className="space-y-6 mb-8">
                {[
                  { icon: 'fa-location-dot', title: 'Endereço', lines: ['Av. Paulista, 1000', 'São Paulo - SP'] },
                  { icon: 'fa-phone', title: 'Telefones', lines: ['(11) 3333-4444', '(11) 99999-9999'] },
                  { icon: 'fa-clock', title: 'Horário', lines: ['Seg - Sex: 08:00 - 19:00', 'Sáb: 08:00 - 13:00'] }
                ].map((info, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-500 shrink-0">
                      <i className={`fa-solid ${info.icon}`}></i>
                    </div>
                    <div>
                      <h4 className="font-bold">{info.title}</h4>
                      {info.lines.map((line, i) => <p key={i} className="text-slate-300 text-sm">{line}</p>)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mapa */}
              <div className="w-full h-48 bg-slate-800 rounded-xl overflow-hidden relative border border-slate-700">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197577583736!2d-46.65429492382024!3d-23.56396826159048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%201000%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001310-100!5e0!3m2!1spt-BR!2sbr!4v1715000000000!5m2!1spt-BR!2sbr" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                  title="Mapa de Localização"
                ></iframe>
              </div>
            </div>

            {/* Formulário */}
            <div className="order-1 lg:order-2 bg-white text-slate-800 p-6 md:p-8 rounded-2xl shadow-2xl">
              <h3 className="font-heading text-2xl font-bold mb-6 text-slate-900">Solicitar Agendamento</h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="nome">Nome Completo</label>
                    <input 
                      type="text" 
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      required 
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition" 
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="telefone">Telefone</label>
                    <input 
                      type="tel" 
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      required 
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition" 
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="especialidade">Especialidade</label>
                  <select 
                    id="especialidade" 
                    name="especialidade"
                    value={formData.especialidade}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition bg-white"
                  >
                    <option value="" disabled>Selecione...</option>
                    <option>Cardiologia</option>
                    <option>Dermatologia</option>
                    <option>Pediatria</option>
                    <option>Ortopedia</option>
                    <option>Clínico Geral</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1" htmlFor="mensagem">Mensagem (Opcional)</label>
                  <textarea 
                    id="mensagem" 
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    rows={3} 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition" 
                    placeholder="Preferência de horário, dúvidas..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-lg transition transform hover:-translate-y-0.5 shadow-lg"
                >
                  Enviar Solicitação
                </button>
                <p className="text-xs text-center text-slate-400 mt-4 flex items-center justify-center gap-1">
                  <i className="fa-solid fa-lock"></i> Seus dados estão seguros.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-slate-950 text-slate-400 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="text-sm">
            © {new Date().getFullYear()} Clínica Vida & Saúde. Todos os direitos reservados.
          </div>
          <div className="flex gap-6 text-xl">
            <a href="#" className="hover:text-sky-500 transition" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" className="hover:text-sky-500 transition" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></a>
            <a href="#" className="hover:text-sky-500 transition" aria-label="LinkedIn"><i className="fa-brands fa-linkedin"></i></a>
          </div>
        </div>
      </footer>

      {/* --- WhatsApp Flutuante --- */}
      <a 
        href="https://wa.me/5511999999999" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 md:w-16 md:h-16 shadow-xl transition duration-300 flex items-center justify-center animate-pulse-custom"
        aria-label="Fale conosco no WhatsApp"
      >
        <i className="fa-brands fa-whatsapp text-3xl"></i>
      </a>

      {/* --- Modal de Sucesso --- */}
      {showSuccessModal && (
        <div 
          className="fixed inset-0 z-1000 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={(e) => { if(e.target === e.currentTarget) setShowSuccessModal(false); }}
        >
          <div className="bg-white p-8 rounded-2xl max-w-sm w-full text-center shadow-2xl animate-fade-in relative">
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              <i className="fa-solid fa-check"></i>
            </div>
            <h3 className="font-heading text-2xl font-bold text-slate-900 mb-2">Enviado!</h3>
            <p className="text-slate-600 mb-6 text-sm">Recebemos sua solicitação. Entraremos em contato em breve para confirmar o horário.</p>
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2.5 px-6 rounded-lg transition w-full"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}