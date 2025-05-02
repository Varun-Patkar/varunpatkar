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
import { portfolioData } from "@/lib/portfolio-data"; // Import portfolio data

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
					{/* Use portfolioData.projects */}
					{portfolioData.projects.map((project, index) => (
						<motion.div key={index} variants={item} className="h-full">
							<Card className="h-full flex flex-col group hover:shadow-lg transition-shadow overflow-hidden">
								<div className="relative overflow-hidden h-48">
									<img
										src={project.image || "/placeholder.png"} // Use placeholder if image missing
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
									{project.githubLink && ( // Simplified check
										<Button
											variant="outline"
											size="sm"
											className="flex-1 min-w-[100px]"
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
									{/* YouTube Button */}
									{project.youtubeLink && ( // Simplified check
										<Button
											variant="outline"
											size="sm"
											className="flex-1 min-w-[100px] border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700"
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
									{project.liveLink && ( // Simplified check
										<Button
											size="sm"
											className="flex-1 min-w-[100px] bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
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
