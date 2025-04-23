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
import { GraduationCapIcon, CalendarIcon, MapPinIcon } from "lucide-react";

// Updated education details
const educations = [
	{
		degree: "Bachelor of Engineering in Information Technology",
		institution: "St. Francis Institute of Technology (Mumbai University)", // Added college name
		location: "Mumbai, MH, India",
		period: "2018 - 2022", // Assuming standard 4-year duration, adjust if needed
		description:
			"Completed coursework with a focus on IT fundamentals and software development. Actively involved in extracurricular activities, including leading the CSI SFIT chapter.",
		gpa: "9.1/10.0", // Updated CGPA format
	},
	// Add High School or other relevant education if desired
];

export default function Education() {
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
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 },
	};

	return (
		<section id="education" className="py-20 bg-muted/30">
			<div className="px-4 md:px-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="text-center mb-12"
				>
					<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
						Education
					</h2>
					<Separator className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto" />
					<p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
						My academic background and educational qualifications.
					</p>
				</motion.div>

				<motion.div
					variants={container}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid grid-cols-1 gap-6 max-w-3xl mx-auto"
				>
					{educations.map((education, index) => (
						<motion.div key={index} variants={item}>
							<Card className="hover:shadow-lg transition-shadow overflow-hidden">
								<CardHeader className="pb-2 flex flex-row items-start gap-4">
									<div className="rounded-full p-2 w-10 h-10 flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white">
										<GraduationCapIcon className="h-5 w-5" />
									</div>
									<div className="space-y-1">
										<CardTitle className="text-xl font-bold">
											{education.degree}
										</CardTitle>
										<CardDescription className="font-medium">
											{education.institution}
										</CardDescription>
									</div>
								</CardHeader>
								<CardContent className="space-y-3">
									<div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
										{" "}
										{/* Allow wrapping */}
										<div className="flex items-center">
											<CalendarIcon className="w-4 h-4 mr-1" />
											{education.period}
										</div>
										<div className="flex items-center">
											<MapPinIcon className="w-4 h-4 mr-1" />
											{education.location}
										</div>
									</div>

									<p className="text-muted-foreground">
										{education.description}
									</p>

									<div className="text-sm font-medium">
										CGPA: {/* Changed label */}
										<span className="text-purple-600 dark:text-purple-400">
											{education.gpa}
										</span>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
