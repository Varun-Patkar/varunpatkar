"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

// Updated skill categories and skills
const skillCategories = [
	{
		name: "Data & Backend",
		skills: [
			{ name: "Python", level: 85 },
			{ name: "SQL", level: 80 },
			{ name: "Node.js", level: 70 },
			{ name: "Express", level: 70 },
			{ name: "Django", level: 65 },
			{ name: "MongoDB", level: 75 },
			{ name: "PostgreSQL", level: 70 },
		],
	},
	{
		name: "Frontend & Web",
		skills: [
			{ name: "JavaScript", level: 80 }, // User prefers JS
			{ name: "React", level: 75 },
			{ name: "Next.js", level: 70 },
			{ name: "Vite", level: 65 },
			{ name: "HTML/CSS", level: 85 },
			{ name: "Tailwind CSS", level: 80 },
			{ name: "Three.js", level: 50 }, // Added based on interest
		],
	},
	{
		name: "Cloud & Tools",
		skills: [
			{ name: "Git", level: 90 },
			{ name: "Docker", level: 70 },
			{ name: "Microsoft Azure", level: 75 }, // Added Azure
			{ name: "Azure Data Factory", level: 70 }, // Specific Azure service
			{ name: "Azure OpenAI", level: 65 }, // Specific Azure service
			{ name: "AWS", level: 50 }, // Lowered proficiency
		],
	},
	{
		name: "Other Languages",
		skills: [
			{ name: "C#", level: 60 }, // Adjusted level
			{ name: "Java", level: 20 },
			{ name: "C++", level: 20 },
			{ name: "TypeScript", level: 50 }, // Knows but doesn't prefer
		],
	},
];

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
					{/* Updated description */}
				</motion.div>

				<motion.div
					variants={container}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-2 gap-8"
				>
					{skillCategories.map((category, index) => (
						<motion.div key={index} variants={item}>
							<Card className="p-6 h-full hover:shadow-lg transition-shadow">
								<h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
									{category.name}
								</h3>
								<div className="space-y-4">
									{category.skills.map((skill, skillIndex) => (
										<div key={skillIndex}>
											<div className="flex justify-between mb-1">
												<span className="font-medium">{skill.name}</span>
												<span className="text-muted-foreground text-sm">
													{skill.level}% {/* Display updated level */}
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
