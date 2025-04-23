"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
// Remove import of ThemeTransitionProvider

export function ThemeProvider({ children, ...props }) {
	// Remove ThemeTransitionProvider wrapper
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
