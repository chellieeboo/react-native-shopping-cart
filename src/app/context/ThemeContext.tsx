import { createContext, ReactNode, useContext, useState } from "react";

const lightColors = {
  background: "#FAF3E8",
  headerBg: "#4A2C20",
  cardBg: "#4A2C20",
  cardBgLight: "#F5EBDD",
  accent: "#D6A85F",
  textLight: "#F5EBDD",
  textMuted: "#E8DED2",
  textDark: "#2B1810",
  textSecondary: "#8A6E52",
  categoryBtn: "#2B1810",
};

const darkColors = {
  background: "#1A1210",
  headerBg: "#241813",
  cardBg: "#241813",
  cardBgLight: "#2E211B",
  accent: "#E8C583",
  textLight: "#F5EBDD",
  textMuted: "#D8C9B8",
  textDark: "#F5EBDD",
  textSecondary: "#B39B85",
  categoryBtn: "#0F0A08",
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
