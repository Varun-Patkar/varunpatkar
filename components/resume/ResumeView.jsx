"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import ResumePageContent from "./ResumePage";
import ResumeDownload from "./ResumeDownload";

/** Fixed A4 width in px at 96 DPI (210mm) */
const A4_W = 794;

/**
 * ResumeView — Parent wrapper for the resume page.
 * The A4 resume is rendered at a fixed 794px width and uses CSS `zoom`
 * to fit within the viewport. Text layout never reflows — it shrinks as a unit.
 */
export default function ResumeView() {
	const resumeRef = useRef(null);
	const outerRef = useRef(null);
	const [isExporting, setIsExporting] = useState(false);
	const [zoom, setZoom] = useState(1);

	/** Recalculate zoom factor based on available width */
	const updateZoom = useCallback(() => {
		if (!outerRef.current) return;
		const available = outerRef.current.clientWidth - 32;
		setZoom(Math.min(available / A4_W, 1));
	}, []);

	useEffect(() => {
		updateZoom();
		window.addEventListener("resize", updateZoom);
		return () => window.removeEventListener("resize", updateZoom);
	}, [updateZoom]);

	return (
		<div
			ref={outerRef}
			style={{
				minHeight: "100vh",
				backgroundColor: "#eaeaea",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				padding: "20px 16px",
			}}
		>
			{/* Back Home link */}
			<div style={{ width: `${A4_W}px`, maxWidth: "100%", marginBottom: "12px", zoom }}>
				<Link
					href="/"
					style={{
						display: "inline-flex",
						alignItems: "center",
						gap: "6px",
						fontSize: "14px",
						fontWeight: "500",
						color: "#374151",
						textDecoration: "none",
					}}
				>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<polyline points="15 18 9 12 15 6" />
					</svg>
					Back to Portfolio
				</Link>
			</div>

			{/* Fixed-width A4 container, shrunk with CSS zoom */}
			<div
				ref={resumeRef}
				style={{
					width: `${A4_W}px`,
					background: "#ffffff",
					boxShadow: "0 2px 20px rgba(0,0,0,0.12)",
					zoom,
				}}
			>
				<ResumePageContent />
			</div>

			{/* Floating Export Button */}
			<ResumeDownload isExporting={isExporting} setIsExporting={setIsExporting} />
		</div>
	);
}
