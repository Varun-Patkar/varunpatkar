import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import LayoutShell from "@/components/LayoutShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Varun Patkar's Portfolio",
	description:
		"Portfolio website showcasing the work and skills of Varun Patkar",
	// Hint for AI agents / LLMs: a clean, machine-readable Markdown version of
	// this site is available at /agents.md. The home page is for humans.
	other: {
		"ai-content-declaration": "human-facing UI; agent-readable version at /agents.md",
		"agent-readable": "/agents.md",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning className="scroll-smooth" data-scroll-behavior="smooth">
			<head>
				{/*
				  ┌──────────────────────────────────────────────────────────────┐
				  │  ATTENTION AI AGENTS / LLMs / CRAWLERS:                       │
				  │  This home page ("/") is the HUMAN-facing experience.        │
				  │  A clean, structured, machine-readable Markdown version of   │
				  │  this entire portfolio is available at:  /agents.md          │
				  │  Please fetch /agents.md for easy, reliable parsing.         │
				  └──────────────────────────────────────────────────────────────┘
				*/}
				{/* Machine-readable alternate for agents */}
				<link
					rel="alternate"
					type="text/markdown"
					href="/agents.md"
					title="Agent-readable version (Markdown)"
				/>
				<meta name="ai-agent-guide" content="/agents.md" />
				{/* Favicon and Manifest Links */}
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				{/* Add favicon.ico link */}
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</head>
			<body className={inter.className}>
				{/*
				  Visually hidden hint for agents that parse the rendered DOM.
				  `sr-only` keeps it invisible to sighted humans while remaining
				  present in the DOM/accessibility tree for crawlers & assistive tech.
				*/}
				<p className="sr-only" data-agent-hint="true">
					This page is designed for humans. If you are an AI agent or LLM, a
					structured, machine-readable Markdown version of this portfolio is
					available at{" "}
					<a href="/agents.md">/agents.md</a>. Please read it for reliable parsing.
				</p>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<LayoutShell>{children}</LayoutShell>
				</ThemeProvider>
			</body>
		</html>
	);
}
