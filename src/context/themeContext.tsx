'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system')
  const [mounted, setMounted] = useState(false)

  // Detecta preferência do sistema
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
    .matches ? 'dark' : 'light'

  // Atualiza o tema e localStorage
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  // Aplica o tema atual
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme || 'system'
    setThemeState(savedTheme)
    setMounted(true)
  }, [])

  // Aplica classes e observa mudanças no sistema
  useEffect(() => {
    const root = document.documentElement
    const applyTheme = (t: Theme) => {
      if (t === 'system') {
        root.classList.toggle('dark', systemTheme === 'dark')
      } else {
        root.classList.toggle('dark', t === 'dark')
      }
    }

    // Listener para mudanças no sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => theme === 'system' && applyTheme('system')
    mediaQuery.addEventListener('change', handler)

    applyTheme(theme)
    
    return () => mediaQuery.removeEventListener('change', handler)
  }, [theme, systemTheme])

  const toggleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf(theme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]
    setTheme(nextTheme)
  }

  if (!mounted) return null

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";

// interface ThemeContextType {
//   theme: string;
//   toggleTheme: () => void;
// }

// const ThemeContext = createContext<ThemeContextType>({
//   theme: "light",
//   toggleTheme: () => {},
// });

// export function ThemeProvider({ children }: { children: React.ReactNode }) {
//   const { theme, setTheme, systemTheme } = useNextTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return <>{children}</>; // Evita erro de renderização SSR

//   // Obtém o tema atual (se `theme` for `undefined`, usa o `systemTheme`)
//   const currentTheme = theme ?? systemTheme ?? "light";

//   const toggleTheme = () => {
//     setTheme(currentTheme === "dark" ? "light" : "dark");
//   };

//   return (
//     <NextThemesProvider attribute="class" defaultTheme="light">
//       <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
//         {children}
//       </ThemeContext.Provider>
//     </NextThemesProvider>
//   );
// }

// export function useTheme() {
//   return useContext(ThemeContext);
// }
