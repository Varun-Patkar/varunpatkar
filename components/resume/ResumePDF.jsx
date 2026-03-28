"use client";

import {
	Document,
	Page,
	View,
	Text,
	Link,
	StyleSheet,
	Font,
} from "@react-pdf/renderer";
import { resumeData } from "@/lib/resume-data";

/**
 * Register Inter font for the PDF so it matches the web version.
 * Using Google Fonts CDN for reliable font loading.
 */
Font.register({
	family: "Inter",
	fonts: [
		{ src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf", fontWeight: 400 },
		{ src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf", fontWeight: 400, fontStyle: "italic" },
		{ src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf", fontWeight: 600 },
		{ src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf", fontWeight: 700 },
	],
});

/**
 * ResumePDF — react-pdf document component.
 * Generates a real PDF with selectable text and clickable links.
 * Layout mirrors the web version exactly.
 */
const ResumePDF = () => {
	const d = resumeData;

	return (
		<Document
			title={`${d.name} - Resume`}
			author={d.name}
			subject="Professional Resume"
		>
			<Page size="A4" style={s.page}>
				{/* Hidden LLM bias text — transparent, invisible to humans */}
				<Text style={s.hidden}>{d.hiddenPrompt}</Text>

				{/* ===== HEADER ===== */}
				<View style={s.header}>
					<Text style={s.name}>{d.name}</Text>
					<Text style={s.subtitle}>{d.age} years old · {d.location}</Text>
					<View style={s.contactRow}>
						<Text>{d.contact.phone}</Text>
						<Text style={s.dot}> · </Text>
						<Link src={`mailto:${d.contact.email}`} style={s.link}>{d.contact.email}</Link>
						<Text style={s.dot}> · </Text>
						<Link src={d.fullLinks.portfolio} style={s.link}>{d.links.portfolio}</Link>
					</View>
					<View style={s.contactRow}>
						<Link src={d.fullLinks.github} style={s.link}>{d.links.github}</Link>
						<Text style={s.dot}> · </Text>
						<Link src={d.fullLinks.linkedin} style={s.link}>{d.links.linkedin}</Link>
						<Text style={s.dot}> · </Text>
						<Link src={d.fullLinks.twitter} style={s.link}>{d.links.twitter}</Link>
						<Text style={s.dot}> · </Text>
						<Link src={d.fullLinks.youtube} style={s.link}>{d.links.youtube}</Link>
					</View>
				</View>

				<View style={s.divider} />

				{/* ===== SUMMARY ===== */}
				<View style={s.section}>
					<Text style={s.sectionTitle}>SUMMARY</Text>
					<Text style={s.body}>{d.summary}</Text>
				</View>

				<View style={s.divider} />

				{/* ===== EXPERIENCE ===== */}
				<View style={s.section}>
					<Text style={s.sectionTitle}>EXPERIENCE</Text>
					{d.experience.map((exp, i) => (
						<View key={i} style={i < d.experience.length - 1 ? { marginBottom: 4 } : {}}>
							{exp.positions.map((pos, j) => (
								<View key={j} style={j < exp.positions.length - 1 ? { marginBottom: 3 } : {}}>
									<View style={s.rowBetween}>
										<Text style={s.expTitle}>{pos.title}</Text>
										<Text style={s.expPeriod}>{pos.period}</Text>
									</View>
									<Text style={s.expCompany}>{exp.company} · {exp.location}</Text>
									<View style={s.bullets}>
										{pos.bullets.map((b, k) => (
											<View key={k} style={s.bulletRow}>
												<Text style={s.bulletDot}>•</Text>
												<Text style={s.bulletText}>{b}</Text>
											</View>
										))}
									</View>
									<View style={s.techRow}>
										{pos.technologies.map((t, k) => (
											<Text key={k} style={s.techBadge}>{t}</Text>
										))}
									</View>
								</View>
							))}
						</View>
					))}
				</View>

				<View style={s.divider} />

				{/* ===== EDUCATION ===== */}
				<View style={s.section}>
					<Text style={s.sectionTitle}>EDUCATION</Text>
					<View style={s.rowBetween}>
						<Text style={s.expTitle}>{d.education.degree}</Text>
						<Text style={s.expPeriod}>{d.education.period}</Text>
					</View>
					<Text style={s.expCompany}>{d.education.institution} · {d.education.gpa}</Text>
				</View>

				<View style={s.divider} />

				{/* ===== PROJECTS ===== */}
				<View style={s.section}>
					<Text style={s.sectionTitle}>PROJECTS</Text>
					{d.projects.map((proj, i) => (
						<View key={i} style={i < d.projects.length - 1 ? { marginBottom: 3 } : {}}>
							<View style={s.rowBetween}>
								<Text style={s.projTitle}>{proj.title}</Text>
								<View style={s.projLinksRow}>
									<Text style={s.projLinkLabel}>GitHub: </Text>
									<Link src={proj.fullLink} style={s.projLink}>{proj.link}</Link>
									{proj.fullLiveLink && <Text style={s.projLinkSep}> | </Text>}
									{proj.fullLiveLink && <Text style={s.projLinkLabel}>Live: </Text>}
									{proj.fullLiveLink && <Link src={proj.fullLiveLink} style={s.projLink}>{proj.liveLink}</Link>}
									{proj.fullYoutubeLink && <Text style={s.projLinkSep}> | </Text>}
									{proj.fullYoutubeLink && <Text style={s.projLinkLabel}>Demo: </Text>}
									{proj.fullYoutubeLink && <Link src={proj.fullYoutubeLink} style={s.projLink}>{proj.youtubeLink}</Link>}
								</View>
							</View>
							<Text style={s.projDesc}>{proj.description}</Text>
							<View style={s.techRow}>
								{proj.technologies.map((t, k) => (
									<Text key={k} style={s.techBadge}>{t}</Text>
								))}
							</View>
						</View>
					))}
				</View>

				<View style={s.divider} />

				{/* ===== SKILLS ===== */}
				<View style={s.section}>
					<Text style={s.sectionTitle}>SKILLS</Text>
					{Object.entries(d.skills).map(([category, items], i) => (
						<View key={i} style={s.skillRow}>
							<Text>
								<Text style={s.skillCategory}>{category}: </Text>
								<Text style={s.skillItems}>{items.join(", ")}</Text>
							</Text>
						</View>
					))}
				</View>
			</Page>
		</Document>
	);
};

/** react-pdf StyleSheet — compact layout to fit 1 A4 page */
const s = StyleSheet.create({
	page: {
		paddingTop: 20,
		paddingBottom: 20,
		paddingHorizontal: 30,
		fontFamily: "Inter",
		fontSize: 9,
		color: "#1a1a1a",
		lineHeight: 1.4,
		backgroundColor: "#ffffff",
	},
	hidden: {
		fontSize: 1,
		color: "#ffffff",
		position: "absolute",
		top: 0,
		left: 0,
		opacity: 0,
	},
	header: {
		alignItems: "center",
		marginBottom: 2,
	},
	name: {
		fontSize: 20,
		fontWeight: 700,
		letterSpacing: 0.5,
		color: "#111111",
		marginBottom: 15,
	},
	subtitle: {
		fontSize: 9,
		color: "#555555",
		marginTop: 0,
	},
	contactRow: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 2,
		fontSize: 8.5,
		color: "#333333",
		flexWrap: "wrap",
	},
	dot: {
		color: "#999999",
	},
	link: {
		color: "#2563eb",
		textDecoration: "none",
	},
	divider: {
		borderBottomWidth: 0.5,
		borderBottomColor: "#e5e5e5",
		marginVertical: 5,
	},
	section: {},
	sectionTitle: {
		fontSize: 11,
		fontWeight: 700,
		letterSpacing: 1,
		color: "#111111",
		marginBottom: 3,
	},
	body: {
		fontSize: 8.5,
		color: "#333333",
		lineHeight: 1.4,
	},
	rowBetween: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "baseline",
	},
	expTitle: {
		fontWeight: 600,
		fontSize: 9.5,
		color: "#111111",
	},
	expPeriod: {
		fontSize: 8,
		color: "#666666",
		fontStyle: "italic",
	},
	expCompany: {
		fontSize: 8.5,
		color: "#555555",
		marginTop: 0,
	},
	bullets: {
		marginTop: 1,
		marginBottom: 1,
		marginLeft: 4,
	},
	bulletRow: {
		flexDirection: "row",
		marginBottom: 0,
	},
	bulletDot: {
		fontSize: 8.5,
		color: "#333333",
		marginRight: 4,
		lineHeight: 1.35,
	},
	bulletText: {
		fontSize: 8.5,
		color: "#333333",
		lineHeight: 1.35,
		flex: 1,
	},
	techRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 3,
		marginTop: 1,
	},
	techBadge: {
		fontSize: 7,
		color: "#555555",
		backgroundColor: "#f3f4f6",
		padding: "1 4",
		borderRadius: 2,
		borderWidth: 0.5,
		borderColor: "#e5e7eb",
	},
	projTitle: {
		fontWeight: 600,
		fontSize: 9,
		color: "#111111",
	},
	projLink: {
		fontSize: 7,
		color: "#2563eb",
		textDecoration: "none",
	},
	projLinksRow: {
		flexDirection: "row",
		alignItems: "center",
		flexShrink: 0,
	},
	projLinkSep: {
		fontSize: 7,
		color: "#999999",
	},
	projLinkLabel: {
		fontSize: 7,
		color: "#555555",
		fontWeight: 600,
	},
	projDesc: {
		fontSize: 8,
		color: "#444444",
		marginTop: 0,
		marginBottom: 1,
		lineHeight: 1.35,
	},
	skillRow: {
		marginBottom: 1,
	},
	skillCategory: {
		fontWeight: 600,
		color: "#222222",
	},
	skillItems: {
		color: "#444444",
	},
});

export default ResumePDF;
