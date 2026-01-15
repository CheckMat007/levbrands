"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Menu, X, MessageCircle, Scissors, Sparkles, Zap, Heart, Users, Calendar, Scale, FileText, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { getNiche, type NicheConfig } from "@/app//portfolio/projetos/landingpage-demo/_lib/niches";
import NicheSwitcher from "@/app//portfolio/projetos/landingpage-demo/_components/NicheSwitcher"

const iconMap: Record<string, any> = {
  scissors: Scissors,
  sparkles: Sparkles,
  zap: Zap,
  heart: Heart,
  users: Users,
  calendar: Calendar,
  scale: Scale,
  "file-text": FileText,
  briefcase: Briefcase,
};

function getThemeClasses(nicheSlug: string) {
  switch (nicheSlug) {
    case "barbearia":
      return {
        bg: "bg-zinc-950",
        text: "text-zinc-100",
        textMuted: "text-zinc-400",
        textLight: "text-zinc-600",
        primary: "text-amber-500",
        primaryBg: "bg-amber-500",
        primaryHover: "hover:bg-amber-600",
        primaryLight: "bg-amber-500/10",
        primaryText: "text-amber-500",
        primaryBorder: "border-amber-500/50",
        primaryShadow: "shadow-amber-500/20",
        headerBg: "bg-zinc-950",
        cardBg: "bg-zinc-900",
        border: "border-zinc-800",
        borderLight: "border-zinc-800",
      };
    case "psicologo":
      return {
        bg: "bg-slate-50",
        text: "text-slate-900",
        textMuted: "text-slate-600",
        textLight: "text-slate-400",
        primary: "text-teal-500",
        primaryBg: "bg-teal-500",
        primaryHover: "hover:bg-teal-600",
        primaryLight: "bg-teal-500/10",
        primaryText: "text-teal-500",
        primaryBorder: "border-teal-500/50",
        primaryShadow: "shadow-teal-500/20",
        headerBg: "bg-white",
        cardBg: "bg-white",
        border: "border-slate-200",
        borderLight: "border-slate-200",
      };
    case "advogado":
      return {
        bg: "bg-gray-50",
        text: "text-gray-900",
        textMuted: "text-gray-600",
        textLight: "text-gray-400",
        primary: "text-blue-700",
        primaryBg: "bg-blue-700",
        primaryHover: "hover:bg-blue-800",
        primaryLight: "bg-blue-700/10",
        primaryText: "text-blue-700",
        primaryBorder: "border-blue-700/50",
        primaryShadow: "shadow-blue-700/20",
        headerBg: "bg-white",
        cardBg: "bg-white",
        border: "border-gray-200",
        borderLight: "border-gray-200",
      };
    default:
      return {
        bg: "bg-zinc-950",
        text: "text-zinc-100",
        textMuted: "text-zinc-400",
        textLight: "text-zinc-600",
        primary: "text-amber-500",
        primaryBg: "bg-amber-500",
        primaryHover: "hover:bg-amber-600",
        primaryLight: "bg-amber-500/10",
        primaryText: "text-amber-500",
        primaryBorder: "border-amber-500/50",
        primaryShadow: "shadow-amber-500/20",
        headerBg: "bg-zinc-950",
        cardBg: "bg-zinc-900",
        border: "border-zinc-800",
        borderLight: "border-zinc-800",
      };
  }
}

export default function NichePage() {
  const params = useParams();
  const router = useRouter();
  const nicheSlug = params.niche as string;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [config, setConfig] = useState<NicheConfig | null>(null);

  useEffect(() => {
    const nicheConfig = getNiche(nicheSlug);
    if (!nicheConfig) {
      router.push("/demo/barbearia");
      return;
    }
    setConfig(nicheConfig);
  }, [nicheSlug, router]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!config) {
    return null;
  }

  const classes = getThemeClasses(nicheSlug);
  const HeroIcon = config.services[0]?.icon ? (iconMap[config.services[0].icon] || Scissors) : Scissors;
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(config.whatsappMessage || "Olá!");
    const number = config.whatsappNumber || "5511999999999";
    window.open(`https://wa.me/${number}?text=${message}`, "_blank");
  };

  return (
    <main className={`min-h-screen ${classes.bg} ${classes.text}`}>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? `${classes.headerBg}/95 backdrop-blur-sm shadow-lg`
            : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl font-bold tracking-wider"
            >
              <span className={classes.primaryText}>{config.title.split(" ")[0]}</span>
              <span className={classes.text}> {config.title.split(" ").slice(1).join(" ")}</span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("home")}
                className={`${classes.textMuted} ${classes.primaryText.replace("text-", "hover:text-")} transition-colors`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("servicos")}
                className={`${classes.textMuted} ${classes.primaryText.replace("text-", "hover:text-")} transition-colors`}
              >
                Serviços
              </button>
              <button
                onClick={() => scrollToSection("contato")}
                className={`${classes.textMuted} ${classes.primaryText.replace("text-", "hover:text-")} transition-colors`}
              >
                Contato
              </button>
              <button
                onClick={handleWhatsApp}
                className={`${classes.primaryBg} ${classes.primaryHover} text-white px-6 py-2.5 rounded-lg font-semibold transition-all transform hover:scale-105`}
              >
                Agendar Agora
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden ${classes.text} p-2`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4 space-y-3"
            >
              <button
                onClick={() => scrollToSection("home")}
                className={`block w-full text-left ${classes.textMuted} ${classes.primaryText.replace("text-", "hover:text-")} transition-colors py-2`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("servicos")}
                className={`block w-full text-left ${classes.textMuted} ${classes.primaryText.replace("text-", "hover:text-")} transition-colors py-2`}
              >
                Serviços
              </button>
              <button
                onClick={() => scrollToSection("contato")}
                className={`block w-full text-left ${classes.textMuted} ${classes.primaryText.replace("text-", "hover:text-")} transition-colors py-2`}
              >
                Contato
              </button>
              <button
                onClick={handleWhatsApp}
                className={`w-full ${classes.primaryBg} ${classes.primaryHover} text-white px-6 py-2.5 rounded-lg font-semibold transition-all`}
              >
                Agendar Agora
              </button>
            </motion.div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-6"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                {config.subtitle.split(" ").slice(0, -2).join(" ")}{" "}
                <span className={classes.primaryText}>
                  {config.subtitle.split(" ").slice(-2).join(" ")}
                </span>
              </h1>
              <p className={`text-lg sm:text-xl ${classes.textMuted} leading-relaxed`}>
                Agende seu horário em 30 segundos pelo nosso sistema automático.
                <br className="hidden sm:block" /> Sem espera.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsApp}
                className={`${classes.primaryBg} ${classes.primaryHover} text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center gap-3 transition-all shadow-lg ${classes.primaryShadow}`}
              >
                <MessageCircle size={24} />
                Agendar via WhatsApp
              </motion.button>
            </motion.div>

            {/* Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className={`relative h-80 sm:h-96 lg:h-125 rounded-2xl overflow-hidden bg-linear-to-br from-${classes.cardBg.replace("bg-", "")} to-${classes.bg.replace("bg-", "")} border ${classes.borderLight}`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className={`mx-auto ${classes.primaryText}/20`}>
                    <HeroIcon size={120} />
                  </div>
                  <p className={`${classes.textLight} text-sm`}>Imagem do Negócio</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className={`absolute top-0 right-0 w-96 h-96 ${classes.primaryBg.replace("bg-", "bg-")}/5 rounded-full blur-3xl -z-10`} />
        <div className={`absolute bottom-0 left-0 w-96 h-96 ${classes.primaryBg.replace("bg-", "bg-")}/5 rounded-full blur-3xl -z-10`} />
      </section>

      {/* Serviços Section */}
      <section id="servicos" className={`py-20 px-4 sm:px-6 lg:px-8 ${classes.cardBg}/50`}>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Nossos <span className={classes.primaryText}>Serviços</span>
            </h2>
            <p className={`${classes.textMuted} text-lg`}>Escolha o serviço perfeito para você</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {config.services.map((service, index) => {
              const Icon = iconMap[service.icon] || Scissors;
              const isPopular = index === 2;

              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`${classes.cardBg} border ${classes.borderLight} rounded-xl p-6 sm:p-8 ${classes.primaryBorder.replace("border-", "hover:border-")} transition-all hover:shadow-lg ${classes.primaryShadow.replace("shadow-", "hover:shadow-")} relative ${isPopular ? "sm:col-span-2 lg:col-span-1" : ""}`}
                >
                  {isPopular && (
                    <div className={`absolute top-4 right-4 ${classes.primaryBg} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                      POPULAR
                    </div>
                  )}
                  <div className="mb-6">
                    <div className={`w-16 h-16 ${classes.primaryLight} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className={classes.primaryText} size={32} />
                    </div>
                    <h3 className={`text-2xl font-bold mb-2 ${classes.text}`}>{service.title}</h3>
                    <p className={`${classes.textMuted} mb-4`}>{service.description}</p>
                  </div>
                  <div className="flex items-baseline justify-between mb-6">
                    <span className={`text-3xl font-bold ${classes.primaryText}`}>{service.price}</span>
                  </div>
                  <button
                    onClick={handleWhatsApp}
                    className={`w-full ${classes.primaryBg} ${classes.primaryHover} text-white py-3 rounded-lg font-semibold transition-all`}
                  >
                    Agendar
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Automação Section */}
      <section id="contato" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              A Mágica da <span className={classes.primaryText}>Automação</span>
            </h2>
            <p className={`${classes.textMuted} text-lg`}>
              Teste nosso Agendamento Inteligente
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`${classes.cardBg} border-2 ${classes.primaryBorder} rounded-2xl p-6 sm:p-8 lg:p-12 shadow-xl ${classes.primaryShadow}`}
          >
            <div className={`${classes.bg} rounded-xl border ${classes.borderLight} overflow-hidden`}>
              {config.botSlug ? (
                <div className="w-full h-150 rounded-xl overflow-hidden">
                  <iframe
                    src={`https://typebot.co/${config.botSlug}`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    className="rounded-xl"
                    title="Typebot Chatbot"
                  />
                </div>
              ) : (
                <div className="min-h-125 flex items-center justify-center p-8">
                  <div className="text-center space-y-4">
                    <div className={`w-20 h-20 ${classes.primaryLight} rounded-full flex items-center justify-center mx-auto`}>
                      <MessageCircle className={classes.primaryText} size={40} />
                    </div>
                    <p className={`${classes.textMuted} text-lg`}>
                      O Chatbot carregará aqui...
                    </p>
                    <p className={`${classes.textLight} text-sm`}>
                      (Configure o botSlug no arquivo de configuração)
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-4 sm:px-6 lg:px-8 ${classes.cardBg}/50 border-t ${classes.borderLight}`}>
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-6">
            <h3 className={`text-2xl font-bold mb-2 ${classes.text}`}>
              <span className={classes.primaryText}>{config.title.split(" ")[0]}</span>{" "}
              {config.title.split(" ").slice(1).join(" ")}
            </h3>
            <p className={classes.textMuted}>{config.subtitle}</p>
          </div>
          <p className={`${classes.textLight} text-sm`}>
            © 2024 {config.title}. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* Floating Action Button (FAB) */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleWhatsApp}
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl flex items-center gap-3 group"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-green-500 rounded-full opacity-30"
        />
        <MessageCircle size={24} className="relative z-10" />
        <span className="hidden sm:block font-semibold relative z-10 pr-2">
          Agendar
        </span>
      </motion.button>

      {/* Niche Switcher */}
      <NicheSwitcher />
    </main>
  );
}
