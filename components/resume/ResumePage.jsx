"use client";

import { resumeData } from "@/lib/resume-data";

/**
 * ResumePage — The web-rendered A4 resume.
 * Clean, minimalistic, black-on-white design with subtle gray accents.
 * All links are rendered as visible text URLs.
 * Fits a single A4 page (210mm × 297mm).
 */
export default function ResumePage() {
	const d = resumeData;

	return (
		<div style={styles.page}>
			{/* ===== HEADER (image left, info right) ===== */}
			<header style={styles.header}>
				<img src={d.profileImage} alt={d.name} style={styles.profileImg} />
				<div style={styles.headerInfo}>
					<h1 style={styles.name}>{d.name}</h1>
					<div style={styles.subtitle}>{d.age} years old &middot; {d.location}</div>
					<div style={styles.contactRow}>
						<span>{d.contact.phone}</span>
						<span style={styles.dot}>&middot;</span>
						<a href={`mailto:${d.contact.email}`} style={styles.link}>{d.contact.email}</a>
						<span style={styles.dot}>&middot;</span>
						<a href={d.fullLinks.portfolio} style={styles.link}>{d.links.portfolio}</a>
					</div>
					<div style={styles.contactRow}>
						<a href={d.fullLinks.github} style={styles.link}>{d.links.github}</a>
						<span style={styles.dot}>&middot;</span>
						<a href={d.fullLinks.linkedin} style={styles.link}>{d.links.linkedin}</a>
						<span style={styles.dot}>&middot;</span>
						<a href={d.fullLinks.twitter} style={styles.link}>{d.links.twitter}</a>
						<span style={styles.dot}>&middot;</span>
						<a href={d.fullLinks.youtube} style={styles.link}>{d.links.youtube}</a>
					</div>
				</div>
			</header>

			<hr style={styles.divider} />

			{/* ===== SUMMARY ===== */}
			<section>
				<h2 style={styles.sectionTitle}>Summary</h2>
				<p style={styles.body}>{d.summary}</p>
			</section>

			<hr style={styles.divider} />

			{/* ===== EXPERIENCE ===== */}
			<section>
				<h2 style={styles.sectionTitle}>Experience</h2>
				{d.experience.map((exp, i) => (
					<div key={i} style={{ marginBottom: i < d.experience.length - 1 ? "8px" : 0 }}>
						{exp.positions.map((pos, j) => (
							<div key={j} style={{ marginBottom: j < exp.positions.length - 1 ? "6px" : 0 }}>
								<div style={styles.expHeader}>
									<span style={styles.expTitle}>{pos.title}</span>
									<span style={styles.expPeriod}>{pos.period}</span>
								</div>
								<div style={styles.expCompany}>{exp.company} &middot; {exp.location}</div>
								<ul style={styles.bullets}>
									{pos.bullets.map((b, k) => (
										<li key={k} style={styles.bullet}>{b}</li>
									))}
								</ul>
								<div style={styles.techRow}>
									{pos.technologies.map((t, k) => (
										<span key={k} style={styles.techBadge}>{t}</span>
									))}
								</div>
							</div>
						))}
					</div>
				))}
			</section>

			<hr style={styles.divider} />

			{/* ===== EDUCATION ===== */}
			<section>
				<h2 style={styles.sectionTitle}>Education</h2>
				<div style={styles.expHeader}>
					<span style={styles.expTitle}>{d.education.degree}</span>
					<span style={styles.expPeriod}>{d.education.period}</span>
				</div>
				<div style={styles.expCompany}>{d.education.institution} &middot; {d.education.gpa}</div>
			</section>

			<hr style={styles.divider} />

			{/* ===== CERTIFICATIONS ===== */}
			<section>
				<h2 style={styles.sectionTitle}>Certifications</h2>
				{d.certifications.map((cert, i) => (
					<div key={i} style={styles.certRow}>
						<span style={styles.certTitle}>{cert.title}</span>
						<a href={cert.fullUrl} style={styles.certLink}>{cert.url}</a>
					</div>
				))}
			</section>

			<hr style={styles.divider} />

			{/* ===== PROJECTS ===== */}
			<section>
				<h2 style={styles.sectionTitle}>Projects</h2>
				{d.projects.map((proj, i) => (
					<div key={i} style={{ marginBottom: i < d.projects.length - 1 ? "6px" : 0 }}>
						<div style={styles.projHeader}>
							<span style={styles.projTitle}>{proj.title}</span>
							<span style={styles.projLinksRow}>
								<span style={styles.projLinkLabel}>GitHub: </span>
								<a href={proj.fullLink} style={styles.projLink}>{proj.link}</a>
								{proj.fullLiveLink && <span style={styles.projLinkSep}> | </span>}
								{proj.fullLiveLink && <><span style={styles.projLinkLabel}>Live: </span><a href={proj.fullLiveLink} style={styles.projLink}>{proj.liveLink}</a></>}
								{proj.fullYoutubeLink && <span style={styles.projLinkSep}> | </span>}
								{proj.fullYoutubeLink && <><span style={styles.projLinkLabel}>Demo: </span><a href={proj.fullYoutubeLink} style={styles.projLink}>{proj.youtubeLink}</a></>}
							</span>
						</div>
						<p style={styles.projDesc}>{proj.description}</p>
						<div style={styles.techRow}>
							{proj.technologies.map((t, k) => (
								<span key={k} style={styles.techBadge}>{t}</span>
							))}
						</div>
					</div>
				))}
			</section>

			<hr style={styles.divider} />

			{/* ===== SKILLS ===== */}
			<section>
				<h2 style={styles.sectionTitle}>Skills</h2>
				{Object.entries(d.skills).map(([category, items], i) => (
					<div key={i} style={styles.skillRow}>
						<span style={styles.skillCategory}>{category}:</span>
						<span style={styles.skillItems}>{items.join(", ")}</span>
					</div>
				))}
			</section>
		</div>
	);
}

/** Inline styles for the resume web view — strictly black-on-white, no theme dependency */
const styles = {
	page: {
		padding: "24px 32px",
		fontFamily: "'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
		color: "#1a1a1a",
		fontSize: "11px",
		lineHeight: "1.5",
		position: "relative",
	},
	header: {
		display: "flex",
		alignItems: "center",
		gap: "16px",
		marginBottom: "4px",
	},
	profileImg: {
		width: "72px",
		height: "72px",
		borderRadius: "50%",
		objectFit: "cover",
		flexShrink: 0,
	},
	headerInfo: {
		flex: 1,
	},
	name: {
		fontSize: "22px",
		fontWeight: "700",
		letterSpacing: "0.5px",
		margin: 0,
		color: "#111",
	},
	subtitle: {
		fontSize: "10px",
		color: "#555",
		marginTop: "2px",
	},
	contactRow: {
		display: "flex",
		alignItems: "center",
		gap: "5px",
		marginTop: "2px",
		fontSize: "9.5px",
		color: "#333",
		flexWrap: "wrap",
	},
	dot: { color: "#999" },
	link: { color: "#2563eb", textDecoration: "none" },
	divider: {
		border: "none",
		borderTop: "1px solid #e5e5e5",
		margin: "6px 0",
	},
	sectionTitle: {
		fontSize: "12px",
		fontWeight: "700",
		textTransform: "uppercase",
		letterSpacing: "1.2px",
		color: "#111",
		margin: "0 0 4px 0",
	},
	body: {
		fontSize: "10px",
		color: "#333",
		margin: 0,
		lineHeight: "1.5",
	},
	expHeader: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "baseline",
	},
	expTitle: { fontWeight: "600", fontSize: "11px", color: "#111" },
	expPeriod: { fontSize: "9px", color: "#666", fontStyle: "italic" },
	expCompany: { fontSize: "10px", color: "#555", marginTop: "1px" },
	bullets: { margin: "2px 0 2px 14px", padding: 0, listStyleType: "disc" },
	bullet: { fontSize: "10px", color: "#333", marginBottom: "0px", lineHeight: "1.4" },
	techRow: { display: "flex", flexWrap: "wrap", gap: "3px", marginTop: "2px" },
	techBadge: {
		fontSize: "8px",
		color: "#555",
		backgroundColor: "#f3f4f6",
		padding: "1px 5px",
		borderRadius: "3px",
		border: "1px solid #e5e7eb",
	},
	certRow: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "baseline",
		marginBottom: "2px",
	},
	certTitle: { fontWeight: "600", fontSize: "9.5px", color: "#111" },
	certLink: { fontSize: "9px", color: "#2563eb", textDecoration: "none", flexShrink: 0 },
	projHeader: { display: "flex", justifyContent: "space-between", alignItems: "baseline" },
	projTitle: { fontWeight: "600", fontSize: "10px", color: "#111" },
	projLink: { fontSize: "9px", color: "#2563eb", textDecoration: "none" },
	projLinksRow: { display: "flex", alignItems: "center", gap: "2px", flexShrink: 0 },
	projLinkSep: { fontSize: "9px", color: "#999" },
	projLinkLabel: { fontSize: "9px", color: "#555", fontWeight: "500" },
	projDesc: { fontSize: "9px", color: "#444", margin: "1px 0 2px 0", lineHeight: "1.4" },
	skillRow: { marginBottom: "2px", fontSize: "10px" },
	skillCategory: { fontWeight: "600", color: "#222", marginRight: "4px" },
	skillItems: { color: "#444" },
};
