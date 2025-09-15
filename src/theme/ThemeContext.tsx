import { ReactNode, createContext, useContext } from "react";
import { Theme } from "../types";

const theme = {
    colors: {
        primary: '#0070f3',
        secondary: '#1db954',
        background: '#f0f0f0',
        text: '#333333',
    },
    fonts: {
        body: 'Arial, sans-serif',
        heading: 'Georgia, serif',
    },
    canvasWidth: 600,
    canvasHeight: 400,
    canvasbg: '#000000'
}

const ThemeContext = createContext<Theme>(theme);



export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};