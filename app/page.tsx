import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Chatbot from "@/components/Chatbot"; // Import the Chatbot component
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

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
			<Chatbot /> {/* Render the Chatbot component */}
			<Toaster /> {/* Add Toaster here */}
		</div>
	);
}
