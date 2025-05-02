import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Chatbot from "@/components/Chatbot";
import { Toaster as SonnerToaster } from "@/components/ui/sonner"; // Use Sonner for the reminder
import ChatbotReminder from "@/components/ChatbotReminder"; // Import the reminder component

export default function Home() {
	return (
		<div className="flex flex-col w-full">
			<Hero />
			<About />
			<Skills />
			<Projects />
			<Experience />
			<Education />
			<Contact />
			<Chatbot />
			<SonnerToaster /> {/* Ensure Sonner is rendered */}
			<ChatbotReminder /> {/* Render the reminder component */}
		</div>
	);
}
