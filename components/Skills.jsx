"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { portfolioData } from "@/lib/portfolio-data"; // Import portfolio data

export default function Skills() {
	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 },
	};

	return (
		<section id="skills" className="py-20">
			<div className="px-4 md:px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="text-center mb-12"
				>
					<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
						My Skills
					</h2>
					<Separator className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto" />
					<p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
						My technical expertise spans data engineering, analysis, and web
						development.
					</p>{" "}
				</motion.div>

				<motion.div
					variants={container}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-2 gap-8"
				>
					{/* Use portfolioData.skills */}
					{portfolioData.skills.map((category, index) => (
						<motion.div key={index} variants={item}>
							<Card className="p-6 h-full hover:shadow-lg transition-shadow">
								<h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
									{category.category} {/* Use category.category */}
								</h3>
								<div className="space-y-4">
									{/* Use category.items */}
									{category.items.map((skill, skillIndex) => (
										<div key={skillIndex}>
											<div className="flex justify-between mb-1">
												<span className="font-medium">{skill.name}</span>
												<span className="text-muted-foreground text-sm">
													{skill.level}%
												</span>
											</div>
											<div className="h-2 w-full bg-muted rounded-full overflow-hidden">
												<motion.div
													initial={{ width: 0 }}
													whileInView={{ width: `${skill.level}%` }}
													viewport={{ once: true }}
													transition={{ duration: 1, delay: 0.2 }}
													className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
												/>
											</div>
										</div>
									))}
								</div>
							</Card>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
