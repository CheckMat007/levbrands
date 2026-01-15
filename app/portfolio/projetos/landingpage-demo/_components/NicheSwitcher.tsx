"use client";

import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, Scissors, Heart, Scale } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllNiches } from "../_lib/niches";

const nicheIcons: Record<string, any> = {
  barbearia: Scissors,
  psicologo: Heart,
  advogado: Scale,
};

export default function NicheSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  const niches = getAllNiches();
  const currentNiche = pathname.split("/").pop() || "barbearia";

  const handleNicheChange = (slug: string) => {
    router.push(`/portfolio/projetos/landingpage-demo/demo/${slug}`);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-zinc-900/95 backdrop-blur-md border border-zinc-700 rounded-lg px-4 py-3 flex items-center gap-3 text-white shadow-2xl hover:bg-zinc-800 transition-all"
        >
          <ChevronDown
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
            size={20}
          />
          <span className="text-sm font-medium">Trocar Modelo</span>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-full left-0 mb-2 bg-zinc-900/95 backdrop-blur-md border border-zinc-700 rounded-lg overflow-hidden shadow-2xl min-w-50"
            >
              {niches.map(({ slug, config }) => {
                const Icon = nicheIcons[slug] || Scissors;
                const isActive = currentNiche === slug;
                
                return (
                  <button
                    key={slug}
                    onClick={() => handleNicheChange(slug)}
                    className={`w-full px-4 py-3 flex items-center gap-3 text-left text-white hover:bg-zinc-800 transition-colors ${
                      isActive ? "bg-zinc-800" : ""
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium">{config.title}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

