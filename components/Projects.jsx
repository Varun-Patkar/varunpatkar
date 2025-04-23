"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon, GithubIcon, YoutubeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const projects = [
	{
		title: "Paper IO Game Clone",
		description:
			"A 3D game inspired by Paper.IO using React and 3JS. Control a cube, expand territory, and avoid trails. Future enhancements planned.",
		image:
			"https://images.crazygames.com/paper-io-2_16x9/20250214024143/paper-io-2_16x9-cover?auto=format,compress&q=75&cs=strip", // Placeholder image
		technologies: [
			"React",
			"3JS",
			"Vite",
			"React Three Fiber",
			"Drei",
			"Zustand",
			"Tailwind CSS",
		],
		liveLink: "https://paper-io-varun.vercel.app/",
		githubLink: "https://github.com/Varun-Patkar/PaperIOCloneVarunPatkar",
		youtubeLink: "https://youtu.be/sZs3o5sKe4g",
	},
	{
		title: "Marvel Universe Conquerer with Alfred AI Butler",
		description:
			"A 3D interactive gallery of Marvel artifacts built with React Three Fiber, featuring a sassy AI Butler (Alfred) powered by WebLLM.",
		image: "https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg", // Placeholder image
		technologies: [
			"React Three Fiber",
			"Drei",
			"WebLLM",
			"React",
			"Tailwind CSS",
		],
		liveLink: "https://universe-conqueror-ai.vercel.app/",
		githubLink: "https://github.com/Varun-Patkar/universe-conqueror-ai",
		youtubeLink: "https://youtu.be/Gt_kxUQwSLY?si=-LbCM-hq_s16y5Wu",
	},
	{
		title: "WordNest",
		description:
			"A fast, SEO-optimized blogging platform built with Next.js 15 and Sanity for instant blog creation and viewing without page reloads.",
		image: "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg", // Placeholder image
		technologies: ["Next.js 15", "React 19", "Sanity", "Tailwind CSS"],
		liveLink: "https://wordnest-varun.vercel.app/",
		githubLink: "https://github.com/Varun-Patkar/WordNest",
		youtubeLink: "https://youtu.be/JIn-ujHFEW8",
	},
	{
		title: "Old Varun Patkar Portfolio",
		description:
			"My previous portfolio website created while exploring 3JS, built using plain Next.js and Three.js.",
		image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg", // Placeholder image
		technologies: ["Next.js", "Three.js", "JavaScript"],
		liveLink: "http://varun-patkar-portfolio.vercel.app/",
		githubLink: "https://github.com/Varun-Patkar/VarunPatkarPortfolio",
		// No youtubeLink
	},
	{
		title: "Snake with Reinforcement Learning",
		description:
			"A Python-based Snake game built using Pygame that simulates learning for the snake using reinforcement learning techniques.",
		image: "https://images.pexels.com/photos/1742370/pexels-photo-1742370.jpeg", // Placeholder image
		technologies: ["Python", "Pygame", "Reinforcement Learning"],
		// No liveLink
		githubLink:
			"https://github.com/Varun-Patkar/SnakeWithReinforcementLearning",
		// No youtubeLink
	},
];

export default function Projects() {
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
		<section id="projects" className="py-20 bg-muted/30">
			<div className="px-4 md:px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="text-center mb-12"
				>
					<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
						Featured Projects
					</h2>
					<Separator className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto" />
					<p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
						Explore some of my recent work and projects I've built using various
						technologies.
					</p>
				</motion.div>

				<motion.div
					variants={container}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
				>
					{projects.map((project, index) => (
						<motion.div key={index} variants={item} className="h-full">
							<Card className="h-full flex flex-col group hover:shadow-lg transition-shadow overflow-hidden">
								<div className="relative overflow-hidden h-48">
									<img
										src={project.image}
										alt={project.title}
										className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
									/>
								</div>
								<CardHeader>
									<CardTitle className="text-xl font-bold">
										{project.title}
									</CardTitle>
									<CardDescription className="line-clamp-2">
										{project.description}
									</CardDescription>
								</CardHeader>
								<CardContent className="flex-grow">
									<div className="flex flex-wrap gap-2">
										{project.technologies.map((tech, techIndex) => (
											<Badge
												key={techIndex}
												variant="secondary"
												className="bg-muted-foreground/20"
											>
												{tech}
											</Badge>
										))}
									</div>
								</CardContent>
								<CardFooter className="flex flex-wrap gap-2 justify-center">
									{/* GitHub Button */}
									{project.githubLink && project.githubLink !== "#" && (
										<Button
											variant="outline"
											size="sm"
											className="flex-1 min-w-[100px]" // Ensure minimum width
											asChild
										>
											<a
												href={project.githubLink}
												target="_blank"
												rel="noreferrer"
											>
												<GithubIcon className="h-4 w-4 mr-2 text-current" />
												Code
											</a>
										</Button>
									)}
									{/* YouTube Button (Conditional) */}
									{project.youtubeLink && project.youtubeLink !== "#" && (
										<Button
											variant="outline"
											size="sm"
											className="flex-1 min-w-[100px] border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700" // Style for YouTube
											asChild
										>
											<a
												href={project.youtubeLink}
												target="_blank"
												rel="noreferrer"
											>
												<YoutubeIcon className="h-4 w-4 mr-2" />
												Watch Demo
											</a>
										</Button>
									)}
									{/* Live Demo Button */}
									{project.liveLink && project.liveLink !== "#" && (
										<Button
											size="sm"
											className="flex-1 min-w-[100px] bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" // Ensure minimum width
											asChild
										>
											<a
												href={project.liveLink}
												target="_blank"
												rel="noreferrer"
											>
												<ExternalLinkIcon className="h-4 w-4 mr-2 text-white" />
												Live Demo
											</a>
										</Button>
									)}
								</CardFooter>
							</Card>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
