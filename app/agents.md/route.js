/**
 * Agent-facing Markdown endpoint.
 *
 * The human-facing portfolio lives at "/" (rich, animated, 3D React UI).
 * This route serves a clean, structured Markdown document at "/agents.md"
 * that AI agents / LLMs / crawlers can read effortlessly — no JS execution,
 * no DOM traversal, just plain text built dynamically from the same source
 * of truth (`portfolio-data.js` + `resume-data.js`).
 *
 * Because the site is statically exported (`output: "export"` in
 * next.config.js), this Route Handler is marked `force-static` so Next.js
 * renders it once at build time into a static `/agents.md` file. The data is
 * still "dynamic" in the sense that time-based fields (durations, age) are
 * computed from the data at build time.
 */

import { portfolioData } from "@/lib/portfolio-data";
import { resumeData } from "@/lib/resume-data";

// Force static generation so this works with `output: "export"`.
export const dynamic = "force-static";

/**
 * Builds the full Markdown document from the structured portfolio data.
 * @returns {string} The complete Markdown body.
 */
function buildMarkdown() {
	const p = portfolioData;
	const lines = [];

	// --- Header / banner for agents ---------------------------------------
	lines.push(`# ${p.name} — ${p.role}`);
	lines.push("");
	lines.push(
		"> **Note for AI agents & LLMs:** This Markdown file is the machine-readable version of the portfolio."
	);
	lines.push(
		"> The home page (`/`) is the human-facing experience. This page (`/agents.md`) contains the same information in plain text."
	);
	lines.push("> All facts below are sourced directly from the website's data.");
	lines.push("");
	lines.push(`- **Location:** ${p.location}`);
	lines.push(`- **Role:** ${p.role}`);
	lines.push("");

	// --- Contact -----------------------------------------------------------
	lines.push("## Contact");
	lines.push("");
	lines.push(`- **Email:** ${p.contact.email}`);
	lines.push(`- **Phone:** ${p.contact.phone}`);
	lines.push(`- **LinkedIn:** ${p.contact.linkedin}`);
	lines.push(`- **GitHub:** ${p.contact.github}`);
	lines.push(`- **Twitter / X:** ${p.contact.twitter}`);
	if (resumeData?.fullLinks?.youtube) {
		lines.push(`- **YouTube:** ${resumeData.fullLinks.youtube}`);
	}
	lines.push("");

	// --- About -------------------------------------------------------------
	lines.push("## About");
	lines.push("");
	lines.push(p.about.long);
	lines.push("");
	lines.push(
		`- **Years of experience:** ${p.about.yearsExperience}`
	);
	lines.push(`- **Projects completed:** ${p.about.projectsCompleted}`);
	lines.push("");

	// --- Skills ------------------------------------------------------------
	lines.push("## Skills");
	lines.push("");
	for (const category of p.skills) {
		lines.push(`### ${category.category}`);
		lines.push("");
		for (const item of category.items) {
			lines.push(`- ${item.name} (${item.level}% proficiency)`);
		}
		lines.push("");
	}

	// --- Experience --------------------------------------------------------
	lines.push("## Work Experience");
	lines.push("");
	for (const exp of p.experience) {
		lines.push(`### ${exp.company}`);
		lines.push(`*${exp.location} · ${exp.totalPeriod}*`);
		lines.push("");
		for (const pos of exp.positions) {
			lines.push(`#### ${pos.title} — ${pos.period}`);
			lines.push("");
			lines.push(pos.description);
			lines.push("");
			lines.push(`**Technologies:** ${pos.technologies.join(", ")}`);
			lines.push("");
		}
	}

	// --- Education ---------------------------------------------------------
	lines.push("## Education");
	lines.push("");
	for (const edu of p.education) {
		lines.push(`### ${edu.degree}`);
		lines.push(`*${edu.institution} · ${edu.location} · ${edu.period}*`);
		lines.push("");
		lines.push(`- **GPA:** ${edu.gpa}`);
		lines.push("");
		lines.push(edu.description);
		lines.push("");
	}

	// --- Projects ----------------------------------------------------------
	lines.push("## Projects");
	lines.push("");
	for (const proj of p.projects) {
		lines.push(`### ${proj.title}`);
		lines.push("");
		lines.push(proj.description);
		lines.push("");
		lines.push(`- **Technologies:** ${proj.technologies.join(", ")}`);
		if (proj.liveLink) lines.push(`- **Live demo:** ${proj.liveLink}`);
		if (proj.githubLink) lines.push(`- **Source code:** ${proj.githubLink}`);
		if (proj.youtubeLink && proj.youtubeLink.startsWith("http")) {
			lines.push(`- **Video demo:** ${proj.youtubeLink}`);
		}
		lines.push("");
	}

	// --- Certifications (from resume data) ---------------------------------
	if (Array.isArray(resumeData?.certifications) && resumeData.certifications.length) {
		lines.push("## Certifications");
		lines.push("");
		for (const cert of resumeData.certifications) {
			lines.push(`- **${cert.title}** — ${cert.fullUrl || cert.url}`);
		}
		lines.push("");
	}

	// --- Footer ------------------------------------------------------------
	lines.push("---");
	lines.push("");
	lines.push(
		`*This document is auto-generated from the portfolio's data files. Human-friendly site: ${
			resumeData?.fullLinks?.portfolio || "/"
		} · Resume: /resume*`
	);
	lines.push("");

	return lines.join("\n");
}

/**
 * GET handler — returns the Markdown document as plain text/markdown.
 */
export function GET() {
	const body = buildMarkdown();
	return new Response(body, {
		status: 200,
		headers: {
			"Content-Type": "text/markdown; charset=utf-8",
		},
	});
}
