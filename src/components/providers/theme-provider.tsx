import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { auth } from "@/lib/appwrite/auth";
import { ETheme } from "@/lib/enums";
import { useAuth } from "@/store/use-auth";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const { authStatus } = useAuth();
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme);

  // Get theme preference from the user account if user is authenticated
  useEffect(() => {
    (async function () {
      try {
        const themePref = await auth.getPreference<ETheme>("theme");
        if (themePref) setTheme(themePref);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    // Apply theme changes in ui
    const changeTheme = () => {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");

      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        root.classList.add(systemTheme);
        return;
      }
      root.classList.add(theme);
    };

    // Update theme preference in appwrite
    const updateThemeInPref = async () => {
      if (!authStatus) return;

      try {
        const newTheme = theme === "light" ? ETheme.Light : theme === "dark" ? ETheme.Dark : ETheme.System;
        await auth.updatePreference<ETheme>("theme", newTheme);
      } catch (error) {
        toast({
          title: "Error",
          description: (error as { message: string }).message,
          variant: "destructive",
        });
      }
    };

    changeTheme();
    updateThemeInPref().then();
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
