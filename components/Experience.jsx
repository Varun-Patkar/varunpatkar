"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { BriefcaseIcon, CalendarIcon, MapPinIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { portfolioData } from "@/lib/portfolio-data"; // Import portfolio data

export default function Experience() {
	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const item = {
		hidden: { opacity: 0, x: -20 },
		show: { opacity: 1, x: 0 },
	};

	return (
		<section id="experience" className="py-20">
			<div className="px-4 md:px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="text-center mb-12"
				>
					<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
						Work Experience
					</h2>
				<Separator className="w-20 h-1 bg-gradient-to-r from-mass-effect-blue to-mass-effect-red mx-auto" />
					<p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
						My professional journey and roles I've held throughout my career.
					</p>
				</motion.div>

				<motion.div
					variants={container}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-mass-effect-blue before:via-mass-effect-red before:to-mass-effect-blue before:opacity-30 before:content-[''] max-w-3xl mx-auto"
				>
					{/* Use portfolioData.experience */}
					{portfolioData.experience.map((experience, index) => (
						<motion.div
							key={index}
							variants={item}
							className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group"
						>
							<div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-background shadow-md text-primary md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 flex-shrink-0">
								<BriefcaseIcon className="w-5 h-5" />
							</div>

							<div className="w-full md:w-[calc(50%-2.5rem)]">
								<Card className="hover:shadow-lg transition-shadow">
									<CardHeader className="pb-3">
										<CardTitle className="text-xl font-bold">
											{experience.company}
										</CardTitle>
										<CardDescription className="font-medium text-sm">
											{experience.location}
										</CardDescription>
										<div className="flex items-center text-sm text-muted-foreground pt-1">
											<CalendarIcon className="w-4 h-4 mr-1" />
											{experience.totalPeriod}
										</div>
									</CardHeader>
								<Separator className="bg-border" />
								<CardContent className="space-y-4 pt-4">
										{/* Map through positions to show promotions */}
										{experience.positions.map((position, posIndex) => (
											<div
												key={posIndex}
												className={`${
													posIndex !== 0 ? "pt-4 border-t border-border" : ""
												}`}
											>
												<div className="space-y-2">
													<div>
														<h4 className="font-semibold text-base">
															{position.title}
														</h4>
														<div className="flex items-center text-sm text-muted-foreground">
															<CalendarIcon className="w-3.5 h-3.5 mr-1" />
															{position.period}
														</div>
													</div>

													<p className="text-sm text-muted-foreground">
														{position.description}
													</p>

													<div className="flex flex-wrap gap-2">
														{position.technologies.map((tech, techIndex) => (
															<Badge
																key={techIndex}
																variant="secondary"
																className="bg-muted-foreground/20 text-xs"
															>
																{tech}
															</Badge>
														))}
													</div>
												</div>
											</div>
										))}
									</CardContent>
								</Card>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
