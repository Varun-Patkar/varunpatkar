"use client";

import React from "react";
import { useThemeTransition } from "./ThemeTransitionContext";

export default function ThemeTransitionOverlay() {
	const { clipPathStyle, overlayBg, overlayZIndex } = useThemeTransition();

	return (
		<div
			style={{
				position: "fixed",
				inset: 0,
				backgroundColor: overlayBg,
				zIndex: overlayZIndex,
				...clipPathStyle,
			}}
			aria-hidden="true" // Accessibility: Hide decorative element
		/>
	);
}
