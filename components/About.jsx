"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { portfolioData } from "@/lib/portfolio-data"; // Import portfolio data

export default function About() {
	return (
		<section id="about" className="py-20 bg-muted/30">
			<div className="px-4 md:px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="text-center mb-12"
				>
					<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
						About Me
					</h2>
					<Separator className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto" />
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<div className="rounded-lg overflow-hidden">
							<img
								src="/working.png"
								alt="Varun Patkar working illustration"
								className="w-full h-auto object-cover rounded-lg scale-[0.65]"
							/>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className="space-y-6"
					>
						<h3 className="text-2xl font-bold">
							A Data Engineer/Analyst exploring the web
						</h3>

						<p className="text-muted-foreground leading-relaxed">
							Hello! I'm {portfolioData.name},{" "}
							{portfolioData.about.long.toLowerCase().substring(11)}{" "}
							{/* Use data from import */}
						</p>

						<p className="text-muted-foreground leading-relaxed">
							With a background in data and a curiosity for the new, I bridge
							the gap between data insights and interactive web experiences. I'm
							always learning and experimenting with cutting-edge tech.
						</p>

						<div className="flex flex-wrap gap-4 pt-2">
							<div className="flex flex-col">
								<span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
									{portfolioData.about.yearsExperience} {/* Use data */}
								</span>
								<span className="text-sm text-muted-foreground">
									Years Experience
								</span>
							</div>
							<div className="flex flex-col">
								<span className="text-3xl font-bold text-pink-600 dark:text-pink-400">
									{portfolioData.about.projectsCompleted} {/* Use data */}
								</span>
								<span className="text-sm text-muted-foreground">
									Projects Completed
								</span>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
