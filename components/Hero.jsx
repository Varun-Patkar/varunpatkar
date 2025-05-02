"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
	ArrowDownIcon,
	MousePointer2Icon,
	MoveIcon,
	ZoomInIcon,
} from "lucide-react";
import HeroCanvas from "./HeroCanvas";
import { Suspense, useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import { portfolioData } from "@/lib/portfolio-data"; // Import portfolio data
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"; // Import Tooltip components

export default function Hero() {
	const [show3D, setShow3D] = useState(false);
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false); // Add mounted state

	// Ensure component is mounted before rendering theme-dependent content
	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<section
			id="hero"
			className="relative flex items-center justify-center min-h-screen overflow-hidden"
		>
			{/* Container for Grid Layout */}
			<div className="container relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full h-full px-4 md:px-6">
				{/* Left Column: Image/R3F Canvas with Toggle */}
				<div className="relative flex flex-col items-center h-[350px] md:h-[650px] w-full order-last md:order-first">
					{/* Toggle Switch with Labels on Sides */}
					<div className="flex items-center space-x-3 mb-4 z-20">
						<Label
							htmlFor="toggle-3d"
							className="text-sm text-muted-foreground"
						>
							Static Image
						</Label>
						<Switch
							id="toggle-3d"
							checked={show3D}
							onCheckedChange={setShow3D}
							aria-label="Toggle between static image and 3D view"
						/>
						<Label
							htmlFor="toggle-3d"
							className="text-sm text-muted-foreground"
						>
							3D View{" "}
							<span className="text-xs opacity-80">(Resource Intensive)</span>
						</Label>
					</div>

					{/* Conditional Rendering Area */}
					<div className="relative h-[300px] md:h-[600px] w-full">
						{!mounted ? (
							// Show loading state or placeholder until mounted
							<div className="w-full h-full flex items-center justify-center">
								<div className="animate-pulse bg-muted rounded-md w-4/5 h-4/5"></div>
							</div>
						) : show3D ? (
							<Suspense fallback={null}>
								<HeroCanvas />
							</Suspense>
						) : (
							<motion.img
								src={
									resolvedTheme === "dark"
										? "/darkmode.png"
										: "/varungradient.png"
								}
								alt="Varun Patkar Logo"
								className="w-full h-full object-contain"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5 }}
								key={resolvedTheme} // Force re-render on theme change
							/>
						)}
					</div>
					{/* 3D View Instructions (Conditional) */}
					{mounted && show3D && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3 }}
							className="text-xs text-muted-foreground text-center mb-3 space-y-1 z-10"
						>
							<p className="flex items-center justify-center gap-1">
								<MousePointer2Icon className="w-3 h-3 inline-block" />
								<span className="font-semibold">Left Click + Drag:</span> Orbit
								around
							</p>
							<p className="flex items-center justify-center gap-1">
								<MoveIcon className="w-3 h-3 inline-block" />
								<span className="font-semibold">Right Click + Drag:</span> Pan
								view
							</p>
							<p className="flex items-center justify-center gap-1">
								<ZoomInIcon className="w-3 h-3 inline-block" />
								<span className="font-semibold">Scroll Wheel:</span> Zoom in/out
							</p>
						</motion.div>
					)}
				</div>

				{/* Right Column: Hero Content */}
				<div className="flex flex-col items-center text-center md:text-left">
					{/* Profile Image Div */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="mb-8 overflow-hidden rounded-full border-4 border-primary/20 p-1 bg-background/50 backdrop-blur-sm"
					>
						<div className="h-48 w-48 rounded-full bg-muted overflow-hidden">
							<img
								src="/profilephoto.jpg"
								alt="Varun Patkar"
								className="h-full w-full object-cover"
							/>
						</div>
					</motion.div>

					{/* Heading */}
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="text-4xl lg:text-6xl font-bold tracking-tighter mb-4 text-shadow-lg"
					>
						Hi, I'm{" "}
						<span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
							{portfolioData.name} {/* Use data from import */}
						</span>
					</motion.h1>

					{/* Paragraph */}
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl text-shadow"
					>
						{portfolioData.about.short} {/* Use data from import */}
					</motion.p>

					{/* Buttons - Wrap the whole section in TooltipProvider */}
					<TooltipProvider>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.6 }}
							className="flex flex-col sm:flex-row gap-4 w-full justify-center"
						>
							<Button
								size="lg"
								className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
								asChild
							>
								<a href="#projects">View My Work</a>
							</Button>

							{/* Tooltip for Download Resume */}
							<Tooltip>
								{/* Attach trigger directly to the button */}
								<TooltipTrigger asChild>
									<Button
										size="lg"
										variant="outline"
										onClick={(e) => e.preventDefault()}
									>
										Download Resume
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Updation in Progress!</p>
								</TooltipContent>
							</Tooltip>
						</motion.div>
					</TooltipProvider>
				</div>
			</div>

			{/* Arrow Down Icon - Positioned at bottom center */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.8 }}
				className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
			>
				<a href="#about" className="flex items-center justify-center w-10 h-10">
					<ArrowDownIcon className="w-6 h-6 animate-bounce text-foreground" />
				</a>
			</motion.div>
		</section>
	);
}
