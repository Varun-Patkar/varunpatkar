"use client";

import React, { createContext, useState, useContext, useCallback } from "react";
import { useTheme } from "next-themes";

const ThemeTransitionContext = createContext(null);

export const useThemeTransition = () => useContext(ThemeTransitionContext);

// Define background colors for themes (adjust if your globals.css differs)
const themeColors = {
	light: "hsl(0 0% 100%)", // Replace with your actual light background variable value
	dark: "hsl(240 10% 3.9%)", // Replace with your actual dark background variable value
};

const ANIMATION_DURATION = 500; // ms, match CSS transition duration

export function ThemeTransitionProvider({ children }) {
	const { setTheme, resolvedTheme } = useTheme(); // Add resolvedTheme here if needed for debugging
	const [isAnimating, setIsAnimating] = useState(false);
	const [clipPathStyle, setClipPathStyle] = useState({
		clipPath: "circle(0% at 0px 0px)",
	});
	const [overlayBg, setOverlayBg] = useState("");
	const [overlayZIndex, setOverlayZIndex] = useState("-10"); // Start hidden

	const startTransition = useCallback(
		(newTheme, buttonRect) => {
			if (isAnimating) return;

			const targetBg = themeColors[newTheme];
			if (!targetBg || !buttonRect) return;

			const centerX = buttonRect.left + buttonRect.width / 2;
			const centerY = buttonRect.top + buttonRect.height / 2;

			// Calculate radius to cover the whole screen
			const radius = Math.hypot(
				Math.max(centerX, window.innerWidth - centerX),
				Math.max(centerY, window.innerHeight - centerY)
			);

			setOverlayBg(targetBg);
			setOverlayZIndex("9999"); // Bring overlay to front
			setIsAnimating(true);

			// Start expanding circle
			setClipPathStyle({
				clipPath: `circle(0% at ${centerX}px ${centerY}px)`,
				transition: `clip-path ${ANIMATION_DURATION}ms ease-in-out`, // Add transition property here
			});

			// Needs a tiny delay for the initial style to apply before transitioning
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					setClipPathStyle({
						clipPath: `circle(${radius}px at ${centerX}px ${centerY}px)`,
						transition: `clip-path ${ANIMATION_DURATION}ms ease-in-out`,
					});
				});
			});

			// After expanding animation completes:
			setTimeout(() => {
				// *** Set the theme immediately ***
				console.log(`Current resolvedTheme before set: ${resolvedTheme}`); // Debug log
				console.log(`Setting theme to: ${newTheme}`); // Debug log
				setTheme(newTheme);
				console.log(`setTheme called for ${newTheme}`); // Debug log

				// Start shrinking circle (hiding overlay reveals new theme underneath)
				setClipPathStyle({
					clipPath: `circle(0% at ${centerX}px ${centerY}px)`,
					transition: `clip-path ${ANIMATION_DURATION / 2}ms ease-in-out`, // Faster hide?
				});

				// Reset state after hide animation completes
				setTimeout(() => {
					setIsAnimating(false);
					setOverlayZIndex("-10");
					console.log("Animation finished, state reset."); // Debug log
				}, ANIMATION_DURATION / 2); // Wait for shrinking animation
			}, ANIMATION_DURATION); // Wait for expanding animation
		},
		[isAnimating, setTheme, resolvedTheme]
	);

	const value = {
		startTransition,
		isAnimating,
		clipPathStyle,
		overlayBg,
		overlayZIndex,
	};

	return (
		<ThemeTransitionContext.Provider value={value}>
			{children}
		</ThemeTransitionContext.Provider>
	);
}
