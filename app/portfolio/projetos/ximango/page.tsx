'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [isFabOpen, setIsFabOpen] = useState(false);

  const toggleFab = () => setIsFabOpen(!isFabOpen);

  return (
    <div className="bg-[#111111] text-white font-sans antialiased overflow-x-hidden pb-20 selection:bg-[#FF5722] selection:text-white">
      {/* NOTA: Em Next.js (App Router), links de fontes e scripts externos 
        geralmente vão no arquivo layout.tsx. 
        Para facilitar, adicionei o FontAwesome via CDN aqui, 
        mas o ideal é mover para o layout.
      */}
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        .glow-effect { box-shadow: 0 0 20px rgba(255, 87, 34, 0.3); }
        .gradient-text {
            background: linear-gradient(to right, #FF5722, #FF9800);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
      `}</style>
      
      {/* Importando FontAwesome apenas para esta página */}
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />

      {/* Navbar Simplificada */}
      <nav className="w-full py-4 px-6 bg-[#111111]/95 backdrop-blur fixed top-0 z-40 border-b border-white/10 flex justify-center">
        <div className="flex items-center gap-2">
          <i className="fas fa-car-sparkles text-[#FF5722] text-xl"></i>
          <span className="font-bold text-lg tracking-tighter">ESTÉTICA AUTOMOTIVA<span className="text-[#FF5722]"> XIMANGO</span></span>
        </div>
      </nav>

      {/* HERO SECTION: Promessa Forte */}
      <header className="pt-24 pb-12 px-6 text-center relative overflow-hidden">
        {/* Background element */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/ximango/checklist.jpg')] bg-cover bg-center opacity-20 z-0"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-[#111111] to-transparent z-10"></div>

        <div className="relative z-20 max-w-md mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-[#FF5722]/20 text-[#FF5722] text-xs font-bold uppercase tracking-wider mb-4 border border-[#FF5722]/30">
            Curso Online Exclusivo
          </span>
          <h1 className="text-4xl font-black leading-tight mb-4">
            Pare de ser o <span className="text-[#FF5722]">melhor polidor</span> com a <span className="text-white border-b-4 border-[#FF5722]">agenda vazia</span>.
          </h1>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Domine o marketing digital automotivo e atraia clientes que pagam caro pelos seus serviços, sem pedir desconto.
          </p>
          
          {/* Video Placeholder */}
          <div className="w-full aspect-video bg-gray-800 rounded-xl border border-white/10 flex items-center justify-center mb-8 relative group cursor-pointer shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition"></div>
            <i className="fas fa-play-circle text-6xl text-[#FF5722] z-10 glow-effect"></i>
            <p className="absolute bottom-4 text-sm font-medium text-white/80 z-10">Assista ao vídeo de 2 min</p>
          </div>

          <a href="#oferta" className="block w-full bg-[#FF5722] hover:bg-orange-600 text-white font-bold py-4 rounded-lg text-lg uppercase tracking-wide shadow-lg shadow-orange-900/50 transition-all transform hover:scale-105 animate-pulse">
            Quero Lotar Minha Agenda
          </a>
          <p className="text-xs text-gray-500 mt-3 flex justify-center items-center gap-1">
            <i className="fas fa-lock"></i> Compra 100% Segura
          </p>
        </div>
      </header>

      {/* DOR: Identificação */}
      <section className="py-12 px-6 bg-[#1F1F1F] border-y border-white/5">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Isso acontece na sua estética?</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                <i className="fas fa-calendar-times text-red-500 text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Semanas Inconstantes</h3>
                <p className="text-gray-400 text-sm">Uma semana você trabalha muito, na outra fica olhando para o teto esperando o telefone tocar.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                <i className="fas fa-tag text-red-500 text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Clientes "Chorões"</h3>
                <p className="text-gray-400 text-sm">Só aparece gente querendo "lavagem barata" e comparando seu preço com o lava-rápido da esquina.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                <i className="fas fa-camera text-red-500 text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Instagram Morto</h3>
                <p className="text-gray-400 text-sm">Você posta fotos dos carros brilhando, mas só sua mãe e seus amigos curtem. Nenhum cliente real.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUÇÃO: O Método */}
      <section className="py-12 px-6 bg-[#111111] relative">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">A Culpa não é do seu Serviço, é do seu <span className="gradient-text">Marketing</span>.</h2>
          <p className="text-gray-400 mb-8">
            Não adianta usar os melhores produtos e máquinas se ninguém sabe que você existe. O método <strong className="text-white">Estética Pro</strong> foi criado para detailers que não têm tempo a perder.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <i className="fas fa-bullseye text-[#FF5722] text-3xl mb-2"></i>
              <h3 className="font-bold text-sm">Anúncios Certos</h3>
              <p className="text-xs text-gray-400 mt-1">Apareça para quem tem carros de luxo na sua cidade.</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <i className="fab fa-instagram text-[#FF5722] text-3xl mb-2"></i>
              <h3 className="font-bold text-sm">Instagram Vitrine</h3>
              <p className="text-xs text-gray-400 mt-1">Transforme seguidores em agendamentos.</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <i className="fab fa-whatsapp text-[#FF5722] text-3xl mb-2"></i>
              <h3 className="font-bold text-sm">Scripts de Venda</h3>
              <p className="text-xs text-gray-400 mt-1">Copie e cole mensagens que fecham orçamentos.</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <i className="fas fa-camera-retro text-[#FF5722] text-3xl mb-2"></i>
              <h3 className="font-bold text-sm">Fotos que Vendem</h3>
              <p className="text-xs text-gray-400 mt-1">Tire fotos profissionais usando apenas o celular.</p>
            </div>
          </div>
        </div>
      </section>

      {/* AUTORIDADE */}
      <section className="py-12 px-6 bg-linear-to-b from-gray-900 to-black text-center">
        <div className="max-w-md mx-auto">
          <div className="w-32 h-32 mx-auto rounded-full border-4 border-[#FF5722] bg-gray-800 bg-[url('/ximango/perfil.jpg')] bg-cover mb-4"></div>
          <h2 className="text-xl font-bold">Com quem você vai aprender?</h2>
          <p className="text-[#FF5722] font-bold text-lg mb-4">Jefferson D'Elly</p>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Proprietário de Estética Automotiva há 10 anos e consultor de marketing. Já ajudei mais de 500 estéticas a saírem do vermelho e faturarem acima de R$ 30k/mês usando apenas o celular.
          </p>
        </div>
      </section>

      {/* PROVA SOCIAL */}
      <section className="py-12 px-6 bg-[#1F1F1F]">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Resultados de Alunos</h2>
          
          <div className="space-y-4">
            {/* Depoimento 1 */}
            <div className="bg-[#111111] p-6 rounded-xl border border-white/5 shadow-lg">
              <div className="flex text-[#FF5722] mb-2">
                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
              </div>
              <p className="text-gray-300 italic mb-4 text-sm">"Eu achava que cobrar 800 reais num polimento era impossível na minha cidade. Apliquei o Módulo 3 e fechei 2 vitrificações na mesma semana."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Aluno" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-sm">Rafael S.</p>
                  <p className="text-xs text-gray-500">Royal Garage</p>
                </div>
              </div>
            </div>

            {/* Depoimento 2 */}
            <div className="bg-[#111111] p-6 rounded-xl border border-white/5 shadow-lg">
              <div className="flex text-[#FF5722] mb-2">
                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
              </div>
              <p className="text-gray-300 italic mb-4 text-sm">"O script de WhatsApp salvou meu negócio. Eu perdia muito tempo explicando e o cliente sumia. Agora converto 70% dos orçamentos."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Aluna" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-sm">Mariana L.</p>
                  <p className="text-xs text-gray-500">EcoClean Auto</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="py-12 px-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Conteúdo do Treinamento</h2>
          
          <div className="space-y-3">
            <details className="group bg-white/5 rounded-lg open:bg-white/10 transition-all border border-white/10">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4">
                <span className="flex items-center gap-3">
                  <i className="fab fa-instagram text-[#FF5722]"></i> Módulo 1: Instagram Magnético
                </span>
                <span className="transition group-open:rotate-180">
                  <i className="fas fa-chevron-down text-xs"></i>
                </span>
              </summary>
              <div className="text-gray-400 mt-0 px-4 pb-4 text-sm">
                Como arrumar a bio, o que postar nos stories todo dia e como criar reels que viralizam na sua cidade.
              </div>
            </details>

            <details className="group bg-white/5 rounded-lg open:bg-white/10 transition-all border border-white/10">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4">
                <span className="flex items-center gap-3">
                  <i className="fab fa-google text-[#FF5722]"></i> Módulo 2: Google Meu Negócio
                </span>
                <span className="transition group-open:rotate-180">
                  <i className="fas fa-chevron-down text-xs"></i>
                </span>
              </summary>
              <div className="text-gray-400 mt-0 px-4 pb-4 text-sm">
                Seja encontrado por quem pesquisa "lavagem detalhada perto de mim". SEO local simples e prático.
              </div>
            </details>

            <details className="group bg-white/5 rounded-lg open:bg-white/10 transition-all border border-white/10">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4">
                <span className="flex items-center gap-3">
                  <i className="fas fa-bullhorn text-[#FF5722]"></i> Módulo 3: Tráfego Pago (Ads)
                </span>
                <span className="transition group-open:rotate-180">
                  <i className="fas fa-chevron-down text-xs"></i>
                </span>
              </summary>
              <div className="text-gray-400 mt-0 px-4 pb-4 text-sm">
                Como colocar R$ 10,00 por dia e lotar a agenda. Campanhas passo a passo no botão impulsionar do jeito certo.
              </div>
            </details>

            <details className="group bg-white/5 rounded-lg open:bg-white/10 transition-all border border-white/10">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4">
                <span className="flex items-center gap-3">
                  <i className="fab fa-whatsapp text-[#FF5722]"></i> Módulo 4: Fechamento de Venda
                </span>
                <span className="transition group-open:rotate-180">
                  <i className="fas fa-chevron-down text-xs"></i>
                </span>
              </summary>
              <div className="text-gray-400 mt-0 px-4 pb-4 text-sm">
                Scripts prontos para quebrar objeções de "está caro" e vender serviços de ticket alto (Vitrificação).
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* BÔNUS */}
      <section className="py-10 px-6 bg-[#FF5722]/10 border-y border-[#FF5722]/20">
        <div className="max-w-md mx-auto">
          <h3 className="text-center font-bold text-[#FF5722] mb-6 text-xl">🎁 Bônus Exclusivos Hoje</h3>
          
          <div className="flex items-center gap-4 mb-4">
            <i className="fas fa-file-contract text-3xl text-white"></i>
            <div>
              <h4 className="font-bold text-white">Modelo de Contrato e Checklist</h4>
              <p className="text-xs text-gray-400">Para profissionalizar seu atendimento e evitar dores de cabeça.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <i className="fas fa-calculator text-3xl text-white"></i>
            <div>
              <h4 className="font-bold text-white">Planilha de Precificação</h4>
              <p className="text-xs text-gray-400">Saiba exatamente quanto cobrar para ter lucro real.</p>
            </div>
          </div>
        </div>
      </section>

      {/* OFERTA */}
      <section id="oferta" className="py-16 px-6 bg-[#111111] text-center">
        <div className="max-w-md mx-auto border border-[#FF5722] rounded-2xl p-6 relative bg-linear-to-br from-gray-900 to-black shadow-2xl shadow-orange-900/20">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#FF5722] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Oferta por tempo limitado
          </div>

          <p className="text-gray-500 line-through text-sm mt-4">De R$ 997,00</p>
          <h2 className="text-5xl font-black text-white my-2 tracking-tighter">R$ 297<span className="text-lg font-normal text-gray-400">,90</span></h2>
          <p className="text-gray-400 text-sm mb-6">ou 12x de R$ 29,82</p>

          <a href="#" className="block w-full bg-[#FF5722] hover:bg-orange-600 text-white font-bold py-4 rounded-lg text-lg uppercase tracking-wide transition-all shadow-lg animate-bounce mb-4">
            GARANTIR MINHA VAGA
          </a>
          
          <div className="flex justify-center items-center gap-2 text-xs text-gray-400">
            <i className="fas fa-check-circle text-green-500"></i> Acesso Imediato
            <i className="fas fa-check-circle text-green-500"></i> Vitalício
          </div>
        </div>
      </section>

      {/* GARANTIA */}
      <section className="py-12 px-6 text-center bg-white/5">
        <div className="max-w-md mx-auto">
          <i className="fas fa-shield-alt text-5xl text-gray-300 mb-4"></i>
          <h3 className="font-bold text-xl text-white mb-2">Risco Zero (7 Dias)</h3>
          <p className="text-gray-400 text-sm">
            Entre, assista as aulas e aplique. Se em 7 dias você achar que não valeu a pena, eu devolvo 100% do seu dinheiro. Sem perguntas.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-6 mb-20">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-6 text-center">Perguntas Frequentes</h2>
          <div className="space-y-4">
            <div className="border-b border-white/10 pb-4">
              <h4 className="font-bold text-sm text-white mb-1">Serve para quem está começando?</h4>
              <p className="text-xs text-gray-400">Sim! Ensinamos desde como criar o Instagram do zero até estratégias avançadas.</p>
            </div>
            <div className="border-b border-white/10 pb-4">
              <h4 className="font-bold text-sm text-white mb-1">Preciso ter computador?</h4>
              <p className="text-xs text-gray-400">Não. Todo o método foi desenvolvido para ser aplicado usando apenas um Smartphone.</p>
            </div>
            <div className="border-b border-white/10 pb-4">
              <h4 className="font-bold text-sm text-white mb-1">Como recebo o acesso?</h4>
              <p className="text-xs text-gray-400">Imediatamente após a confirmação do pagamento, você recebe login e senha no seu e-mail.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
        BOTÃO FLUTUANTE DE NAVEGAÇÃO (FAB) 
        ========================================
      */}
      <div className="fixed bottom-24 md:bottom-10 right-6 z-60 flex flex-col items-end gap-3">
        {/* Menu Items (aparecem quando aberto) */}
        <div className={`flex flex-col gap-3 transition-all duration-300 origin-bottom ${isFabOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'}`}>
          
          <div  className="flex items-center gap-3 bg-[#FF5722] text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-100 hover:text-[#FF5722] transition-colors whitespace-nowrap group">
            <span className="text-xs font-bold">Selecione a página:</span>
          </div>
          
          <Link href="/portfolio/projetos/ximango/" className="flex items-center gap-3 bg-white text-gray-900 px-4 py-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors whitespace-nowrap group">
            <span className="text-xs font-bold">Projeto MPE</span>
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
            <span className="text-xs font-bold">Pacotes</span>
            <div className="w-8 h-8 rounded-full bg-[#FF5722] flex items-center justify-center text-white">
              <i className="fas fa-box-open text-sm"></i>
            </div>
          </Link>

        </div>

        {/* Botão Principal */}
        <button 
          onClick={toggleFab}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-2xl text-white transition-all duration-300 hover:scale-110 active:scale-95 ${isFabOpen ? 'bg-red-500 rotate-45' : 'bg-[#FF5722] rotate-0'}`}
          aria-label="Menu de Navegação"
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>


      {/* STICKY FOOTER BUTTON (Mobile Only) */}
      <div className="fixed bottom-0 left-0 w-full bg-[#111111] p-4 border-t border-white/10 z-50 md:hidden">
        <a href="#oferta" className="flex items-center justify-between w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg">
          <span>Começar Agora</span>
          <span className="bg-black/20 px-2 py-1 rounded text-sm">R$ 297</span>
        </a>
      </div>

      {/* FOOTER */}
      <footer className="py-8 text-center text-xs text-gray-600 bg-black pb-24 md:pb-8">
        <p>&copy; 2026 Ximango Treinamentos.</p>
        <p className="mt-2">Todos os direitos reservados. Desenvolvido por <a href="https://levbrands.com.br" target="_blank" className="text-[#00E5FF] hover:underline">LevBrands</a></p>
      </footer>

    </div>
  );
}