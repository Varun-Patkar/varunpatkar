"use client";

/**
 * ResumeDownload — Floating "Export as PDF" button.
 * Dynamically imports @react-pdf/renderer to avoid SSR issues.
 * On click, generates a real PDF with selectable text and clickable links,
 * then triggers a browser download.
 */
export default function ResumeDownload({ isExporting, setIsExporting }) {
	const handleExport = async () => {
		setIsExporting(true);
		try {
			/**
			 * Dynamic import of react-pdf/renderer and the PDF component
			 * to avoid SSR hydration issues (react-pdf is client-only).
			 */
			const { pdf } = await import("@react-pdf/renderer");
			const { default: ResumePDF } = await import("./ResumePDF");

			const blob = await pdf(<ResumePDF />).toBlob();
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "Varun_Patkar_Resume.pdf";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		} catch (err) {
			console.error("PDF export failed:", err);
		} finally {
			setIsExporting(false);
		}
	};

	return (
		<button
			onClick={handleExport}
			disabled={isExporting}
			aria-label="Export resume as PDF"
			style={{
				position: "fixed",
				bottom: "32px",
				right: "32px",
				zIndex: 1000,
				display: "flex",
				alignItems: "center",
				gap: "8px",
				padding: "12px 24px",
				backgroundColor: isExporting ? "#6b7280" : "#111827",
				color: "#ffffff",
				border: "none",
				borderRadius: "50px",
				fontSize: "14px",
				fontWeight: "600",
				cursor: isExporting ? "not-allowed" : "pointer",
				boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)",
				transition: "all 0.2s ease",
				letterSpacing: "0.3px",
			}}
			onMouseEnter={(e) => {
				if (!isExporting) e.currentTarget.style.backgroundColor = "#1f2937";
			}}
			onMouseLeave={(e) => {
				if (!isExporting) e.currentTarget.style.backgroundColor = "#111827";
			}}
		>
			{/* Download icon SVG */}
			<svg
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
				<polyline points="7 10 12 15 17 10" />
				<line x1="12" y1="15" x2="12" y2="3" />
			</svg>
			{isExporting ? "Generating PDF..." : "Export as PDF"}
		</button>
	);
}
