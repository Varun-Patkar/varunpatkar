"use client";

import { useState, useEffect } from "react";
// Link component is no longer needed for same-page scrolling
// import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon } from "lucide-react";

const navItems = [
	{ name: "Home", href: "#hero" },
	{ name: "About", href: "#about" },
	{ name: "Skills", href: "#skills" },
	{ name: "Projects", href: "#projects" },
	{ name: "Experience", href: "#experience" },
	{ name: "Education", href: "#education" },
	{ name: "Contact", href: "#contact" },
];

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<motion.header
			className={`sticky top-0 z-50 w-full transition-all duration-300 ${
				scrolled
					? "bg-background/80 backdrop-blur-md shadow-md"
					: "bg-transparent"
			}`}
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="flex h-16 items-center justify-between px-4 md:px-6">
				{/* Use <a> tag for the logo link as well */}
				<a
					href="#hero"
					className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text"
				>
					Varun Patkar
				</a>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center gap-6">
					{/* Replace Link with <a> */}
					{navItems.map((item) => (
						<a
							key={item.name}
							href={item.href}
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							{item.name}
						</a>
					))}
					<ThemeToggle />
				</nav>

				{/* Mobile Navigation Button */}
				<div className="flex items-center md:hidden">
					<ThemeToggle />
					<Button
						variant="ghost"
						size="icon"
						className="ml-2"
						onClick={() => setIsOpen(!isOpen)}
					>
						{isOpen ? (
							// Add text-foreground
							<XIcon className="h-5 w-5 text-foreground" />
						) : (
							// Add text-foreground
							<MenuIcon className="h-5 w-5 text-foreground" />
						)}
					</Button>
				</div>
			</div>

			{/* Mobile Navigation Menu */}
			{isOpen && (
				<motion.div
					className="md:hidden py-4 px-6 bg-background shadow-lg"
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: "auto" }}
					exit={{ opacity: 0, height: 0 }}
					transition={{ duration: 0.3 }}
				>
					<nav className="flex flex-col space-y-4">
						{/* Replace Link with <a> */}
						{navItems.map((item) => (
							<a
								key={item.name}
								href={item.href}
								className="text-muted-foreground hover:text-foreground transition-colors py-2"
								onClick={() => setIsOpen(false)} // Keep onClick to close menu
							>
								{item.name}
							</a>
						))}
					</nav>
				</motion.div>
			)}
		</motion.header>
	);
}
