export interface NicheConfig {
  title: string;
  subtitle: string;
  theme: {
    primary: string;
    background: string;
    text: string;
    headerBg?: string;
    cardBg?: string;
  };
  services: Array<{
    title: string;
    price: string;
    description: string;
    icon: string;
  }>;
  botSlug?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
}

export const niches: Record<string, NicheConfig> = {
  barbearia: {
    title: "Viking Cuts",
    subtitle: "O Corte que Impõe Respeito.",
    theme: {
      primary: "amber-500",
      background: "zinc-950",
      text: "zinc-100",
      headerBg: "zinc-950",
      cardBg: "zinc-900",
    },
    services: [
      {
        title: "Corte Cabelo",
        price: "R$ 45",
        description: "Corte moderno e preciso, feito por profissionais especializados.",
        icon: "scissors",
      },
      {
        title: "Barba Terapia",
        price: "R$ 35",
        description: "Tratamento completo para sua barba com produtos premium.",
        icon: "sparkles",
      },
      {
        title: "Combo Viking",
        price: "R$ 65",
        description: "Corte + Barba + Tratamento completo. O pacote completo para o guerreiro moderno.",
        icon: "zap",
      },
    ],
    botSlug: "lead-generation-qkbkr20",
    whatsappNumber: "5511999999999",
    whatsappMessage: "Olá! Gostaria de agendar um horário.",
  },
  psicologo: {
    title: "Conexão Humana",
    subtitle: "Cuidar da sua mente é cuidar da sua vida.",
    theme: {
      primary: "teal-500",
      background: "slate-50",
      text: "slate-900",
      headerBg: "white",
      cardBg: "white",
    },
    services: [
      {
        title: "Consulta Individual",
        price: "R$ 150",
        description: "Atendimento personalizado focado no seu bem-estar emocional.",
        icon: "heart",
      },
      {
        title: "Terapia de Casal",
        price: "R$ 200",
        description: "Reconstrua a conexão e fortaleça seu relacionamento.",
        icon: "users",
      },
      {
        title: "Acompanhamento Mensal",
        price: "R$ 500",
        description: "Pacote com 4 sessões mensais com desconto especial.",
        icon: "calendar",
      },
    ],
    botSlug: "lead-generation-qkbkr20",
    whatsappNumber: "5511999999999",
    whatsappMessage: "Olá! Gostaria de agendar uma consulta.",
  },
  advogado: {
    title: "Silva & Associados",
    subtitle: "Justiça com excelência e transparência.",
    theme: {
      primary: "blue-700",
      background: "gray-50",
      text: "gray-900",
      headerBg: "white",
      cardBg: "white",
    },
    services: [
      {
        title: "Consultoria Jurídica",
        price: "R$ 300",
        description: "Análise completa do seu caso com orientação estratégica.",
        icon: "scale",
      },
      {
        title: "Elaboração de Contratos",
        price: "R$ 500",
        description: "Documentos jurídicos personalizados e seguros.",
        icon: "file-text",
      },
      {
        title: "Representação Legal",
        price: "Sob Consulta",
        description: "Defesa completa em processos e audiências.",
        icon: "briefcase",
      },
    ],
    botSlug: "lead-generation-qkbkr20",
    whatsappNumber: "5511999999999",
    whatsappMessage: "Olá! Preciso de orientação jurídica.",
  },
};

export function getNiche(slug: string): NicheConfig | null {
  return niches[slug] || null;
}

export function getAllNiches(): Array<{ slug: string; config: NicheConfig }> {
  return Object.entries(niches).map(([slug, config]) => ({ slug, config }));
}

