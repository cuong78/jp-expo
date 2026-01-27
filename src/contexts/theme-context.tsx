
import React, { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const initialState: ThemeContextValue = {
    theme: "system",
    setTheme: () => null,
};

export const ThemeProviderContext = createContext<ThemeContextValue>(initialState);

type ProviderExtraProps = Omit<
    React.ComponentProps<typeof ThemeProviderContext.Provider>,
    "value"
>;

interface ThemeProviderProps extends ProviderExtraProps {
    children?: ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
}

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "vite-ui-theme",
    ...props
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    );

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

            root.classList.add(systemTheme);
            return;
        }

        root.classList.add(theme);
    }, [theme]);

    const value: ThemeContextValue = {
        theme,
        setTheme: (nextTheme: Theme) => {
            localStorage.setItem(storageKey, nextTheme);
            setTheme(nextTheme);
        },
    };

    return (
        <ThemeProviderContext.Provider
            {...props}
            value={value}
        >
            {children}
        </ThemeProviderContext.Provider>
    );
}
