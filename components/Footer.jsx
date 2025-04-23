"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { HeartIcon } from "lucide-react";
import { motion } from "framer-motion";

// Define navItems here, matching the Navbar
const navItems = [
	{ name: "Home", href: "#hero" },
	{ name: "About", href: "#about" },
	{ name: "Skills", href: "#skills" },
	{ name: "Projects", href: "#projects" },
	{ name: "Experience", href: "#experience" },
	{ name: "Education", href: "#education" },
	{ name: "Contact", href: "#contact" },
];

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-muted/50 py-12">
			<div className="px-4 md:px-6">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div className="md:col-span-2">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
						>
							<Link
								href="#hero"
								className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text"
							>
								Varun Patkar
							</Link>
							<p className="mt-2 text-muted-foreground">
								Data Engineer/Analyst exploring web development and AI.
							</p>
						</motion.div>
					</div>

					<div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.1 }}
						>
							<h3 className="font-semibold text-lg mb-3">Quick Links</h3>
							<ul className="space-y-2">
								{/* Map over navItems */}
								{navItems.map((item) => (
									<li key={item.name}>
										<Link
											href={item.href}
											className="text-muted-foreground hover:text-foreground transition-colors"
										>
											{item.name}
										</Link>
									</li>
								))}
							</ul>
						</motion.div>
					</div>

					<div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							<h3 className="font-semibold text-lg mb-3">Social</h3>
							<ul className="space-y-2">
								<li>
									<a
										href="https://github.com/Varun-Patkar"
										target="_blank"
										rel="noreferrer"
										className="text-muted-foreground hover:text-foreground transition-colors"
									>
										GitHub
									</a>
								</li>
								<li>
									<a
										href="https://www.linkedin.com/in/varun-patkar/"
										target="_blank"
										rel="noreferrer"
										className="text-muted-foreground hover:text-foreground transition-colors"
									>
										LinkedIn
									</a>
								</li>
								<li>
									<a
										href="https://x.com/Varun_Patkar"
										target="_blank"
										rel="noreferrer"
										className="text-muted-foreground hover:text-foreground transition-colors"
									>
										Twitter
									</a>
								</li>
							</ul>
						</motion.div>
					</div>
				</div>

				<Separator className="my-8" />

				<div className="flex flex-col sm:flex-row items-center justify-between">
					<p className="text-sm text-muted-foreground">
						© {currentYear} Varun Patkar. All rights reserved.
					</p>
					<p className="text-sm text-muted-foreground mt-4 sm:mt-0">
						Made with{" "}
						<HeartIcon className="inline-block h-4 w-4 text-red-500" /> using
						Next.js and Tailwind CSS
					</p>
				</div>
			</div>
		</footer>
	);
}
