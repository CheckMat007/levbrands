'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ChecklistLandingPage() {
  const [isFabOpen, setIsFabOpen] = useState(false);

  const toggleFab = () => setIsFabOpen(!isFabOpen);

  return (
    <div className="bg-[#111111] text-white font-sans antialiased overflow-x-hidden pb-20 selection:bg-[#00E5FF] selection:text-black">
      {/* Mudei a cor de destaque (brand color) de Laranja (#FF5722) para um Azul Ciano (#00E5FF)
         para diferenciar este produto (Checklist) do produto anterior (Curso de Marketing),
         passando uma ideia mais "técnica" e de "organização".
      */}
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        .glow-effect { box-shadow: 0 0 20px rgba(0, 229, 255, 0.3); }
        .gradient-text {
            background: linear-gradient(to right, #00E5FF, #2979FF);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
      `}</style>
      
      {/* Importando FontAwesome */}
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />

      {/* Navbar Simplificada */}
      <nav className="w-full py-4 px-6 bg-[#111111]/95 backdrop-blur fixed top-0 z-40 border-b border-white/10 flex justify-center">
        <div className="flex items-center gap-2">
          <i className="fas fa-clipboard-check text-[#00E5FF] text-xl"></i>
          <span className="font-bold text-lg tracking-tighter">ESTÉTICA AUTOMOTIVA<span className="text-[#00E5FF]">XIMANGO</span></span>
        </div>
      </nav>

      {/* HERO SECTION: Promessa Forte */}
      <header className="pt-24 pb-12 px-6 text-center relative overflow-hidden">
        {/* Background element */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/ximango/checklist.jpg')] bg-cover bg-center opacity-20 z-0"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-[#111111] to-transparent z-10"></div>

        <div className="relative z-20 max-w-md mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-[#00E5FF]/20 text-[#00E5FF] text-xs font-bold uppercase tracking-wider mb-4 border border-[#00E5FF]/30">
            Ferramenta Editável
          </span>
          <h1 className="text-4xl font-black leading-tight mb-4">
            Nunca mais entregue um carro com <span className="text-[#00E5FF]">manchas de cera</span> ou <span className="text-white border-b-4 border-[#00E5FF]">sujeira escondida</span>.
          </h1>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            O Checklist Definitivo para Estéticas Automotivas: padronize seu serviço, elimine o retrabalho e impressione seu cliente na entrega técnica.
          </p>
          
          {/* Video/Image Placeholder */}
          <div className="w-full aspect-video bg-gray-800 rounded-xl border border-white/10 flex items-center justify-center mb-8 relative group cursor-pointer shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition"></div>
            {/* Ícone representando o arquivo/produto */}
            <i className="fas fa-file-pdf text-6xl text-[#00E5FF] z-10 glow-effect"></i>
            <p className="absolute bottom-4 text-sm font-medium text-white/80 z-10">Ver prévia do documento</p>
          </div>

          <a href="#oferta" className="block w-full bg-[#00E5FF] hover:bg-cyan-600 text-black font-bold py-4 rounded-lg text-lg uppercase tracking-wide shadow-lg shadow-cyan-900/50 transition-all transform hover:scale-105 animate-pulse">
            Baixar Meu Checklist Agora
          </a>
          <p className="text-xs text-gray-500 mt-3 flex justify-center items-center gap-1">
            <i className="fas fa-bolt"></i> Download Imediato
          </p>
        </div>
      </header>

      {/* DOR: Identificação */}
      <section className="py-12 px-6 bg-[#1F1F1F] border-y border-white/5">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Você já passou por isso?</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                <i className="fas fa-search-minus text-red-500 text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">O "Esquecimento" Fatal</h3>
                <p className="text-gray-400 text-sm">O cliente chega para buscar o carro e você percebe que esqueceu de passar pretinho em um dos pneus. Que vergonha.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                <i className="fas fa-angry text-red-500 text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Reclamação Pós-Venda</h3>
                <p className="text-gray-400 text-sm">Dois dias depois, o cliente manda foto de uma mancha de polidor na borracha da porta. Você tem que pedir desculpas de novo.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                <i className="fas fa-users-slash text-red-500 text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Funcionário Perdido</h3>
                <p className="text-gray-400 text-sm">Você contrata um ajudante e ele não sabe a ordem das coisas. Você perde mais tempo explicando do que fazendo.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUÇÃO: O Produto */}
      <section className="py-12 px-6 bg-[#111111] relative">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">A Diferença entre o Amador e o Profissional é o <span className="gradient-text">Processo</span>.</h2>
          <p className="text-gray-400 mb-8">
            Pilotos de avião usam checklists. Cirurgiões usam checklists. Por que você confiaria apenas na sua memória? O <strong className="text-white">Checklist Estética Pro</strong> é o seu guia à prova de falhas.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <i className="fas fa-edit text-[#00E5FF] text-3xl mb-2"></i>
              <h3 className="font-bold text-sm">100% Editável</h3>
              <p className="text-xs text-gray-400 mt-1">Arquivo no Canva. Mude cores, coloque sua logo e imprima.</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <i className="fas fa-list-ol text-[#00E5FF] text-3xl mb-2"></i>
              <h3 className="font-bold text-sm">50+ Pontos</h3>
              <p className="text-xs text-gray-400 mt-1">Verificação completa: Interior, Exterior, Motor e Finalização.</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <i className="fas fa-hand-holding-usd text-[#00E5FF] text-3xl mb-2"></i>
              <h3 className="font-bold text-sm">Venda Mais</h3>
              <p className="text-xs text-gray-400 mt-1">Use o checklist de entrada (vistoria) para apontar defeitos e vender serviços extras.</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <i className="fas fa-shield-alt text-[#00E5FF] text-3xl mb-2"></i>
              <h3 className="font-bold text-sm">Segurança</h3>
              <p className="text-xs text-gray-400 mt-1">Registre avarias pré-existentes e evite que o cliente culpe você por riscos antigos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* AUTORIDADE */}
      <section className="py-12 px-6 bg-linear-to-b from-gray-900 to-black text-center">
        <div className="max-w-md mx-auto">
          <div className="w-32 h-32 mx-auto rounded-full border-4 border-[#00E5FF] bg-gray-800 bg-[url('/ximango/perfil.jpg')] bg-cover mb-4"></div>
          <h2 className="text-xl font-bold">Desenvolvido por quem entende</h2>
          <p className="text-[#00E5FF] font-bold text-lg mb-4">Jefferson D'elly</p>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            "Criei esse checklist depois de ter que pagar um para-brisa novo para um cliente porque meu funcionário usou a bucha errada. Esse papel vai salvar seu lucro e sua reputação."
          </p>
        </div>
      </section>

      {/* PROVA SOCIAL */}
      <section className="py-12 px-6 bg-[#1F1F1F]">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Quem usa recomenda</h2>
          
          <div className="space-y-4">
            {/* Depoimento 1 */}
            <div className="bg-[#111111] p-6 rounded-xl border border-white/5 shadow-lg">
              <div className="flex text-[#00E5FF] mb-2">
                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
              </div>
              <p className="text-gray-300 italic mb-4 text-sm">"O cliente fica impressionado quando eu puxo a prancheta com o checklist personalizado na hora de entregar o carro. Passa muito profissionalismo."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                    <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="Aluno" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-sm">Jorge M.</p>
                  <p className="text-xs text-gray-500">Jato & Cera</p>
                </div>
              </div>
            </div>

            {/* Depoimento 2 */}
            <div className="bg-[#111111] p-6 rounded-xl border border-white/5 shadow-lg">
              <div className="flex text-[#00E5FF] mb-2">
                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
              </div>
              <p className="text-gray-300 italic mb-4 text-sm">"Eu vivia esquecendo de aspirar o porta-malas. Com o checklist colado na parede, nunca mais aconteceu. Vale cada centavo."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                    <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Aluna" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-sm">Patrícia K.</p>
                  <p className="text-xs text-gray-500">Detailing Studio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTEÚDO / O QUE ESTÁ INCLUSO */}
      <section className="py-12 px-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">O que você recebe?</h2>
          
          <div className="space-y-3">
            <details className="group bg-white/5 rounded-lg open:bg-white/10 transition-all border border-white/10" open>
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4">
                <span className="flex items-center gap-3">
                  <i className="fas fa-clipboard-list text-[#00E5FF]"></i> Checklist de Vistoria (Entrada)
                </span>
                <span className="transition group-open:rotate-180">
                  <i className="fas fa-chevron-down text-xs"></i>
                </span>
              </summary>
              <div className="text-gray-400 mt-0 px-4 pb-4 text-sm">
                Desenho esquemático do carro para marcar riscos e amassados prévios. Proteja-se de clientes mal-intencionados.
              </div>
            </details>

            <details className="group bg-white/5 rounded-lg open:bg-white/10 transition-all border border-white/10">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4">
                <span className="flex items-center gap-3">
                  <i className="fas fa-check-double text-[#00E5FF]"></i> Checklist de Controle de Qualidade (Saída)
                </span>
                <span className="transition group-open:rotate-180">
                  <i className="fas fa-chevron-down text-xs"></i>
                </span>
              </summary>
              <div className="text-gray-400 mt-0 px-4 pb-4 text-sm">
                Lista passo-a-passo para conferir antes de chamar o cliente: vidros, cantos de porta, pretinho, cheirinho, etc.
              </div>
            </details>

            <details className="group bg-white/5 rounded-lg open:bg-white/10 transition-all border border-white/10">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4">
                <span className="flex items-center gap-3">
                  <i className="fas fa-file-invoice text-[#00E5FF]"></i> Ordem de Serviço Padrão
                </span>
                <span className="transition group-open:rotate-180">
                  <i className="fas fa-chevron-down text-xs"></i>
                </span>
              </summary>
              <div className="text-gray-400 mt-0 px-4 pb-4 text-sm">
                Modelo profissional para registrar dados do cliente, serviços contratados, valores e data de entrega.
              </div>
            </details>

            <details className="group bg-white/5 rounded-lg open:bg-white/10 transition-all border border-white/10">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4">
                <span className="flex items-center gap-3">
                  <i className="fas fa-video text-[#00E5FF]"></i> Aula: Como Editar no Canva
                </span>
                <span className="transition group-open:rotate-180">
                  <i className="fas fa-chevron-down text-xs"></i>
                </span>
              </summary>
              <div className="text-gray-400 mt-0 px-4 pb-4 text-sm">
                Tutorial rápido ensinando como colocar sua logo, mudar as cores e imprimir em alta qualidade.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* BÔNUS */}
      <section className="py-10 px-6 bg-[#00E5FF]/10 border-y border-[#00E5FF]/20">
        <div className="max-w-md mx-auto">
          <h3 className="text-center font-bold text-[#00E5FF] mb-6 text-xl">🎁 Bônus de Lançamento</h3>
          
          <div className="flex items-center gap-4 mb-4">
            <i className="fas fa-tags text-3xl text-white"></i>
            <div>
              <h4 className="font-bold text-white">Tag de Retrovisor Personalizável</h4>
              <p className="text-xs text-gray-400">Modelo para imprimir e colocar no espelho do carro (aquele agradecimento que o cliente ama).</p>
            </div>
          </div>
        </div>
      </section>

      {/* OFERTA (Preço + CTA) */}
      <section id="oferta" className="py-16 px-6 bg-[#111111] text-center">
        <div className="max-w-md mx-auto border border-[#00E5FF] rounded-2xl p-6 relative bg-linear-to-br from-gray-900 to-black shadow-2xl shadow-cyan-900/20">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#00E5FF] text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Preço Promocional
          </div>

          <p className="text-gray-500 line-through text-sm mt-4">De R$ 97,00</p>
          <h2 className="text-5xl font-black text-white my-2 tracking-tighter">R$ 19<span className="text-lg font-normal text-gray-400">,90</span></h2>
          <p className="text-gray-400 text-sm mb-6">Pagamento único</p>

          <a href="#" className="block w-full bg-[#00E5FF] hover:bg-cyan-600 text-black font-bold py-4 rounded-lg text-lg uppercase tracking-wide transition-all shadow-lg animate-bounce mb-4">
            COMPRAR AGORA
          </a>
          
          <div className="flex justify-center items-center gap-2 text-xs text-gray-400">
            <i className="fas fa-check-circle text-green-500"></i> Acesso Vitalício
            <i className="fas fa-check-circle text-green-500"></i> Arquivo Editável
          </div>
        </div>
      </section>

      {/* GARANTIA */}
      <section className="py-12 px-6 text-center bg-white/5">
        <div className="max-w-md mx-auto">
          <i className="fas fa-shield-alt text-5xl text-gray-300 mb-4"></i>
          <h3 className="font-bold text-xl text-white mb-2">Garantia Incondicional</h3>
          <p className="text-gray-400 text-sm">
            Se você não gostar do layout ou achar difícil de editar, devolvo seus R$ 19,90 na hora. Sem letras miúdas.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-6 mb-20">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-6 text-center">Perguntas Frequentes</h2>
          <div className="space-y-4">
            <div className="border-b border-white/10 pb-4">
              <h4 className="font-bold text-sm text-white mb-1">Preciso ter o Canva Pro?</h4>
              <p className="text-xs text-gray-400">Não! Todos os modelos funcionam perfeitamente na versão gratuita do Canva.</p>
            </div>
            <div className="border-b border-white/10 pb-4">
              <h4 className="font-bold text-sm text-white mb-1">Como recebo o arquivo?</h4>
              <p className="text-xs text-gray-400">Você receberá um e-mail com um link. Ao clicar, o modelo já abre dentro do seu Canva pronto para editar.</p>
            </div>
            <div className="border-b border-white/10 pb-4">
              <h4 className="font-bold text-sm text-white mb-1">Posso imprimir em casa?</h4>
              <p className="text-xs text-gray-400">Sim, o formato é A4 padrão, perfeito para impressoras comuns ou gráficas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
        BOTÃO FLUTUANTE DE NAVEGAÇÃO (FAB) 
        ========================================
      */}
      <div className="fixed bottom-24 md:bottom-10 right-6 z-60 flex flex-col items-end gap-3">
        {/* Menu Items */}
        <div className={`flex flex-col gap-3 transition-all duration-300 origin-bottom ${isFabOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'}`}>
          <div  className="flex items-center gap-3 bg-[#FF5722] text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-100 hover:text-[#FF5722] transition-colors whitespace-nowrap group">
            <span className="text-xs font-bold">Selecione a página:</span>
          </div>
          <Link href="/portfolio/projetos/ximango" className="flex items-center gap-3 bg-white text-gray-900 px-4 py-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors whitespace-nowrap group">
            <span className="text-xs font-bold">MPE</span>
            <div className="w-8 h-8 rounded-full bg-[#00E5FF] flex items-center justify-center text-black">
              <i className="fas fa-laptop-code text-sm"></i>
            </div>
          </Link>

          <Link href="/portfolio/projetos/ximango/site-publico" className="flex items-center gap-3 bg-white text-gray-900 px-4 py-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors whitespace-nowrap group">
            <span className="text-xs font-bold">Site Público</span>
            <div className="w-8 h-8 rounded-full bg-[#00E5FF] flex items-center justify-center text-black">
              <i className="fas fa-globe text-sm"></i>
            </div>
          </Link>

          <Link href="/portfolio/projetos/ximango/checklist" className="flex items-center gap-3 bg-white text-gray-900 px-4 py-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors whitespace-nowrap group">
            <span className="text-xs font-bold">checklist</span>
            <div className="w-8 h-8 rounded-full bg-[#00E5FF] flex items-center justify-center text-black">
              <i className="fas fa-box-open text-sm"></i>
            </div>
          </Link>

        </div>

        {/* Botão Principal */}
        <button 
          onClick={toggleFab}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-2xl text-black transition-all duration-300 hover:scale-110 active:scale-95 ${isFabOpen ? 'bg-red-500 text-white rotate-45' : 'bg-[#00E5FF] rotate-0'}`}
          aria-label="Menu de Navegação"
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>

      {/* STICKY FOOTER BUTTON (Mobile Only) */}
      <div className="fixed bottom-0 left-0 w-full bg-[#111111] p-4 border-t border-white/10 z-50 md:hidden">
        <a href="#oferta" className="flex items-center justify-between w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg">
          <span>Baixar Agora</span>
          <span className="bg-black/20 px-2 py-1 rounded text-sm">R$ 19,90</span>
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