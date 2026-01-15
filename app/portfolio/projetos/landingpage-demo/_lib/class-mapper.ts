export function getThemeClasses(theme: {
  primary: string;
  background: string;
  text: string;
  headerBg?: string;
  cardBg?: string;
}) {
  const themeClassMap: Record<string, Record<string, string>> = {
    barbearia: {
      primary: "amber-500",
      primaryHover: "amber-600",
      primaryLight: "amber-500/10",
      primaryShadow: "amber-500/20",
      background: "zinc-950",
      text: "zinc-100",
      textMuted: "zinc-400",
      textLight: "zinc-600",
      headerBg: "zinc-950",
      cardBg: "zinc-900",
      border: "zinc-800",
    },
    psicologo: {
      primary: "teal-500",
      primaryHover: "teal-600",
      primaryLight: "teal-500/10",
      primaryShadow: "teal-500/20",
      background: "slate-50",
      text: "slate-900",
      textMuted: "slate-600",
      textLight: "slate-400",
      headerBg: "white",
      cardBg: "white",
      border: "slate-200",
    },
    advogado: {
      primary: "blue-700",
      primaryHover: "blue-800",
      primaryLight: "blue-700/10",
      primaryShadow: "blue-700/20",
      background: "gray-50",
      text: "gray-900",
      textMuted: "gray-600",
      textLight: "gray-400",
      headerBg: "white",
      cardBg: "white",
      border: "gray-200",
    },
  };

  // Determine which theme based on primary color
  let themeKey = "barbearia";
  if (theme.primary === "teal-500") themeKey = "psicologo";
  if (theme.primary === "blue-700") themeKey = "advogado";

  return themeClassMap[themeKey] || themeClassMap.barbearia;
}

