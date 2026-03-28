"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

/**
 * LayoutShell — Conditionally renders Navbar, Footer, and Chatbot.
 * On the /resume route, these are hidden to give a clean, standalone page.
 */
export default function LayoutShell({ children }) {
	const pathname = usePathname();
	const isResume = pathname === "/resume";

	if (isResume) {
		return <>{children}</>;
	}

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-grow">{children}</main>
			<Footer />
			<Chatbot />
		</div>
	);
}
