'use client';

import React, { useEffect } from 'react';
import mermaid from 'mermaid';

export default function ProjetoWebEscoteiro() {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis',
      },
    });
    // Força a renderização após a montagem do componente
    mermaid.contentLoaded();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800 p-4 md:p-6">
      
      {/* Estilos globais injetados para o scrollbar */}
      <style dangerouslySetInnerHTML={{
        __html: `
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #f1f1f1; 
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb {
            background: #cbd5e1; 
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8; 
          }
        `
      }} />

      <div className="max-w-7xl mx-auto">
        
        {/* Cabeçalho Principal */}
        <header className="mb-6 md:mb-8 text-center bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            ⚜️ Projeto Grupo Escoteiro Amizade
          </h1>
          <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto">
            Apresentação estrutural, dividida em <strong>Arquitetura de Navegação</strong> (Front-end) e <strong>Especificação de Módulos</strong> (Back-end/Sistema).
          </p>
        </header>

        {/* SEÇÃO 1: ORGANOGRAMA DO SITE */}
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2 md:gap-3">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-xs md:text-sm">Parte 1</span> 
          Mapa de Navegação (Organograma)
        </h2>
        
        {/* Container do Diagrama 1 */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 md:p-8 overflow-x-auto w-full mb-8 md:mb-12">
          <div className="mermaid flex justify-center min-w-200 lg:min-w-full">
            {`graph LR
              %% Estilos dos Nós
              classDef root fill:#166534,stroke:#14532d,stroke-width:3px,color:#fff,font-weight:bold,border-radius:8px
              classDef public fill:#2563eb,stroke:#1e40af,stroke-width:2px,color:#fff,font-weight:bold,border-radius:8px
              classDef internal fill:#dc2626,stroke:#991b1b,stroke-width:2px,color:#fff,font-weight:bold,border-radius:8px
              classDef node fill:#f8fafc,stroke:#cbd5e1,stroke-width:2px,color:#334155,border-radius:6px
              classDef leaf fill:#ffffff,stroke:#e2e8f0,stroke-width:1px,color:#475569,border-radius:4px
              classDef highlight fill:#fef3c7,stroke:#f59e0b,stroke-width:1px,color:#92400e,border-radius:4px

              %% Estrutura Principal
              Site["🏕️ Plataforma Web<br/>Grupo Escoteiro"]:::root

              Portal["🌐 Portal Público<br/>(Acesso Aberto)"]:::public
              Sistema["🔒 Sistema Interno<br/>(Acesso Autenticado)"]:::internal

              Site --> Portal
              Site --> Sistema

              %% -------------------
              %% PORTAL PÚBLICO
              %% -------------------
              Portal --> P_Home["🏠 Home<br/><small>Destaques, CTA, Resumo</small>"]:::node
              Portal --> P_Inst["📖 Institucional<br/><small>História, Missão, Diretoria</small>"]:::node
              Portal --> P_Tropas["⚜️ As Tropas (Ramos)"]:::node
              Portal --> P_Transp["📊 Portal da Transparência"]:::node
              Portal --> P_Blog["📰 Blog / Notícias<br/><small>Artigos e Coberturas</small>"]:::node
              Portal --> P_Cont["📞 Contato<br/><small>Formulário, Local e Redes</small>"]:::node
              Portal --> P_Login["🔑 Login<br/><small>Acesso à Área de Membros</small>"]:::highlight

              %% Sub-nós de Tropas
              P_Tropas --> T_Lob["🐺 Ramo Lobinho (7-11 anos)"]:::leaf
              P_Tropas --> T_Esc["🧭 Ramo Escoteiro (11-14 anos)"]:::leaf
              P_Tropas --> T_Sen["🧗 Ramo Sênior (15-17 anos)"]:::leaf
              P_Tropas --> T_Pio["🔥 Ramo Pioneiro (18-21 anos)"]:::leaf

              %% Sub-nós de Transparência
              P_Transp --> TR_Est["Estatutos e Regimentos"]:::leaf
              P_Transp --> TR_Ata["Atas de Reuniões"]:::leaf
              P_Transp --> TR_Bal["Balanços Financeiros"]:::leaf

              %% -------------------
              %% SISTEMA INTERNO
              %% -------------------
              Sistema --> S_Dir["👔 Visão da Diretoria<br/>(Admin)"]:::node
              Sistema --> S_Chef["🧣 Visão da Chefia<br/>(Gestores de Tropa)"]:::node
              Sistema --> S_Memb["🎒 Visão do Membro<br/>(Jovens e Responsáveis)"]:::node

              %% Sub-nós da Diretoria
              S_Dir --> D1["📈 Dashboard Geral<br/><small>Métricas, Inadimplência</small>"]:::leaf
              S_Dir --> D2["👥 Gestão de Usuários<br/><small>Permissões e Cadastros</small>"]:::leaf
              S_Dir --> D3["💰 Módulo Financeiro<br/><small>Mensalidades, Recibos</small>"]:::leaf
              S_Dir --> D4["⛺ Módulo de Patrimônio<br/><small>Almoxarifado Geral</small>"]:::leaf
              S_Dir --> D5["📁 Módulo Transparência<br/><small>Upload de Documentos</small>"]:::leaf
              S_Dir --> D6["📅 Calendário Global<br/><small>Disparo de Avisos</small>"]:::leaf

              %% Sub-nós da Chefia
              S_Chef --> C1["📊 Dashboard da Tropa"]:::leaf
              S_Chef --> C2["📝 CMS da Tropa<br/><small>Edição da página pública</small>"]:::leaf
              S_Chef --> C3["📅 Calendário Específico"]:::leaf
              S_Chef --> C4["⭐ Gestão de Progressão<br/><small>Especialidades e Distintivos</small>"]:::highlight
              S_Chef --> C5["📢 Avisos da Tropa"]:::leaf

              %% Sub-nós dos Membros
              S_Memb --> M1["📌 Mural de Avisos<br/><small>Tropa e Diretoria</small>"]:::leaf
              S_Memb --> M2["✅ Calendário<br/><small>Confirmar Presença</small>"]:::leaf
              S_Memb --> M3["⚕️ Meu Perfil / Ficha<br/><small>Saúde, Alergias, Restrições</small>"]:::highlight
              S_Memb --> M4["🏅 Minha Progressão<br/><small>Distintivos Conquistados</small>"]:::highlight
              S_Memb --> M5["💲 Situação Financeira<br/><small>Mensalidades e Status</small>"]:::leaf
            `}
          </div>
          
          {/* Legenda Parte 1 */}
          <div className="mt-6 flex flex-wrap justify-center gap-3 md:gap-4 text-xs md:text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-800 border-2 border-green-900"></div> Raiz
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-600 border-2 border-blue-800"></div> Portal Público
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-600 border-2 border-red-800"></div> Sistema Interno
            </div>
          </div>
        </div>

        {/* SEÇÃO 2: MÓDULOS DE FUNCIONALIDADES */}
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2 md:gap-3">
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-lg text-xs md:text-sm">Parte 2</span> 
          Especificação Técnica de Módulos (Recursos do Sistema)
        </h2>

        {/* Container do Diagrama 2 */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 md:p-8 overflow-x-auto w-full mb-8">
          <div className="mermaid flex justify-center min-w-200 lg:min-w-full">
            {`graph LR
              %% Estilos dos Nós - Tema Escuro/Roxo para contrastar
              classDef root2 fill:#0f172a,stroke:#020617,stroke-width:3px,color:#fff,font-weight:bold,border-radius:8px
              classDef modAuth fill:#4f46e5,stroke:#3730a3,stroke-width:2px,color:#fff,font-weight:bold,border-radius:6px
              classDef modCMS fill:#0ea5e9,stroke:#0369a1,stroke-width:2px,color:#fff,font-weight:bold,border-radius:6px
              classDef modOp fill:#10b981,stroke:#047857,stroke-width:2px,color:#fff,font-weight:bold,border-radius:6px
              classDef modFin fill:#eab308,stroke:#a16207,stroke-width:2px,color:#fff,font-weight:bold,border-radius:6px
              classDef modCom fill:#ec4899,stroke:#be185d,stroke-width:2px,color:#fff,font-weight:bold,border-radius:6px
              
              classDef feat fill:#f8fafc,stroke:#cbd5e1,stroke-width:1px,color:#334155,border-radius:4px
              classDef highlightFeat fill:#fef3c7,stroke:#f59e0b,stroke-width:1px,color:#92400e,border-radius:4px

              %% Motor Principal
              Sys["⚙️ Core do Sistema<br/>Gestão Integrada Escoteira"]:::root2

              %% Módulos Principais
              M_Auth["🔐 Módulo de Autenticação<br/>e Segurança"]:::modAuth
              M_CMS["📝 Módulo de Gestão<br/>de Conteúdo (CMS)"]:::modCMS
              M_Op["🏕️ Módulo Operacional<br/>Escoteiro"]:::modOp
              M_Fin["💰 Módulo Financeiro<br/>e Administrativo"]:::modFin
              M_Com["📢 Módulo de<br/>Comunicação"]:::modCom

              Sys --> M_Auth
              Sys --> M_CMS
              Sys --> M_Op
              Sys --> M_Fin
              Sys --> M_Com

              %% Features: Autenticação
              M_Auth --> A1["Controle de Acesso (RBAC)<br/><small>Isolamento rígido entre Chefia, Tesouraria e Admin</small>"]:::feat
              M_Auth --> A2["Perfis Vinculados<br/><small>Pais/Responsáveis monitoram o perfil do Jovem</small>"]:::feat

              %% Features: CMS
              M_CMS --> C1["Construtor da Transparência<br/><small>Criação de diretórios e upload simplificado de PDFs/Atas</small>"]:::feat
              M_CMS --> C2["CMS Dinâmico das Tropas<br/><small>Editor Rich Text para Chefes publicarem na página pública</small>"]:::feat
              M_CMS --> C3["SEO Automatizado<br/><small>Meta-tags e sitemaps para rankeamento no Google</small>"]:::feat

              %% Features: Operacional
              M_Op --> O1["Ficha Médica Digital<br/><small>Dados de saúde e contatos. Exportação em PDF para campo</small>"]:::highlightFeat
              M_Op --> O2["Gestão de Progressão<br/><small>Acompanhamento visual de Especialidades e Cordões</small>"]:::highlightFeat
              M_Op --> O3["Inscrições e Eventos<br/><small>Botão 'Confirmar Presença' com geração de lista de chamada</small>"]:::feat

              %% Features: Financeiro
              M_Fin --> F1["Controle de Mensalidades<br/><small>Registro de pagamentos, baixas manuais e status de inadimplência</small>"]:::feat
              M_Fin --> F2["Gestão de Almoxarifado<br/><small>Inventário de barracas, controle de retiradas e devoluções</small>"]:::feat

              %% Features: Comunicação
              M_Com --> D1["Notificações Integradas<br/><small>Sistema de alertas ('Sininho') direto no Dashboard</small>"]:::feat
              M_Com --> D2["Disparo de E-mails<br/><small>Automação ao criar eventos, publicar arquivos ou gerar cobranças</small>"]:::feat
            `}
          </div>
          
          {/* Legenda Parte 2 */}
          <div className="mt-6 flex flex-wrap justify-center gap-3 md:gap-4 text-xs md:text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-amber-100 border border-amber-500"></div> Recursos Adicionais/Especiais
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}