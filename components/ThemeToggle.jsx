"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react"; // Remove useRef
// Remove import of useThemeTransition

export default function ThemeToggle() {
	const { setTheme, resolvedTheme } = useTheme(); // Get setTheme back
	// Remove useThemeTransition hook call
	const [mounted, setMounted] = useState(false);
	// Remove buttonRef

	useEffect(() => {
		setMounted(true);
	}, []);

	// Restore original toggle logic
	const handleToggle = () => {
		setTheme(resolvedTheme === "dark" ? "light" : "dark");
	};

	if (!mounted) {
		return null;
	}

	return (
		<motion.div
			whileTap={{ scale: 0.9 }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
		>
			<Button
				// Remove ref
				variant="ghost"
				size="icon"
				onClick={handleToggle} // Use original handler
				className="w-9 h-9 rounded-full"
				aria-label="Toggle theme"
				// Remove disabled prop
			>
				{resolvedTheme === "dark" ? (
					<SunIcon className="h-5 w-5 text-yellow-400" />
				) : (
					<MoonIcon className="h-5 w-5 text-blue-700" />
				)}
			</Button>
		</motion.div>
	);
}
