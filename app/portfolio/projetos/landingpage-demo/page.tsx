"use client";

import { useRouter } from "next/navigation";
import { Scissors, Heart, Scale } from "lucide-react";
import { motion } from "framer-motion";
import { getAllNiches } from "./_lib/niches";

const nicheIcons: Record<string, any> = {
  barbearia: Scissors,
  psicologo: Heart,
  advogado: Scale,
};

function getNicheCardClasses(slug: string) {
  switch (slug) {
    case "barbearia":
      return {
        bg: "bg-zinc-900",
        text: "text-zinc-100",
        textMuted: "text-zinc-100/70",
        textLight: "text-zinc-100/60",
        primary: "text-amber-500",
        primaryBg: "bg-amber-500",
        primaryHover: "hover:bg-amber-500/90",
        primaryLight: "bg-amber-500/10",
        primaryLightHover: "group-hover:bg-amber-500/20",
        border: "border-amber-500/20",
        borderHover: "hover:border-amber-500/50",
        shadow: "hover:shadow-amber-500/20",
      };
    case "psicologo":
      return {
        bg: "bg-white",
        text: "text-slate-900",
        textMuted: "text-slate-900/70",
        textLight: "text-slate-900/60",
        primary: "text-teal-500",
        primaryBg: "bg-teal-500",
        primaryHover: "hover:bg-teal-500/90",
        primaryLight: "bg-teal-500/10",
        primaryLightHover: "group-hover:bg-teal-500/20",
        border: "border-teal-500/20",
        borderHover: "hover:border-teal-500/50",
        shadow: "hover:shadow-teal-500/20",
      };
    case "advogado":
      return {
        bg: "bg-white",
        text: "text-gray-900",
        textMuted: "text-gray-900/70",
        textLight: "text-gray-900/60",
        primary: "text-blue-700",
        primaryBg: "bg-blue-700",
        primaryHover: "hover:bg-blue-700/90",
        primaryLight: "bg-blue-700/10",
        primaryLightHover: "group-hover:bg-blue-700/20",
        border: "border-blue-700/20",
        borderHover: "hover:border-blue-700/50",
        shadow: "hover:shadow-blue-700/20",
      };
    default:
      return {
        bg: "bg-zinc-900",
        text: "text-zinc-100",
        textMuted: "text-zinc-100/70",
        textLight: "text-zinc-100/60",
        primary: "text-amber-500",
        primaryBg: "bg-amber-500",
        primaryHover: "hover:bg-amber-500/90",
        primaryLight: "bg-amber-500/10",
        primaryLightHover: "group-hover:bg-amber-500/20",
        border: "border-amber-500/20",
        borderHover: "hover:border-amber-500/50",
        shadow: "hover:shadow-amber-500/20",
      };
  }
}

export default function Home() {
  const router = useRouter();
  const niches = getAllNiches();

  const handleNicheSelect = (slug: string) => {
    router.push(`/portfolio/projetos/landingpage-demo/demo/${slug}`);
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            Escolha seu <span className="text-amber-500">Modelo</span>
          </h1>
          <p className="text-xl sm:text-2xl text-zinc-400 max-w-2xl mx-auto">
            Selecione um template e veja como sua landing page pode ser transformada
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {niches.map(({ slug, config }, index) => {
            const Icon = nicheIcons[slug] || Scissors;
            const classes = getNicheCardClasses(slug);
            
            return (
              <motion.div
                key={slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleNicheSelect(slug)}
                className="group cursor-pointer"
              >
                <div className={`${classes.bg} border-2 ${classes.border} ${classes.borderHover} rounded-2xl p-8 h-full transition-all hover:shadow-2xl ${classes.shadow} hover:scale-105`}>
                  <div className={`w-20 h-20 ${classes.primaryLight} ${classes.primaryLightHover} rounded-xl flex items-center justify-center mb-6 transition-colors`}>
                    <Icon className={classes.primary} size={40} />
                  </div>
                  
                  <h2 className={`text-3xl font-bold mb-3 ${classes.text}`}>
                    {config.title}
                  </h2>
                  
                  <p className={`${classes.textMuted} mb-6 text-lg`}>
                    {config.subtitle}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {config.services.slice(0, 2).map((service) => (
                      <div key={service.title} className={`flex justify-between text-sm ${classes.textLight}`}>
                        <span>{service.title}</span>
                        <span className={`font-semibold ${classes.primary}`}>{service.price}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className={`${classes.primaryBg} ${classes.primaryHover} text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors`}>
                    Ver Demo
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-zinc-500 text-sm">
            Multi-Niche Demo System • Escolha um modelo e personalize
          </p>
        </motion.div>
      </div>
    </main>
  );
}
