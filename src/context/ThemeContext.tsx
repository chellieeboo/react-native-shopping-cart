import { createContext, ReactNode, useContext, useState } from "react";

// roChordz brand palette
// Primary  -> Deep Navy / Charcoal
// Secondary -> Cream / Off-white
// Accent   -> Warm Gold / Amber
// Supporting -> Neutral Gray
const lightColors = {
  background: "#FAF6EF", // cream
  headerBg: "#1B2430", // deep navy
  cardBg: "#1B2430",
  cardBgLight: "#FFFFFF",
  surfaceAlt: "#F2ECDD", // neutral backdrop for image containers
  accent: "#D6A85F", // warm gold
  accentDeep: "#B4863C", // pressed/darker gold
  textLight: "#F5EFE2", // cream text on navy
  textMuted: "#C9CDD3",
  textDark: "#20242B", // charcoal text on light surfaces
  textSecondary: "#6E7480", // neutral gray
  categoryBtn: "#2A3444",
  border: "#E4DECF",
  success: "#4CAF50",
  danger: "#E57373",
};

const darkColors = {
  background: "#12161D", // near-black charcoal
  headerBg: "#171E29",
  cardBg: "#1B2430",
  cardBgLight: "#202935",
  surfaceAlt: "#232D3B",
  accent: "#E8C583", // warm gold
  accentDeep: "#C9A868",
  textLight: "#F5EFE2",
  textMuted: "#B7BCC4",
  textDark: "#F5EFE2",
  textSecondary: "#9AA0AB",
  categoryBtn: "#0F141C",
  border: "#2A3140",
  success: "#66BB6A",
  danger: "#EF9A9A",
};

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
  colors: typeof lightColors;
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
  colors: lightColors,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
