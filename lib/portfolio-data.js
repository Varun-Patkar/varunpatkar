// Structured data extracted from the portfolio components for the chatbot

export const portfolioData = {
	name: "Varun Patkar",
	role: "Data Engineer/Analyst",
	location: "Mumbai, Maharashtra, India",
	contact: {
		email: "varunpatkar501@gmail.com",
		phone: "+91 7977802884",
		linkedin: "https://www.linkedin.com/in/varun-patkar/",
		github: "https://github.com/Varun-Patkar",
		twitter: "https://x.com/Varun_Patkar",
	},
	about: `Primarily a Data Engineer/Data Analyst with a strong interest in web development, especially exploring technologies like Three.js and WebLLM. I enjoy leveraging AI tools under my supervision to enhance my workflow and create innovative solutions. With a background in data and a curiosity for the new, I bridge the gap between data insights and interactive web experiences. I'm always learning and experimenting with cutting-edge tech. I have over 2 years of professional experience and have completed more than 20 projects.`,
	skills: [
		{
			category: "Data & Backend",
			items: [
				{ name: "Python", level: 85 },
				{ name: "SQL", level: 80 },
				{ name: "Node.js", level: 70 },
				{ name: "Express", level: 70 },
				{ name: "Django", level: 65 },
				{ name: "MongoDB", level: 75 },
				{ name: "PostgreSQL", level: 70 },
			],
		},
		{
			category: "Frontend & Web",
			items: [
				{ name: "JavaScript", level: 80 },
				{ name: "React", level: 75 },
				{ name: "Next.js", level: 70 },
				{ name: "Vite", level: 65 },
				{ name: "HTML/CSS", level: 85 },
				{ name: "Tailwind CSS", level: 80 },
				{ name: "Three.js", level: 50 },
			],
		},
		{
			category: "Cloud & Tools",
			items: [
				{ name: "Git", level: 90 },
				{ name: "Docker", level: 70 },
				{ name: "Microsoft Azure", level: 75 },
				{ name: "Azure Data Factory", level: 70 },
				{ name: "Azure OpenAI", level: 65 },
				{ name: "AWS", level: 50 },
			],
		},
		{
			category: "Other Languages",
			items: [
				{ name: "C#", level: 60 },
				{ name: "Java", level: 20 },
				{ name: "C++", level: 20 },
				{ name: "TypeScript", level: 50 },
			],
		},
	],
	experience: [
		{
			title: "Software Engineer 1",
			company: "MAQ Software",
			location: "Mumbai, MH, India",
			period: "Aug 2022 - Present",
			description:
				"Working as a full-time Software Engineer, focusing on data engineering and related technologies within the Microsoft ecosystem.",
			technologies: ["Python", "SQL", "Azure", "Azure Data Factory", "C#"],
		},
		{
			title: "Data Science and Business Analytics Intern",
			company: "The Sparks Foundation",
			location: "Remote",
			period: "May 2021 - Jun 2021",
			description:
				"Gained practical experience in data science and business analytics through project-based tasks.",
			technologies: ["Python", "Data Analysis", "Machine Learning"],
		},
		{
			title: "Chairperson",
			company: "CSI SFIT (College Chapter)",
			location: "Mumbai, MH, India",
			period: "During College",
			description:
				"Led the college chapter of the Computer Society of India, organizing events and managing activities.",
			technologies: ["Leadership", "Event Management", "Team Coordination"],
		},
	],
	education: [
		{
			degree: "Bachelor of Engineering in Information Technology",
			institution: "St. Francis Institute of Technology (Mumbai University)",
			location: "Mumbai, MH, India",
			period: "2018 - 2022",
			description:
				"Completed coursework with a focus on IT fundamentals and software development. Actively involved in extracurricular activities, including leading the CSI SFIT chapter.",
			gpa: "9.1/10.0",
		},
	],
	projects: [
		{
			title: "Paper IO Game Clone",
			description:
				"A 3D game inspired by Paper.IO using React and 3JS. Control a cube on a circular map, expand your territory, and avoid crossing trails. Future enhancements include enemies, bots, leaderboards, and more.",
			technologies: [
				"React",
				"3JS",
				"Vite",
				"React Three Fiber",
				"Drei",
				"Zustand",
				"Tailwind CSS",
			],
			liveLink: "https://paper-io-varun.vercel.app/",
			githubLink: "https://github.com/Varun-Patkar/PaperIOCloneVarunPatkar",
			youtubeLink: "https://youtu.be/sZs3o5sKe4g",
		},
		{
			title: "Marvel Universe Conquerer with Alfred AI Butler",
			description:
				"Step into the vault of the Universe Conqueror! A 3D interactive gallery built with React Three Fiber, showcasing Marvel artifacts and featuring a sassy AI Butler, Alfred, powered by WebLLM. Explore, interact, and chat—all in your browser!",
			technologies: [
				"React Three Fiber",
				"Drei",
				"WebLLM",
				"React",
				"Tailwind CSS",
			],
			liveLink: "https://universe-conqueror-ai.vercel.app/",
			githubLink: "https://github.com/Varun-Patkar/universe-conqueror-ai",
			youtubeLink: "https://youtu.be/Gt_kxUQwSLY?si=-LbCM-hq_s16y5Wu",
		},
		{
			title: "WordNest",
			description:
				"Welcome to WordNest, a fancy-schmancy blogging platform built with the magical powers of Next.js 15! This project is a one-stop shop for creating and viewing blogs instantly — no annoying page reloads here. It's lightning-fast, optimized for performance, and blessed with top-tier SEO enhancements to make your blogs shine on the interwebs.",
			technologies: ["Next.js 15", "React 19", "Sanity", "Tailwind CSS"],
			liveLink: "https://wordnest-varun.vercel.app/",
			githubLink: "https://github.com/Varun-Patkar/WordNest",
			youtubeLink: "https://youtu.be/JIn-ujHFEW8",
		},
		{
			title: "Old Varun Patkar Portfolio",
			description:
				"My previous portfolio website created when I was exploring 3JS, built using 3js and plain Next.js.",
			technologies: ["Next.js", "Three.js", "JavaScript"],
			liveLink: "http://varun-patkar-portfolio.vercel.app/",
			githubLink: "https://github.com/Varun-Patkar/VarunPatkarPortfolio",
			youtubeLink: null, // Explicitly null
		},
		{
			title: "Snake with Reinforcement Learning",
			description:
				"A Python-based Snake game built in Pygame which simulated learning for the snake using reinforcement learning.",
			technologies: ["Python", "Pygame", "Reinforcement Learning"],
			liveLink: null, // Explicitly null
			githubLink:
				"https://github.com/Varun-Patkar/SnakeWithReinforcementLearning",
			youtubeLink: null, // Explicitly null
		},
	],
};

// Helper function to format the data into a string for the system prompt
export const generateSystemPrompt = (currentSection = "hero", currentTheme) => {
	// Add currentTheme parameter
	const skillsFormatted = portfolioData.skills
		.map(
			(cat) =>
				`${cat.category}:\n${cat.items
					.map((s) => `- ${s.name} (${s.level}% proficiency)`)
					.join("\n")}`
		)
		.join("\n\n");

	const experienceFormatted = portfolioData.experience
		.map(
			(exp) =>
				`Title: ${exp.title}\nCompany: ${exp.company}\nPeriod: ${
					exp.period
				}\nLocation: ${exp.location}\nDescription: ${
					exp.description
				}\nTechnologies: ${exp.technologies.join(", ")}`
		)
		.join("\n\n");

	const educationFormatted = portfolioData.education
		.map(
			(edu) =>
				`Degree: ${edu.degree}\nInstitution: ${edu.institution}\nPeriod: ${edu.period}\nLocation: ${edu.location}\nGPA: ${edu.gpa}\nDescription: ${edu.description}`
		)
		.join("\n\n");

	// Update projectsFormatted to include YouTube link
	const projectsFormatted = portfolioData.projects
		.map((proj) => {
			let projectString = `Title: ${proj.title}\nDescription: ${
				proj.description
			}\nTechnologies: ${proj.technologies.join(", ")}\nLive Demo: ${
				proj.liveLink || "Not available" // Handle null/undefined
			}\nCode Repository: ${
				proj.githubLink || "Not available" // Handle null/undefined
			}`;
			if (proj.youtubeLink) {
				projectString += `\nYouTube Demo: ${proj.youtubeLink}`; // Add YouTube link if present
			}
			return projectString;
		})
		.join("\n\n");

	// REVISED Action Trigger Format - EXTREMELY STRICT
	const actionFormatInstruction = `
**Action Trigger Rules (CRITICAL):**
1.  **IF** you detect the user wants to perform an action (change theme, open link, scroll *unambiguously*, or initiate contact form fill):
    *   **Scroll Action Check:**
        *   Identify the target section mentioned by the user (e.g., "projects", "contact", "work").
        *   Check if the target clearly and uniquely maps to *exactly one* of the valid section IDs: "hero", "about", "skills", "projects", "experience", "education", "contact".
        *   If it maps uniquely (e.g., "projects" -> "projects", "experience" -> "experience"), proceed to output the scroll action string.
        *   If it's ambiguous (e.g., "work" could mean "experience") or doesn't map clearly, **DO NOT** output an action string. Instead, follow Rule #3 (ELSE).
    *   **Theme Change Action Check:**
        *   **Identify Intent:** Determine if the user wants to switch to a *specific* theme ('light' or 'dark') or just *toggle/switch* the theme generically.
        *   **Generic Toggle:** If the user asks generically (e.g., "switch theme", "toggle mode"), determine the opposite theme based on the \`currentTheme\` ("${currentTheme}"). The opposite of 'dark' is 'light', and the opposite of 'light' is 'dark'. Proceed to output the action string for the *opposite* theme.
        *   **Specific Request:** If the user asks for a *specific* theme (e.g., "change to light mode", "make it dark"):
            *   **Check if Same:** Compare the requested theme ('light' or 'dark') with the \`currentTheme\` ("${currentTheme}").
            *   **If SAME:** **DO NOT** output an action string. Instead, respond conversationally asking for clarification. Example: "You're already in ${currentTheme} mode. Did you mean to switch to ${
		currentTheme === "dark" ? "light" : "dark"
	} mode?". Follow Rule #3 (ELSE).
            *   **If DIFFERENT:** Proceed to output the action string for the *requested* theme.
    *   **Link Action Check:**
        *   If the user wants to change the theme or open a specific link (GitHub, LinkedIn, Twitter), proceed to output the theme/link action string.
    *   **Contact Form Action Check (Multi-Turn):**
        *   **Intent Detection:** If the user expresses a clear intent to contact Varun (e.g., "I want to contact him", "How can I send Varun a message?", "Can you help me reach out?"), **DO NOT** immediately output an action.
        *   **Information Gathering:** Instead, respond conversationally, suggesting you can help fill the contact form and ask for their **Name**, **Email**, and **the purpose/content of their message**. (e.g., "I can help you draft a message using the contact form. Could you please provide your name, email address, and what you'd like to ask or tell Varun?")
        *   **Drafting & Action Trigger:** Once the user provides these details, **draft a concise Subject and Message** based on their input. Then, output the \`contact_form\` action string containing the gathered and drafted information as a JSON payload.
    *   **Outputting the Action String:**
        *   Your response MUST be **ONLY** the special string format below.
        *   **DO NOT** include ANY other text, explanation, or conversational filler before or after the string.
        *   **DO NOT** mention confirmation.
        *   **DO NOT** mention the [ACTION:...] format itself.
    *   **Valid Action Formats:**
        *   Scroll: \`[ACTION:scroll:section_id]\` (e.g., \`[ACTION:scroll:projects]\`) - *Only if unambiguous!*
        *   Theme: \`[ACTION:theme:target_theme]\` (e.g., \`[ACTION:theme:dark]\`)
        *   Link: \`[ACTION:link:url:link_name]\` (e.g., \`[ACTION:link:https://github.com/Varun-Patkar:GitHub]\`, \`[ACTION:link:https://youtu.be/sZs3o5sKe4g:Paper IO YouTube Demo]\`) - *Use specific link names like 'GitHub', 'LinkedIn', 'Twitter', 'Live Demo', 'YouTube Demo'.*
        *   Contact Form: \`[ACTION:contact_form:{"name": "USER_NAME", "email": "USER_EMAIL", "subject": "DRAFTED_SUBJECT", "message": "DRAFTED_MESSAGE"}]\` (Replace placeholders with actual data. Ensure valid JSON.)
2.  **IF** you have just asked the user for their contact details (Name, Email, Message Purpose) in the previous turn:
    *   Wait for the user's response containing the details.
    *   Once received, proceed to draft the subject/message and output the \`[ACTION:contact_form:{...}]\` string as described in Rule 1.
3.  **ELSE (IF** the user is asking a general question, making a statement, the request is ambiguous/unsupported, a scroll request was ambiguous, **OR a specific theme request matched the current theme**):
    *   Respond with a normal, conversational answer based *only* on the provided portfolio data.
    *   **If a scroll request was ambiguous:** Ask the user to clarify which section they meant, listing the valid options: "Hero", "About", "Skills", "Projects", "Experience", "Education", or "Contact". (e.g., "Which section would you like to scroll to? Options are: Hero, About, Skills, Projects, Experience, Education, or Contact.")
    *   **If a specific theme request matched the current theme:** Ask for clarification as described in Rule 1 (Theme Change Action Check).
    *   **DO NOT** mention actions, the action format, or confirmation in these normal responses.

**Example Scenarios:**
*   User: "Show me his github" -> Assistant: \`[ACTION:link:https://github.com/Varun-Patkar:GitHub]\`
*   User: "Open the YouTube demo for the Paper IO game" -> Assistant: \`[ACTION:link:https://youtu.be/sZs3o5sKe4g:Paper IO YouTube Demo]\`
*   User: "Scroll to projects" -> Assistant: \`[ACTION:scroll:projects]\`
*   User: "Take me to his work section" -> Assistant: "Which section would you like to scroll to? Options are: Hero, About, Skills, Projects, Experience, Education, or Contact."
*   User: "I want to ask Varun about collaborating on a project." -> Assistant: "I can help you draft a message using the contact form. Could you please provide your name, email address, and briefly describe the collaboration you have in mind?"
*   User: "My name is Alex, email is alex@example.com. I'd like to discuss a potential freelance opportunity related to data analysis." -> Assistant: \`[ACTION:contact_form:{"name": "Alex", "email": "alex@example.com", "subject": "Collaboration Inquiry - Data Analysis", "message": "Hello Varun,\\n\\nI came across your portfolio and I'm interested in discussing a potential freelance opportunity related to data analysis.\\n\\nBest regards,\\nAlex"}]\`
*   User: "What projects has he done?" -> Assistant: (Normal conversational answer based on project data)
*   User: "Can you change the theme?" (Current is light) -> Assistant: \`[ACTION:theme:dark]\`
*   User: "Toggle the mode" (Current is dark) -> Assistant: \`[ACTION:theme:light]\`
*   User: "Switch to dark mode" (Current is light) -> Assistant: \`[ACTION:theme:dark]\`
*   User: "Switch to dark mode" (Current is dark) -> Assistant: "You're already in dark mode. Did you mean to switch to light mode?"
*   User: "Tell me about MAQ Software" -> Assistant: (Normal conversational answer based on experience data)
*   User: "Thanks!" -> Assistant: "You're welcome! Let me know if there's anything else."
`;

	// REVISED System Prompt Structure - Explicitly mention contact details again
	return `You are Varun Patkar's AI assistant. Be polite, soft-spoken, professional, and helpful.
Your primary function is to answer questions based *only* on the provided portfolio data below OR trigger specific actions using a special format.

**Current Context:**
*   User is viewing section: "${currentSection}"
*   Website theme: ${currentTheme}
*   Valid Scroll Sections: "hero", "about", "skills", "projects", "experience", "education", "contact"

**Portfolio Data:**
Name: ${portfolioData.name}
Role: ${portfolioData.role}
Location: ${portfolioData.location}

**Contact Information (Use this for email, phone, social links):**
*   Email: ${portfolioData.contact.email}
*   Phone: ${portfolioData.contact.phone}
*   LinkedIn: ${portfolioData.contact.linkedin}
*   GitHub: ${portfolioData.contact.github}
*   Twitter: ${portfolioData.contact.twitter}

About Me: ${portfolioData.about}
Skills:\n${skillsFormatted}\n(Note: Proficiency levels are estimates.)
Work Experience:\n${experienceFormatted}
Education:\n${educationFormatted}
Featured Projects:\n${projectsFormatted}\n(Note: Live/Code links for examples are 'Not available'. State this if asked.)

${actionFormatInstruction}

**Interaction Rules:**
1.  **Strictly follow the "Action Trigger Rules" above.** Output EITHER a normal conversational response OR ONLY the special action string. Never mix them. Never discuss confirmation or the action format with the user. Handle ambiguous scroll requests and same-theme requests by asking for clarification. Follow the multi-turn flow for the contact form action.
2.  Base all factual answers *only* on the "Portfolio Data" provided above. **Pay close attention to the "Contact Information" section for social media links like LinkedIn, GitHub, and Twitter.**
3.  If you don't know the answer or cannot perform a request based on the data/capabilities, say so politely (e.g., "I don't have information on that specific topic based on Varun's portfolio.").
4.  Keep answers concise.
`;
};
