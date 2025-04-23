"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PhoneIcon, MailIcon, MapPinIcon } from "lucide-react"; // Keep these
// Import specific icons if needed, or use SVGs directly
import { useState } from "react";
import { useToast } from "@/hooks/use-toast"; // Use the correct hook import

// Define SVG for LinkedIn
const LinkedInIcon = () => (
	<svg
		className="h-5 w-5"
		fill="currentColor"
		viewBox="0 0 24 24"
		aria-hidden="true"
	>
		<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
	</svg>
);

// Define SVG for GitHub (example, replace if needed)
const GitHubIcon = () => (
	<svg
		className="h-5 w-5"
		fill="currentColor"
		viewBox="0 0 24 24"
		aria-hidden="true"
	>
		<path
			fillRule="evenodd"
			d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
			clipRule="evenodd"
		/>
	</svg>
);

// Define SVG for Twitter (X)
const TwitterIcon = () => (
	<svg
		className="h-5 w-5"
		fill="currentColor"
		viewBox="0 0 24 24"
		aria-hidden="true"
	>
		<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
	</svg>
);

export default function Contact() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [status, setStatus] = useState(""); // Add state for submission status
	const { toast } = useToast(); // Use the hook to get the toast function

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// Updated handleSubmit function
	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus("Sending..."); // Update status

		// Prepend sender info to the message
		const messageWithSenderInfo = `Mailer Name: ${formData.name}\nMailer Email ID: ${formData.email}\n\n${formData.message}`;

		// Prepare data for Google Apps Script (only subject and message needed by script)
		const scriptPayload = {
			subject: formData.subject,
			message: messageWithSenderInfo,
		};

		const googleScriptUrl =
			"https://script.google.com/macros/s/AKfycbz17aUkJiKGqMUgC2pIWAe9rKhiJj9w5FGqdaN5hZLTJChN_uLWFvASVaNejnnDKQ8O/exec"; // Your Google Apps Script URL

		try {
			const res = await fetch(googleScriptUrl, {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: new URLSearchParams(scriptPayload), // Send only subject and modified message
			});

			const text = await res.text();
			if (text === "OK") {
				setStatus(""); // Clear status text on success
				// Show success toast
				toast({
					title: "Message Sent!",
					description: "Thank you for reaching out. I'll get back to you soon.",
					variant: "default", // Or 'success' if you have custom variants
				});
				// Clear form on success
				setFormData({ name: "", email: "", subject: "", message: "" });
			} else {
				setStatus(`Error sending message: ${text}`);
				// Optional: Show error toast
				toast({
					title: "Error Sending Message",
					description: `Something went wrong: ${text}`,
					variant: "destructive",
				});
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			setStatus(`Error sending message: ${error.message}`);
			// Optional: Show error toast
			toast({
				title: "Error Sending Message",
				description: `An unexpected error occurred: ${error.message}`,
				variant: "destructive",
			});
		}

		// Optional: Clear status message after a few seconds if it's an error
		if (status.startsWith("Error")) {
			setTimeout(() => setStatus(""), 5000);
		}
	};

	return (
		<section id="contact" className="py-20">
			<div className="px-4 md:px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="text-center mb-12"
				>
					<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
						Get In Touch
					</h2>
					<Separator className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto" />
					<p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
						Have a question or want to work together? Feel free to reach out to
						me.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<Card className="h-full">
							<CardContent className="p-6 space-y-8">
								<div>
									<h3 className="text-2xl font-bold mb-6">
										Contact Information
									</h3>
									<div className="space-y-4">
										<div className="flex items-start">
											<div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center mr-4">
												<PhoneIcon className="h-5 w-5" />
											</div>
											<div>
												<p className="font-medium">Phone</p>
												<p className="text-muted-foreground">
													+91 7977802884 {/* Updated Phone */}
												</p>
											</div>
										</div>

										<div className="flex items-start">
											<div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center mr-4">
												<MailIcon className="h-5 w-5" />
											</div>
											<div>
												<p className="font-medium">Email</p>
												<p className="text-muted-foreground">
													varunpatkar501@gmail.com {/* Updated Email */}
												</p>
											</div>
										</div>

										<div className="flex items-start">
											<div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center mr-4">
												<MapPinIcon className="h-5 w-5" />
											</div>
											<div>
												<p className="font-medium">Location</p>
												<p className="text-muted-foreground">
													Mumbai, Maharashtra, India {/* Updated Location */}
												</p>
											</div>
										</div>
									</div>
								</div>

								<div>
									<h3 className="text-2xl font-bold mb-4">Follow Me</h3>
									<div className="flex space-x-4">
										{/* GitHub Link */}
										<a
											href="https://github.com/Varun-Patkar"
											target="_blank"
											rel="noreferrer"
											// Add text-foreground for SVG inheritance
											className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors text-foreground"
											aria-label="GitHub"
										>
											<GitHubIcon />
										</a>
										{/* LinkedIn Link */}
										<a
											href="https://www.linkedin.com/in/varun-patkar/"
											target="_blank"
											rel="noreferrer"
											// Add text-foreground for SVG inheritance
											className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors text-foreground"
											aria-label="LinkedIn"
										>
											<LinkedInIcon /> {/* Use LinkedIn Icon */}
										</a>
										{/* Twitter (X) Link */}
										<a
											href="https://x.com/Varun_Patkar"
											target="_blank"
											rel="noreferrer"
											// Add text-foreground for SVG inheritance
											className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors text-foreground"
											aria-label="Twitter"
										>
											<TwitterIcon /> {/* Use Twitter Icon */}
										</a>
										{/* Removed Dribbble and Instagram */}
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.4 }}
					>
						<Card className="h-full">
							<CardContent className="p-6">
								<form onSubmit={handleSubmit} className="space-y-6">
									<div className="space-y-4">
										<div>
											<label
												htmlFor="contact-name" // Match ID
												className="block text-sm font-medium mb-1"
											>
												Your Name
											</label>
											<Input
												id="contact-name" // Add ID
												name="name"
												value={formData.name}
												onChange={handleChange}
												placeholder="John Doe"
												required
											/>
										</div>

										<div>
											<label
												htmlFor="contact-email" // Match ID
												className="block text-sm font-medium mb-1"
											>
												Your Email
											</label>
											<Input
												id="contact-email" // Add ID
												name="email"
												type="email"
												value={formData.email}
												onChange={handleChange}
												placeholder="john.doe@example.com"
												required
											/>
										</div>

										<div>
											<label
												htmlFor="contact-subject" // Match ID
												className="block text-sm font-medium mb-1"
											>
												Subject
											</label>
											<Input
												id="contact-subject" // Add ID
												name="subject"
												value={formData.subject}
												onChange={handleChange}
												placeholder="How can I help you?"
												required
											/>
										</div>

										<div>
											<label
												htmlFor="contact-message" // Match ID
												className="block text-sm font-medium mb-1"
											>
												Message
											</label>
											<Textarea
												id="contact-message" // Add ID
												name="message"
												value={formData.message}
												onChange={handleChange}
												placeholder="Tell me about your project..."
												rows={5}
												required
											/>
										</div>
									</div>

									<Button
										id="contact-submit" // Add ID
										type="submit"
										className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
										disabled={status === "Sending..."} // Disable button while sending
									>
										{status === "Sending..." ? "Sending..." : "Send Message"}
									</Button>
									{/* Display status message */}
									{status && status.startsWith("Error") && (
										<p className="mt-4 text-sm text-center text-red-600">
											{status}
										</p>
									)}
								</form>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
