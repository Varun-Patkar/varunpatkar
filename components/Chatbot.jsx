"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { CreateMLCEngine } from "@mlc-ai/web-llm";
import { useTheme } from "next-themes"; // Import useTheme
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardHeader,
	CardFooter,
} from "@/components/ui/card";
import {
	RotateCcwIcon,
	SendIcon,
	BotIcon,
	UserIcon,
	SparklesIcon, // Added for visual flair
	CheckIcon,
	XIcon as CloseIcon, // Rename XIcon import
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { portfolioData, generateSystemPrompt } from "@/lib/portfolio-data"; // Import data
import ReactMarkdown from "react-markdown"; // Import ReactMarkdown

// --- Configuration ---
const CHAT_MODEL = "Llama-3.2-3B-Instruct-q4f16_1-MLC"; // Changed model
const INITIAL_GREETING = `Hello! I'm Varun's AI assistant. Feel free to ask me anything about his skills, experience, or projects based on his portfolio. How can I help you today?`;
const CONTEXT_WINDOW_SIZE = 3; // Number of recent messages to include as context
const SECTION_IDS = [
	"hero",
	"about",
	"skills",
	"projects",
	"experience",
	"education",
	"contact",
]; // IDs of sections to track
const SUGGESTIONS = [
	{ text: "Show me his GitHub", trigger: "Show me his GitHub" },
	{ text: "Scroll to Projects", trigger: "Scroll to Projects" },
	{ text: "Switch to Dark Mode", trigger: "Switch to Dark Mode" },
	{ text: "What skills does he have?", trigger: "What skills does he have?" },
	{ text: "Contact Varun", trigger: "I want to contact Varun" },
];
const CONTACT_FORM_IDS = {
	name: "contact-name",
	email: "contact-email",
	subject: "contact-subject",
	message: "contact-message",
	submitButton: "contact-submit",
};
const AGENTIC_RESPONSE_PLACEHOLDER = "Building Agentic Response...";
// --- End Configuration ---

// --- Helper Functions ---
const scrollToSection = (sectionId) => {
	const element = document.getElementById(sectionId);
	if (element) {
		element.scrollIntoView({ behavior: "smooth", block: "start" });
		return true; // Indicate success
	}
	return false; // Indicate failure
};

const openLink = (url) => {
	if (url) {
		window.open(url, "_blank", "noopener,noreferrer");
		return true;
	}
	return false;
};

export default function Chatbot() {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState([]);
	const [userInput, setUserInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [loadingMessage, setLoadingMessage] = useState(
		"Initializing AI Assistant..."
	);
	const [engine, setEngine] = useState(null);
	const [isReady, setIsReady] = useState(false);
	const [error, setError] = useState(null);
	const [currentSection, setCurrentSection] = useState("hero"); // State to track current section
	const [pendingAction, setPendingAction] = useState(null); // State for pending action confirmation
	const messagesEndRef = useRef(null);
	const isInitializing = useRef(false); // Prevent multiple initializations
	const { setTheme, resolvedTheme } = useTheme(); // Get theme functions
	const messagesRef = useRef(messages); // <<< Move messagesRef declaration here

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(scrollToBottom, [messages]);

	// --- Section Tracking ---
	useEffect(() => {
		const handleScroll = () => {
			let activeSection = "hero"; // Default
			const scrollPosition = window.scrollY + window.innerHeight / 2; // Midpoint of viewport

			for (const id of SECTION_IDS) {
				const element = document.getElementById(id);
				if (element) {
					const elementTop = element.offsetTop;
					const elementBottom = elementTop + element.offsetHeight;
					// Check if the midpoint of the viewport is within the section bounds
					if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
						activeSection = id;
						break; // Found the active section
					}
					// Fallback if slightly above the first section
					if (scrollPosition < elementTop && id === SECTION_IDS[0]) {
						activeSection = id;
						break;
					}
				}
			}
			setCurrentSection(activeSection);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll(); // Initial check

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// --- WebLLM Initialization ---
	const initializeWebLLM = useCallback(async () => {
		if (isInitializing.current || engine) return; // Already initializing or initialized
		isInitializing.current = true;
		setIsLoading(true);
		setError(null);
		setLoadingMessage("Initializing AI Assistant...");
		setIsReady(false); // Ensure ready is false initially

		try {
			const initProgressCallback = (report) => {
				setLoadingMessage(report.text);
			};

			const loadedEngine = await CreateMLCEngine(CHAT_MODEL, {
				initProgressCallback,
			});

			setEngine(loadedEngine);
			setMessages([{ role: "assistant", content: INITIAL_GREETING }]);
			setIsReady(true); // Set ready only on full success
			setLoadingMessage("Ready!");
			console.log("WebLLM Engine Initialized");
		} catch (err) {
			console.error("WebLLM Initialization Error:", err);
			setError(
				`Failed to initialize AI Assistant: ${err.message}. Please try refreshing.`
			);
			setMessages([
				{
					role: "assistant",
					content: `Sorry, I couldn't start up correctly. Please try refreshing the page. Error: ${err.message}`,
				},
			]);
			setEngine(null); // Ensure engine state is null on error
			setIsReady(false); // Explicitly set not ready on error
		} finally {
			setIsLoading(false);
			isInitializing.current = false;
		}
	}, [engine]); // Dependency on engine to prevent re-running if already set

	// --- Event Handlers ---
	const handleOpenChat = () => {
		setIsOpen(true);
		if (!engine && !isInitializing.current) {
			initializeWebLLM(); // Initialize on first open
		}
	};

	const handleCloseChat = () => {
		setIsOpen(false);
	};

	const handleResetChat = async () => {
		// Attempt to interrupt if engine exists and might be loading
		if (engine && isLoading) {
			try {
				await engine.interrupt();
				console.log("Interrupted ongoing generation during reset.");
			} catch (interruptErr) {
				console.error("Error interrupting engine during reset:", interruptErr);
				// Continue with reset anyway
			}
		}

		// Reset state
		setIsLoading(true); // Show resetting state briefly
		setLoadingMessage("Resetting chat...");
		setError(null);
		setPendingAction(null);
		setMessages([{ role: "assistant", content: INITIAL_GREETING }]);
		console.log("Chat Reset (Local State Cleared)");

		// Re-evaluate readiness based on engine existence
		// This ensures isReady is true only if the engine was successfully initialized previously
		setIsReady(!!engine);

		// Short delay for visual feedback before clearing loading state
		setTimeout(() => {
			setIsLoading(false);
			setLoadingMessage("");
		}, 300);
	};

	// Function to handle user confirmation (Yes/No) - ADJUSTED
	const handleConfirmation = (confirm) => {
		if (!pendingAction) return;

		// Destructure known properties, the rest (form data) remain in pendingAction
		const { type, target, name } = pendingAction;
		const originalConfirmationMessageIndex = messages.length - 1;

		// Clear pending action immediately
		setPendingAction(null);

		// Update the confirmation message (no change here)
		setMessages((prev) => {
			const updated = [...prev];
			if (updated[originalConfirmationMessageIndex]) {
				updated[originalConfirmationMessageIndex] = {
					...updated[originalConfirmationMessageIndex],
					isConfirmation: false, // Remove buttons
					content:
						type === "contact_form" && confirm
							? "Processing form submission..."
							: type === "contact_form" && !confirm
							? "Okay, cancelled form submission."
							: updated[originalConfirmationMessageIndex].content.replace(
									/\n\nShould I .* send it\?/,
									""
							  ), // Remove question for other actions
				};
			}
			return updated;
		});

		// --- Simplified Action Execution ---
		if (confirm) {
			let success = false;
			let successMessage = "";
			// Remove console.log(payload, pendingAction); - payload doesn't exist here

			if (type === "scroll") {
				// ... existing scroll logic ...
				success = scrollToSection(target);
				successMessage = success
					? `Okay, scrolling to the ${target} section.`
					: `Sorry, I couldn't find the ${target} section.`;
			} else if (type === "theme") {
				// ... existing theme logic ...
				setTheme(target);
				success = true;
				successMessage = `Okay, switching to ${target} mode.`;
			} else if (type === "link") {
				// ... existing link logic ...
				success = openLink(target);
				successMessage = success
					? `Okay, opening Varun's ${name} profile in a new tab.`
					: `Sorry, I couldn't open the link for ${name}.`;
			} else if (type === "contact_form") {
				// Check only for type, payload data is in pendingAction
				// Access form data directly from the original pendingAction object
				const formData = pendingAction;
				console.log("Confirmed contact_form. Form Data:", formData);
				successMessage =
					"Okay, I'll scroll to the contact form and fill in the details. Please review and click 'Send Message' yourself to submit."; // Adjusted message

				// Scroll to contact section
				const scrolled = scrollToSection("contact");
				if (scrolled) {
					// Wait for scroll animation
					setTimeout(() => {
						try {
							// ... get form elements ...
							const nameInput = document.getElementById(CONTACT_FORM_IDS.name);
							const emailInput = document.getElementById(
								CONTACT_FORM_IDS.email
							);
							const subjectInput = document.getElementById(
								CONTACT_FORM_IDS.subject
							);
							const messageTextarea = document.getElementById(
								CONTACT_FORM_IDS.message
							);
							const submitButton = document.getElementById(
								CONTACT_FORM_IDS.submitButton
							);

							// ... dispatchInputEvent helper ...
							const dispatchInputEvent = (element, value) => {
								const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
									window.HTMLInputElement.prototype,
									"value"
								)?.set;
								const nativeTextareaValueSetter =
									Object.getOwnPropertyDescriptor(
										window.HTMLTextAreaElement.prototype,
										"value"
									)?.set;

								if (
									element.tagName === "TEXTAREA" &&
									nativeTextareaValueSetter
								) {
									nativeTextareaValueSetter.call(element, value);
								} else if (nativeInputValueSetter) {
									nativeInputValueSetter.call(element, value);
								} else {
									element.value = value;
								}
								element.dispatchEvent(new Event("input", { bubbles: true }));
								element.dispatchEvent(new Event("change", { bubbles: true }));
							};

							// Use formData directly
							if (nameInput) dispatchInputEvent(nameInput, formData.name || "");
							if (emailInput)
								dispatchInputEvent(emailInput, formData.email || "");
							if (subjectInput)
								dispatchInputEvent(subjectInput, formData.subject || "");
							if (messageTextarea)
								dispatchInputEvent(messageTextarea, formData.message || "");

							console.log("Form fields populated.");
							success = true; // Mark as success (filling part)

							// --- Simulate Submit Click ---
							if (submitButton) {
								console.log("Clicking submit button...");
								submitButton.click();
								successMessage =
									"Okay, I've filled and attempted to submit the contact form for you.";
							} else {
								console.error("Submit button not found after filling fields.");
								successMessage =
									"Okay, I've filled the form, but couldn't find the submit button. Please click it manually.";
							}
							// --- End Simulate Submit Click ---
						} catch (err) {
							// ... error handling ...
							console.error("Error filling contact form:", err);
							successMessage =
								"Sorry, I encountered an error while trying to fill the form.";
							success = false;
						} finally {
							// ... add final status message ...
							setMessages((prev) => [
								...prev,
								{ role: "assistant", content: successMessage },
							]);
						}
					}, 800); // Delay to allow scrolling
				} else {
					// ... scroll failed handling ...
					successMessage =
						"Sorry, I couldn't scroll to the contact section to fill the form.";
					success = false;
					setMessages((prev) => [
						...prev,
						{ role: "assistant", content: successMessage },
					]);
				}
				// Prevent adding the generic message below for this async case
				return;
			} else {
				// ... handle unknown action type ...
				success = false;
				successMessage = "Sorry, I couldn't perform that action right now.";
			}

			// Add the success/failure message for non-async actions
			setMessages((prev) => [
				...prev,
				{
					role: "assistant",
					content: success
						? successMessage
						: `Sorry, I couldn't perform that action right now.`,
				},
			]);
		} else {
			// --- User denied confirmation ---
			let denialMessage = "Okay, I won't do that.";

			if (type === "contact_form") {
				// ... existing denial logic for contact_form (no changes needed here as it doesn't use payload data) ...
				denialMessage =
					"Okay, I won't submit the form. I'll clear the subject and message I drafted and scroll you to the contact section so you can make any edits or fill it out yourself.";

				const scrolled = scrollToSection("contact");
				if (scrolled) {
					setTimeout(() => {
						try {
							const subjectInput = document.getElementById(
								CONTACT_FORM_IDS.subject
							);
							const messageTextarea = document.getElementById(
								CONTACT_FORM_IDS.message
							);

							const dispatchInputEvent = (element, value) => {
								const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
									window.HTMLInputElement.prototype,
									"value"
								)?.set;
								const nativeTextareaValueSetter =
									Object.getOwnPropertyDescriptor(
										window.HTMLTextAreaElement.prototype,
										"value"
									)?.set;

								if (
									element.tagName === "TEXTAREA" &&
									nativeTextareaValueSetter
								) {
									nativeTextareaValueSetter.call(element, value);
								} else if (nativeInputValueSetter) {
									nativeInputValueSetter.call(element, value);
								} else {
									element.value = value;
								}
								element.dispatchEvent(new Event("input", { bubbles: true }));
								element.dispatchEvent(new Event("change", { bubbles: true }));
							};

							if (subjectInput) dispatchInputEvent(subjectInput, "");
							if (messageTextarea) dispatchInputEvent(messageTextarea, "");

							console.log("Subject and message fields cleared.");
						} catch (err) {
							console.error("Error clearing contact form fields:", err);
							denialMessage +=
								" (Though I encountered an issue clearing the fields).";
						} finally {
							setMessages((prev) => [
								...prev,
								{ role: "assistant", content: denialMessage },
							]);
						}
					}, 800);
				} else {
					denialMessage =
						"Okay, I won't submit the form. I couldn't scroll to the contact section, but you can find it to make edits yourself.";
					setMessages((prev) => [
						...prev,
						{ role: "assistant", content: denialMessage },
					]);
				}
				return;
			}

			// Add the denial message for non-async actions
			setMessages((prev) => [
				...prev,
				{ role: "assistant", content: denialMessage },
			]);
		}
	};

	// --- Core LLM Interaction Logic ---
	const sendMessageToLLM = useCallback(
		async (userMessageContent) => {
			// userMessageContent is the text from the user input/suggestion
			if (!engine) {
				// ... (no change) ...
				setError("AI Assistant is not ready yet.");
				setMessages((prev) => [
					...prev,
					{
						role: "assistant",
						content: "I'm still starting up, please wait a moment!",
					},
				]);
				setIsLoading(false);
				return;
			}

			setIsLoading(true);
			setLoadingMessage("Thinking...");
			setError(null);
			let actionTriggeredByLLM = false;
			let placeholderIndex = -1;

			try {
				// Get previous messages snapshot, excluding system messages
				const previousMessages = messagesRef.current
					.filter((msg) => msg.role !== "system")
					.slice(-(CONTEXT_WINDOW_SIZE - 1)); // Get N-1 previous messages for context

				const systemPrompt = generateSystemPrompt(
					currentSection,
					resolvedTheme
				);

				// Construct the messages array for the API call
				// Ensure it always ends with the current user message
				const messagesForAPI = [
					{ role: "system", content: systemPrompt },
					...previousMessages, // Add the context window
					{ role: "user", content: userMessageContent }, // Add the *current* user message last
				];
				// --- Start Streaming ---
				const chunks = await engine.chat.completions.create({
					stream: true,
					messages: messagesForAPI,
					temperature: 0.7,
					max_gen_len: 512,
					stream_options: { include_usage: true },
				});

				let reply = "";
				let isPotentiallyAction = false; // Flag to track if reply might be an action
				setMessages((prev) => {
					placeholderIndex = prev.length;
					return [...prev, { role: "assistant", content: "" }]; // Start with empty placeholder
				});

				for await (const chunk of chunks) {
					const deltaContent = chunk.choices[0]?.delta?.content || "";
					if (deltaContent) {
						reply += deltaContent;

						// Check if it starts with [ACTION: early on
						if (!isPotentiallyAction && reply.length < 10) {
							isPotentiallyAction = reply.startsWith("[ACTION:");
						}

						// Update message content based on whether it's potentially an action
						const displayContent = isPotentiallyAction
							? AGENTIC_RESPONSE_PLACEHOLDER
							: reply;

						setMessages((prev) => {
							const updatedMessages = [...prev];
							if (
								placeholderIndex >= 0 &&
								placeholderIndex < updatedMessages.length &&
								updatedMessages[placeholderIndex]?.role === "assistant"
							) {
								updatedMessages[placeholderIndex] = {
									...updatedMessages[placeholderIndex],
									content: displayContent, // Show placeholder or actual reply
								};
							}
							return updatedMessages;
						});
					}
					if (chunk.usage) {
						console.log("Usage:", chunk.usage);
					}
				}
				// --- End Streaming ---

				// --- Post-Stream Processing: Check for Action Trigger ---
				// Reset flag as we now have the full reply
				actionTriggeredByLLM = false;
				if (reply.startsWith("[ACTION:")) {
					actionTriggeredByLLM = true; // Assume true initially, invalidate on error
					const actionString = reply.slice(8, -1);
					const firstColonIndex = actionString.indexOf(":");
					let type = "";
					let payload = null; // Use payload for structured data
					let confirmationMessage = "";
					let clarificationMessage = ""; // <<< Add variable for clarification

					if (firstColonIndex !== -1) {
						type = actionString.substring(0, firstColonIndex);
						const rest = actionString.substring(firstColonIndex + 1);

						if (type === "scroll" && SECTION_IDS.includes(rest)) {
							confirmationMessage = `Do you want me to scroll to the "${rest}" section?`;
							payload = { target: rest }; // Store target in payload
						} else if (type === "theme" && ["light", "dark"].includes(rest)) {
							// --- Theme Check Logic ---
							if (rest === resolvedTheme) {
								// Already in the requested mode
								const otherTheme = resolvedTheme === "dark" ? "light" : "dark";
								clarificationMessage = `You're already in ${resolvedTheme} mode. Did you mean to switch to ${otherTheme} mode?`;
								actionTriggeredByLLM = false; // Don't proceed with confirmation
								payload = null; // Ensure no payload is set
							} else {
								// Different mode requested, proceed with confirmation
								confirmationMessage = `Do you want to switch to ${rest} mode?`;
								payload = { target: rest };
							}
							// --- End Theme Check Logic ---
						} else if (type === "link") {
							const lastColonIndex = rest.lastIndexOf(":");
							if (lastColonIndex !== -1 && lastColonIndex > 0) {
								const target = rest.substring(0, lastColonIndex);
								const name = rest.substring(lastColonIndex + 1);
								if (target.startsWith("http:") || target.startsWith("https:")) {
									confirmationMessage = `Do you want me to open Varun's ${name} profile in a new tab?`;
									payload = { target, name }; // Store target and name
								} else {
									console.error("Invalid link URL format:", target);
									actionTriggeredByLLM = false; // Invalidate action
								}
							} else {
								console.error("Invalid link action format:", rest);
								actionTriggeredByLLM = false; // Invalidate action
							}
						} else if (type === "contact_form") {
							// New: Parse contact form data
							try {
								const formData = JSON.parse(rest);
								if (formData.name && formData.email && formData.message) {
									// Basic validation
									payload = formData;
									// Include draft in confirmation
									confirmationMessage = `I've drafted the following message based on our conversation:\n\n**Subject:** ${
										formData.subject || "(No Subject Drafted)"
									}\n**Message:**\n${
										formData.message
									}\n\nShould I fill the contact form with this information and send it?`;
								} else {
									console.error(
										"Invalid contact_form payload structure:",
										formData
									);
									actionTriggeredByLLM = false;
								}
							} catch (jsonError) {
								console.error(
									"Failed to parse contact_form JSON:",
									jsonError,
									rest
								);
								actionTriggeredByLLM = false;
							}
						} else {
							// Unknown action type
							console.error("Unknown action type:", type);
							actionTriggeredByLLM = false;
						}
					} else {
						// Invalid format (no colon)
						console.error("Invalid action format (no colon):", actionString);
						actionTriggeredByLLM = false;
					}

					// --- Update state based on parsed action OR clarification ---
					if (clarificationMessage) {
						// Update message with clarification question
						setMessages((prev) => {
							const updatedMessages = [...prev];
							if (
								placeholderIndex >= 0 &&
								placeholderIndex < updatedMessages.length &&
								updatedMessages[placeholderIndex]?.role === "assistant"
							) {
								updatedMessages[placeholderIndex] = {
									...updatedMessages[placeholderIndex],
									content: clarificationMessage,
									isConfirmation: false, // Ensure no confirmation buttons
								};
							}
							return updatedMessages;
						});
					} else if (actionTriggeredByLLM && payload) {
						// Proceed with confirmation for valid actions
						console.log(
							"Setting pending action with type:",
							type,
							"and payload:",
							payload
						);
						setPendingAction({ type, ...payload });
						setMessages((prev) => {
							const updatedMessages = [...prev];
							if (
								placeholderIndex >= 0 &&
								placeholderIndex < updatedMessages.length &&
								updatedMessages[placeholderIndex]?.role === "assistant"
							) {
								updatedMessages[placeholderIndex] = {
									...updatedMessages[placeholderIndex],
									content: confirmationMessage,
									isConfirmation: true,
								};
							}
							return updatedMessages;
						});
					} else {
						// Action parsing failed or invalid action (or theme clarification handled above)
						if (!clarificationMessage) {
							// Only show error if not handled by clarification
							actionTriggeredByLLM = false; // Ensure loading state is handled correctly
							console.error(
								"Action processing failed or invalid action. Raw reply:",
								reply
							);
							setMessages((prev) => {
								const updatedMessages = [...prev];
								if (
									placeholderIndex >= 0 &&
									placeholderIndex < updatedMessages.length &&
									updatedMessages[placeholderIndex]?.role === "assistant"
								) {
									updatedMessages[placeholderIndex] = {
										...updatedMessages[placeholderIndex],
										content:
											"Sorry, I received an unexpected response. Please try again.",
									};
								}
								return updatedMessages;
							});
						}
					}
				} else if (!reply) {
					// Handle empty reply after streaming
					setMessages((prev) => {
						const updatedMessages = [...prev];
						if (
							placeholderIndex >= 0 &&
							placeholderIndex < updatedMessages.length &&
							updatedMessages[placeholderIndex]?.role === "assistant"
						) {
							updatedMessages[placeholderIndex] = {
								...updatedMessages[placeholderIndex],
								content: "Sorry, I couldn't generate a response.",
							};
						}
						return updatedMessages;
					});
				} else {
					// Normal reply (not an action), ensure the final content is displayed
					setMessages((prev) => {
						const updatedMessages = [...prev];
						if (
							placeholderIndex >= 0 &&
							placeholderIndex < updatedMessages.length &&
							updatedMessages[placeholderIndex]?.role === "assistant"
						) {
							updatedMessages[placeholderIndex] = {
								...updatedMessages[placeholderIndex],
								content: reply, // Ensure final reply is set
							};
						}
						return updatedMessages;
					});
				}
			} catch (err) {
				// ... (existing error handling - ensure placeholder is updated) ...
				console.error("Chat Generation Error:", err);
				setError(`Error generating response: ${err.message}`);
				setMessages((prev) => {
					const updatedMessages = [...prev];
					const errorContent = `Sorry, I encountered an error. Please try again. Error: ${err.message}`;
					if (
						placeholderIndex >= 0 &&
						placeholderIndex < updatedMessages.length &&
						updatedMessages[placeholderIndex]?.role === "assistant"
					) {
						updatedMessages[placeholderIndex] = {
							...updatedMessages[placeholderIndex],
							content: errorContent,
						};
					} else {
						// If placeholder is somehow invalid, append error
						console.warn("Placeholder index invalid, appending error.");
						return [...prev, { role: "assistant", content: errorContent }];
					}
					return updatedMessages;
				});
			} finally {
				// Loading state should only be cleared if no confirmation is pending
				if (!pendingAction) {
					setIsLoading(false);
					setLoadingMessage("");
				} else {
					// If confirmation is pending, keep loading indicator? No, confirmation handles its own state.
					setIsLoading(false); // Clear loading as confirmation buttons are shown
				}
			}
		},
		[
			engine,
			currentSection,
			resolvedTheme,
			CONTEXT_WINDOW_SIZE,
			generateSystemPrompt,
			setTheme,
			// Removed pendingAction dependency here as it's cleared immediately now
		]
	);

	// Update the ref whenever messages change
	useEffect(() => {
		messagesRef.current = messages;
	}, [messages]);

	// --- Updated Handler for Suggestion Buttons ---
	const handleSuggestionClick = (triggerText) => {
		if (isLoading || !isReady || !!pendingAction) return;

		const newUserMessage = { role: "user", content: triggerText };
		// Append user message immediately
		setMessages((prev) => [...prev, newUserMessage]);

		// Call the core LLM logic directly, passing the suggestion text
		sendMessageToLLM(triggerText);
	};

	// --- Updated Handler for Form Submission ---
	const handleSendMessage = async (e) => {
		e.preventDefault();
		const trimmedInput = userInput.trim();
		if (!trimmedInput || isLoading || !isReady || !!pendingAction) return;

		const newUserMessage = { role: "user", content: trimmedInput };
		// Append user message immediately
		setMessages((prev) => [...prev, newUserMessage]);

		setUserInput(""); // Clear input

		// Call the core LLM logic, passing the user input text
		sendMessageToLLM(trimmedInput);
	};

	// --- Render Logic ---
	return (
		<TooltipProvider delayDuration={100}>
			{/* FAB */}
			<AnimatePresence>
				{!isOpen && (
					<motion.div
						className="fixed bottom-6 right-6 z-50"
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0, opacity: 0 }}
						transition={{ type: "spring", stiffness: 260, damping: 20 }}
					>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									size="icon"
									className="rounded-full w-16 h-16 shadow-lg bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 hover:shadow-xl text-white flex items-center justify-center transition-all duration-300 hover:scale-105" // Slightly larger, gradient, hover effect
									onClick={handleOpenChat}
									aria-label="Open Chat"
								>
									{/* Replace img with SparklesIcon */}
									<SparklesIcon className="w-8 h-8" />
								</Button>
							</TooltipTrigger>
							{/* Use a much higher z-index */}
							<TooltipContent side="left" className="z-[9999]">
								<p>Talk to Varun's AI Assistant</p>
							</TooltipContent>
						</Tooltip>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Chat Window */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						// Mobile: Fullscreen fixed. Desktop: Bottom-right fixed.
						// Use inset-0 for mobile, override with md:inset-auto etc. for desktop.
						className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm md:items-end md:justify-end md:inset-auto md:bottom-5 md:right-5 md:h-auto md:w-auto md:bg-transparent md:backdrop-blur-none"
						initial={{ opacity: 0, y: 50, scale: 0.9 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 50, scale: 0.9 }}
						transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
					>
						{/* Added subtle gradient background to the card */}
						<Card className="h-full w-full flex flex-col shadow-2xl border-primary/30 rounded-none overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 md:rounded-xl md:w-[25vw] md:h-[50vh]">
							{" "}
							{/* Use fixed pixel dimensions */} {/* Adjusted desktop size */}
							{/* Header with gradient */}
							<CardHeader className="flex flex-row items-center justify-between p-4 border-b bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-sm">
								<div className="flex items-center gap-3">
									<SparklesIcon className="h-6 w-6 text-purple-500" />
									<p className="font-semibold text-lg">Varun's AI Assistant</p>
								</div>
								{/* Buttons remain the same */}
								<div className="flex items-center gap-1">
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant="ghost"
												size="icon"
												className="w-8 h-8 rounded-full hover:bg-muted/50"
												onClick={handleResetChat}
												disabled={isLoading} // Only disable if actively loading
												aria-label="Reset Chat"
											>
												<RotateCcwIcon className="h-4 w-4" />
											</Button>
										</TooltipTrigger>
										{/* Use a much higher z-index */}
										<TooltipContent
											side="top"
											sideOffset={5}
											className="z-[9999]"
										>
											<p>Reset Chat</p>
										</TooltipContent>
									</Tooltip>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant="ghost"
												size="icon"
												className="w-8 h-8 rounded-full hover:bg-muted/50"
												onClick={handleCloseChat}
												aria-label="Close Chat"
											>
												<CloseIcon className="h-4 w-4" />
											</Button>
										</TooltipTrigger>
										{/* Use a much higher z-index */}
										<TooltipContent
											side="top"
											sideOffset={5}
											className="z-[9999]"
										>
											<p>Close</p>
										</TooltipContent>
									</Tooltip>
								</div>
							</CardHeader>
							{/* Content Area with more padding */}
							<CardContent className="flex-1 overflow-y-auto p-5 space-y-5">
								{messages.map((msg, index) => {
									// Determine if this is the agentic placeholder message
									const isAgenticPlaceholder =
										msg.role === "assistant" &&
										msg.content === AGENTIC_RESPONSE_PLACEHOLDER;

									return (
										<div
											key={index}
											className={`flex items-end gap-3 ${
												msg.role === "user" ? "justify-end" : "justify-start"
											}`}
										>
											{msg.role === "assistant" && (
												// ... existing assistant icon div ...
												<div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white flex items-center justify-center shadow-md">
													<SparklesIcon className="h-4 w-4" />
												</div>
											)}
											{/* Message Bubble with animation */}
											<motion.div
												initial={{ opacity: 0, y: 10, scale: 0.95 }}
												animate={{ opacity: 1, y: 0, scale: 1 }}
												transition={{ duration: 0.3, ease: "easeOut" }}
												className={`max-w-[85%] p-3 rounded-xl shadow-md ${
													msg.role === "user"
														? "bg-primary text-primary-foreground rounded-br-none" // User style
														: isAgenticPlaceholder
														? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-muted-foreground italic rounded-bl-none animate-pulse" // Agentic placeholder style
														: "bg-muted text-foreground rounded-bl-none" // Normal assistant style
												}`}
											>
												{/* Conditional Markdown Rendering */}
												{msg.role === "assistant" &&
												!isAgenticPlaceholder &&
												!msg.isConfirmation ? (
													<ReactMarkdown
														components={{
															// Optional: Customize link rendering
															a: ({ node, ...props }) => (
																<a
																	{...props}
																	target="_blank"
																	rel="noopener noreferrer"
																	className="text-primary underline hover:opacity-80"
																/>
															),
														}}
													>
														{msg.content}
													</ReactMarkdown>
												) : (
													// Render plain text for user messages, placeholders, and confirmations
													// Basic newline handling for confirmations
													msg.content.split("\n").map((line, i, arr) => (
														<React.Fragment key={i}>
															{line}
															{i < arr.length - 1 && <br />}
														</React.Fragment>
													))
												)}

												{/* Render Suggestions ONLY for the initial greeting */}
												{index === 0 &&
													msg.role === "assistant" &&
													msg.content === INITIAL_GREETING && (
														<div className="mt-4 flex flex-wrap gap-2">
															{SUGGESTIONS.map((suggestion, sIndex) => (
																<Button
																	key={sIndex}
																	size="sm"
																	variant="outline"
																	className="text-xs h-auto py-1 px-2 border-purple-400/50 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30"
																	onClick={() =>
																		handleSuggestionClick(suggestion.trigger)
																	}
																	disabled={isLoading || !!pendingAction} // Disable if loading or action pending
																>
																	{suggestion.text}
																</Button>
															))}
														</div>
													)}

												{/* Render Confirmation Buttons if needed */}
												{msg.role === "assistant" && msg.isConfirmation && (
													<div className="flex gap-2 mt-3 justify-end">
														<Button
															size="sm"
															variant="outline"
															className="border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700"
															onClick={() => handleConfirmation(true)}
														>
															<CheckIcon className="h-4 w-4 mr-1" /> Yes
														</Button>
														{/* Corrected "No" Button structure */}
														<Button
															size="sm"
															variant="outline"
															className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700"
															onClick={() => handleConfirmation(false)}
														>
															<CloseIcon className="h-4 w-4 mr-1" /> No
														</Button>
													</div>
												)}
											</motion.div>
											{msg.role === "user" && (
												// ... existing user icon div ...
												<div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center shadow-md">
													<UserIcon className="h-4 w-4" />
												</div>
											)}
										</div>
									);
								})}
								{/* Loading/Error Indicator */}
								{(isLoading || error) && (
									<div className="flex justify-center items-center text-muted-foreground text-sm py-3">
										{isLoading && !error && (
											<>
												<motion.div
													animate={{ rotate: 360 }}
													transition={{
														duration: 1,
														repeat: Infinity,
														ease: "linear",
													}}
													className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full mr-3" // Adjusted spinner
												/>
												{loadingMessage}
											</>
										)}
										{error && <p className="text-destructive">{error}</p>}
									</div>
								)}
								<div ref={messagesEndRef} /> {/* Scroll target */}
							</CardContent>
							{/* Footer with slightly more padding */}
							<CardFooter className="p-4 border-t bg-muted/30">
								<form
									onSubmit={handleSendMessage}
									className="flex w-full gap-3 items-center" // gap-3, items-center
								>
									<Input
										type="text"
										placeholder={
											isReady ? "Ask me anything..." : "Initializing..."
										}
										value={userInput}
										onChange={(e) => setUserInput(e.target.value)}
										disabled={
											isLoading || !engine || !isReady || !!pendingAction
										}
										className="flex-1 rounded-full px-4 py-2 border-primary/20 focus-visible:ring-purple-500" // Rounded input
										aria-label="Chat input"
									/>
									<Button
										type="submit"
										size="icon"
										className="rounded-full w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-opacity disabled:opacity-50" // Gradient button
										disabled={
											isLoading ||
											!engine ||
											!isReady ||
											!userInput.trim() ||
											!!pendingAction
										}
										aria-label="Send Message"
									>
										<SendIcon className="h-5 w-5 text-white" />
									</Button>
								</form>
							</CardFooter>
						</Card>
					</motion.div>
				)}
			</AnimatePresence>
		</TooltipProvider>
	);
}
