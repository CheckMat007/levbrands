export function getThemeClasses(theme: {
  primary: string;
  background: string;
  text: string;
  headerBg?: string;
  cardBg?: string;
}) {
  const classMap: Record<string, string> = {
    // Primary colors
    "amber-500": "amber-500",
    "teal-500": "teal-500",
    "blue-700": "blue-700",
    
    // Background colors
    "zinc-950": "zinc-950",
    "slate-50": "slate-50",
    "gray-50": "gray-50",
    
    // Text colors
    "zinc-100": "zinc-100",
    "slate-900": "slate-900",
    "gray-900": "gray-900",
    
    // Card backgrounds
    "zinc-900": "zinc-900",
    "white": "white",
  };

  return {
    primary: classMap[theme.primary] || theme.primary,
    background: classMap[theme.background] || theme.background,
    text: classMap[theme.text] || theme.text,
    headerBg: theme.headerBg ? classMap[theme.headerBg] || theme.headerBg : theme.background,
    cardBg: theme.cardBg ? classMap[theme.cardBg] || theme.cardBg : theme.background,
  };
}

