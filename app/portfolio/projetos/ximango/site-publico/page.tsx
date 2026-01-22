'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function XimangoPublicSite() {
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleFab = () => setIsFabOpen(!isFabOpen);

  return (
    <div className="bg-white text-gray-800 font-sans antialiased overflow-x-hidden selection:bg-[#FF5722] selection:text-white">
      {/* NOTA: Para um site físico (prestação de serviço), geralmente usamos fundo claro 
        ou misto para passar sensação de limpeza, diferente do "Dark Mode" de infoprodutos.
        Aqui usei uma base clara com seções escuras para contraste premium.
      */}
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        .text-brand { color: #FF5722; }
        .bg-brand { background-color: #FF5722; }
        .border-brand { border-color: #FF5722; }
        .hover-brand:hover { background-color: #E64A19; }
      `}</style>
      
      {/* Importando FontAwesome */}
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />

      {/* ========================================
          HEADER / NAVBAR
         ======================================== */}
      <nav className="w-full py-4 px-6 bg-[#111111] text-white fixed top-0 z-50 border-b border-white/10 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#FF5722] rounded flex items-center justify-center font-black text-white text-xl">X</div>
            <span className="font-bold text-xl tracking-tighter">XIMANGO<span className="text-[#FF5722] text-xs block font-normal tracking-widest uppercase">Estética Automotiva</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#inicio" className="hover:text-[#FF5722] transition-colors">Início</a>
            <a href="#servicos" className="hover:text-[#FF5722] transition-colors">Serviços</a>
            <a href="#galeria" className="hover:text-[#FF5722] transition-colors">Galeria</a>
            <a href="#sobre" className="hover:text-[#FF5722] transition-colors">Sobre Nós</a>
            <a href="#contato" className="bg-[#FF5722] text-white px-5 py-2 rounded-full hover:bg-orange-600 transition-colors shadow-lg shadow-orange-900/50">
              <i className="fab fa-whatsapp mr-2"></i> Agendar
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-2xl" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#111111] border-t border-white/10 py-4 px-6 flex flex-col gap-4 shadow-2xl">
            <a href="#inicio" className="text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>Início</a>
            <a href="#servicos" className="text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>Serviços</a>
            <a href="#galeria" className="text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>Galeria</a>
            <a href="#contato" className="text-[#FF5722] font-bold" onClick={() => setIsMobileMenuOpen(false)}>Fale Conosco</a>
          </div>
        )}
      </nav>

      {/* ========================================
          HERO SECTION
         ======================================== */}
      <header id="inicio" className="relative h-screen min-h-150 flex items-center justify-center text-center px-6">
        {/* Imagem de Fundo Escura */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/70 to-black/40"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-white mt-16">
          <p className="text-[#FF5722] font-bold tracking-widest uppercase mb-4 animate-fade-in-up">Canosas - RS</p>
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            O tratamento VIP que <br/><span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF5722] to-orange-400">seu carro merece.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Não é apenas uma lavagem. É detalhamento automotivo de alto padrão. Proteção, brilho e valorização do seu patrimônio.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="https://wa.me/5592999999999" target="_blank" className="bg-[#FF5722] text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-orange-600 transition shadow-lg shadow-orange-900/50 flex items-center justify-center gap-2">
              <i className="fab fa-whatsapp"></i> Orçamento via WhatsApp
            </a>
            <a href="#servicos" className="bg-transparent border-2 border-white/20 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-white/10 transition flex items-center justify-center gap-2">
              Conhecer Serviços
            </a>
          </div>
        </div>
      </header>

      {/* ========================================
          SERVIÇOS
         ======================================== */}
      <section id="servicos" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Nossas Especialidades</h2>
            <div className="w-20 h-1 bg-[#FF5722] mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4">Cuidamos de cada detalhe, do motor ao escapamento.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Serviço 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 border-b-4 border-[#FF5722]">
              <div className="w-16 h-16 bg-[#FF5722]/10 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-soap text-[#FF5722] text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Lavagem Detalhada</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Limpeza técnica de caixa de rodas, motor, emblemas e cantos de porta. Uso de produtos pH neutro que não agridem a pintura.
              </p>
              <span className="text-[#FF5722] font-bold text-sm">A partir de R$ 80,00</span>
            </div>

            {/* Serviço 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 border-b-4 border-[#FF5722]">
              <div className="w-16 h-16 bg-[#FF5722]/10 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-gem text-[#FF5722] text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Polimento Técnico</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Correção de verniz, remoção de riscos (swirls), manchas d'água e hologramas. Devolve o brilho de carro zero.
              </p>
              <span className="text-[#FF5722] font-bold text-sm">Consulte avaliação</span>
            </div>

            {/* Serviço 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 border-b-4 border-[#FF5722]">
              <div className="w-16 h-16 bg-[#FF5722]/10 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-shield-alt text-[#FF5722] text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Vitrificação</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Proteção cerâmica de até 3 anos. Cria uma camada de vidro sobre a pintura, repelindo água e sujeira.
              </p>
              <span className="text-[#FF5722] font-bold text-sm">Certificado de Garantia</span>
            </div>
            
            {/* Serviço 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 border-b-4 border-[#FF5722]">
              <div className="w-16 h-16 bg-[#FF5722]/10 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-couch text-[#FF5722] text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Higienização Interna</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Limpeza profunda de bancos (couro ou tecido), carpete e teto. Remoção de manchas, ácaros e odores.
              </p>
            </div>

             {/* Serviço 5 */}
             <div className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 border-b-4 border-[#FF5722]">
              <div className="w-16 h-16 bg-[#FF5722]/10 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-wind text-[#FF5722] text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Oxi-Sanitização</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Uso de gerador de ozônio para eliminar cheiro de cigarro, mofo e bactérias do sistema de ar condicionado.
              </p>
            </div>

             {/* Serviço 6 */}
             <div className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 border-b-4 border-[#FF5722]">
              <div className="w-16 h-16 bg-[#FF5722]/10 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-motorcycle text-[#FF5722] text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Detailing Motos</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Tratamento especial para motocicletas. Limpeza de corrente, proteção de plásticos e cera de alta performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SOBRE A XIMANGO
         ======================================== */}
      <section id="sobre" className="py-20 px-6 bg-[#111111] text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1600661653561-629509216228?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Equipe Ximango trabalhando" 
              className="rounded-2xl shadow-2xl border border-white/10"
            />
          </div>
          <div className="md:w-1/2">
            <h4 className="text-[#FF5722] font-bold uppercase tracking-wider mb-2">Sobre Nós</h4>
            <h2 className="text-3xl md:text-4xl font-black mb-6">Paixão por carros em cada detalhe.</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              A <strong>Ximango Estética Automotiva</strong> nasceu da necessidade de um serviço transparente e de qualidade em Canoas. 
              Não usamos "pretinho com açúcar" nem produtos agressivos. 
            </p>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Trabalhamos com as melhores marcas mundiais (Vonixx, CarPro, Menzerna) e seguimos processos rigorosos de checklists 
              para garantir que seu carro saia daqui melhor do que quando entrou na concessionária.
            </p>
            
            <div className="flex gap-6">
              <div>
                <span className="block text-3xl font-bold text-[#FF5722]">+1.500</span>
                <span className="text-xs text-gray-500 uppercase">Carros Atendidos</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-[#FF5722]">5.0</span>
                <span className="text-xs text-gray-500 uppercase">Estrelas no Google</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          GALERIA (ANTES E DEPOIS)
         ======================================== */}
      <section id="galeria" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">Resultados Reais</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {/* Foto 1 */}
             <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden group relative">
                <img src="https://images.unsplash.com/photo-1552930294-6b595f4c2974?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt="Polimento" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <p className="text-white font-bold">Vitrificação 9H</p>
                </div>
             </div>
             {/* Foto 2 */}
             <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden group relative">
                <img src="https://images.unsplash.com/photo-1605218427368-35b86d953cc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt="Lavagem" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <p className="text-white font-bold">Motor Detalhado</p>
                </div>
             </div>
             {/* Foto 3 */}
             <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden group relative">
                <img src="https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt="Interior" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <p className="text-white font-bold">Higienização</p>
                </div>
             </div>
             {/* Foto 4 */}
             <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden group relative">
                <img src="https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt="Farol" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <p className="text-white font-bold">Revitalização de Farol</p>
                </div>
             </div>
          </div>
          
          <div className="text-center mt-8">
            <a href="https://instagram.com" target="_blank" className="text-[#FF5722] font-bold hover:underline">
              <i className="fab fa-instagram"></i> Ver mais no Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ========================================
          PROVA SOCIAL
         ======================================== */}
      <section className="py-16 px-6 bg-[#FF5722] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <i className="fas fa-quote-left text-4xl mb-6 opacity-30"></i>
          <h3 className="text-2xl font-medium italic mb-6">
            "Levei meu Corolla para fazer uma vitrificação e fiquei impressionado. O carro brilha mais do que quando tirei da loja. Atendimento nota 10 do pessoal da Ximango."
          </h3>
          <div className="flex items-center justify-center gap-4">
             <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-xl">
               R
             </div>
             <div className="text-left">
               <p className="font-bold">Ricardo Oliveira</p>
               <p className="text-sm opacity-80">Cliente via Google Reviews</p>
             </div>
          </div>
        </div>
      </section>

      {/* ========================================
          LOCALIZAÇÃO & CONTATO
         ======================================== */}
      <section id="contato" className="py-20 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Informações */}
          <div className="p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Visite a Ximango</h2>
            <p className="text-gray-600 mb-8">
              Venha tomar um café conosco enquanto avaliamos seu veículo sem compromisso.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <i className="fas fa-map-marker-alt text-[#FF5722] text-xl mt-1"></i>
                <div>
                  <h4 className="font-bold text-gray-900">Endereço</h4>
                  <p className="text-gray-600">Rua 24 de Agosto, 2500 - Esteio<br/>Canoas - RS, 92000-000</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <i className="fas fa-clock text-[#FF5722] text-xl mt-1"></i>
                <div>
                  <h4 className="font-bold text-gray-900">Horário de Funcionamento</h4>
                  <p className="text-gray-600">Segunda a Sexta: 08:00 - 18:00<br/>Sábado: 08:00 - 14:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <i className="fab fa-whatsapp text-[#FF5722] text-xl mt-1"></i>
                <div>
                  <h4 className="font-bold text-gray-900">Contato</h4>
                  <p className="text-gray-600">(92) 99999-9999</p>
                  <p className="text-gray-600">contato@ximangoestetica.com.br</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <a href="https://wa.me/5592999999999" className="block w-full text-center bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition shadow-lg">
                <i className="fab fa-whatsapp mr-2"></i> Agendar Agora
              </a>
            </div>
          </div>

          {/* Mapa (Imagem estática para demo) */}
          <div className="bg-gray-300 relative h-64 md:h-auto min-h-75">
             {/* Em produção, substituir por iframe do Google Maps */}
             <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <div className="text-center text-gray-500">
                   <i className="fas fa-map-marked-alt text-4xl mb-2"></i>
                   <p>Google Maps Embed</p>
                </div>
             </div>
             {/* Overlay simulando mapa */}
             <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" className="w-full h-full object-cover opacity-50" alt="Mapa" />
          </div>
        </div>
      </section>

      {/* ========================================
          FOOTER
         ======================================== */}
      <footer className="bg-[#111111] text-gray-400 py-12 px-6 border-t border-white/10 pb-32 md:pb-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-bold text-lg mb-4">XIMANGO</h4>
            <p className="text-sm">Estética automotiva de alto padrão em Canoas. Cuidando do seu carro com a paixão que ele merece.</p>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Links Rápidos</h4>
            <ul className="text-sm space-y-2">
              <li><a href="#inicio" className="hover:text-[#FF5722]">Início</a></li>
              <li><a href="#servicos" className="hover:text-[#FF5722]">Serviços</a></li>
              <li><a href="#galeria" className="hover:text-[#FF5722]">Galeria</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Serviços</h4>
            <ul className="text-sm space-y-2">
              <li>Polimento Técnico</li>
              <li>Vitrificação</li>
              <li>Higienização</li>
              <li>Lavagem Detalhada</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Social</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF5722] hover:text-white transition"><i className="fab fa-instagram"></i></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF5722] hover:text-white transition"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF5722] hover:text-white transition"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/10 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Ximango Estética Automotiva. Todos os direitos reservados. Desenvolvido por <a href="https://levbrands.com.br" target="_blank" className="text-[#00E5FF] hover:underline">LevBrands</a></p>
        </div>
      </footer>

      {/* ========================================
        BOTÃO FLUTUANTE DE NAVEGAÇÃO (FAB) 
        ========================================
      */}
      <div className="fixed bottom-6 right-6 z-60 flex flex-col items-end gap-3">
        {/* Menu Items */}
        <div className={`flex flex-col gap-3 transition-all duration-300 origin-bottom ${isFabOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'}`}>
          <div  className="flex items-center gap-3 bg-[#FF5722] text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-100 hover:text-[#FF5722] transition-colors whitespace-nowrap group">
            <span className="text-xs font-bold">Selecione a página:</span>
          </div>
          <Link href="/portfolio/projetos/ximango" className="flex items-center gap-3 bg-white text-gray-900 px-4 py-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors whitespace-nowrap group">
            <span className="text-xs font-bold">MPE</span>
            <div className="w-8 h-8 rounded-full bg-[#FF5722] flex items-center justify-center text-white">
              <i className="fas fa-laptop-code text-sm"></i>
            </div>
          </Link>

          <Link href="/portfolio/projetos/ximango/site-publico" className="flex items-center gap-3 bg-white text-gray-900 px-4 py-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors whitespace-nowrap group">
            <span className="text-xs font-bold">Site Público</span>
            <div className="w-8 h-8 rounded-full bg-[#FF5722] flex items-center justify-center text-white">
              <i className="fas fa-globe text-sm"></i>
            </div>
          </Link>

          <Link href="/portfolio/projetos/ximango/checklist" className="flex items-center gap-3 bg-white text-gray-900 px-4 py-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors whitespace-nowrap group">
            <span className="text-xs font-bold">Checklist</span>
            <div className="w-8 h-8 rounded-full bg-[#FF5722] flex items-center justify-center text-white">
              <i className="fas fa-box-open text-sm"></i>
            </div>
          </Link>

        </div>

        {/* Botão Principal FAB */}
        <button 
          onClick={toggleFab}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-2xl text-white transition-all duration-300 hover:scale-110 active:scale-95 ${isFabOpen ? 'bg-gray-800 rotate-45' : 'bg-[#FF5722] rotate-0'}`}
          aria-label="Menu de Navegação"
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>

    </div>
  );
}