import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot"; // Import the Chatbot

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Varun Patkar's Portfolio",
	description:
		"Portfolio website showcasing the work and skills of Varun Patkar",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning className="scroll-smooth">
			<head>
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
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<div className="flex flex-col min-h-screen">
						<Navbar />
						<main className="flex-grow">{children}</main>
						<Footer />
						<Chatbot /> {/* Add the Chatbot component here */}
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
