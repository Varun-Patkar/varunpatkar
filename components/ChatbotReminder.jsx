"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

// Simple debounce function
function debounce(func, wait) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

export default function ChatbotReminder() {
	const reminderShownThisSessionRef = useRef(false); // Renamed for clarity
	const toastIdRef = useRef(null); // Ref to store the current toast ID

	useEffect(() => {
		const checkScroll = () => {
			const chatbotOpened = localStorage.getItem("chatbotOpened") === "true";

			// If chatbot has ever been opened, stop checking and remove listener
			if (chatbotOpened) {
				window.removeEventListener("scroll", debouncedScrollCheck);
				// Dismiss any active reminder toast if chatbot is opened
				if (toastIdRef.current) {
					toast.dismiss(toastIdRef.current);
					toastIdRef.current = null;
				}
				return;
			}

			// Only proceed if reminder hasn't been shown *in this session*
			if (!reminderShownThisSessionRef.current) {
				const scrollPosition = window.innerHeight + window.scrollY;
				const pageHeight = document.body.offsetHeight;
				const triggerPoint = pageHeight - 200; // Show reminder 200px from bottom

				if (scrollPosition >= triggerPoint) {
					// Dismiss previous toast if any exists before showing a new one
					if (toastIdRef.current) {
						toast.dismiss(toastIdRef.current);
					}

					// Show the new toast and store its ID
					const newToastId = toast.info("Try My AI Assistant!", {
						description: (
							<div>
								<p className="mb-2">
									Click the chat bubble to ask me about my portfolio!
								</p>
								<p className="text-xs text-amber-600 dark:text-amber-400 mb-1">
									<strong>Note:</strong> This runs locally in your browser &
									requires a good GPU.
								</p>
								<p className="text-xs text-muted-foreground">
									The first load takes time to download the AI model (~1-2GB).
									Subsequent loads are faster due to caching.
								</p>
							</div>
						),
						duration: 10000, // Auto-close after 10 seconds
						position: "bottom-center",
						closeButton: true, // Use the default 'X' close button
						// Add onDismiss callback to clear the ref
						onDismiss: () => {
							if (toastIdRef.current === newToastId) {
								toastIdRef.current = null;
							}
						},
						// Add onAutoClose callback to clear the ref
						onAutoClose: () => {
							if (toastIdRef.current === newToastId) {
								toastIdRef.current = null;
							}
						},
					});
					toastIdRef.current = newToastId; // Store the new toast ID
					reminderShownThisSessionRef.current = true; // Mark as shown *in this session*
					// Don't remove the listener here, only if chatbotOpened becomes true
				}
			}
		};

		const debouncedScrollCheck = debounce(checkScroll, 200);

		// Initial check
		checkScroll();

		// Add listener only if chatbot hasn't been opened yet
		if (localStorage.getItem("chatbotOpened") !== "true") {
			window.addEventListener("scroll", debouncedScrollCheck);
		}

		return () => {
			window.removeEventListener("scroll", debouncedScrollCheck);
			// Ensure toast is dismissed on component unmount if it exists
			if (toastIdRef.current) {
				toast.dismiss(toastIdRef.current);
			}
		};
	}, []); // Empty dependency array

	return null;
}
