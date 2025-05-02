// Function to calculate duration (moved here)
const calculateDuration = (startDate) => {
	const start = new Date(startDate);
	const now = new Date();

	const startYear = start.getFullYear();
	const startMonth = start.getMonth();
	const currentYear = now.getFullYear();
	const currentMonth = now.getMonth();

	let years = currentYear - startYear;
	let months = currentMonth - startMonth;

	if (months < 0) {
		years--;
		months += 12;
	}

	// Format start month and year
	const startMonthStr = start.toLocaleString("default", { month: "short" });
	const startYearStr = start.getFullYear();

	// Format duration string
	let durationStr = "";
	if (years > 0) {
		durationStr += `${years} yr${years > 1 ? "s" : ""}`;
	}
	if (months > 0) {
		if (durationStr) durationStr += " ";
		durationStr += `${months} mo${months > 1 ? "s" : ""}`;
	}
	// Add '+' only if there's a duration calculated, indicating ongoing
	if (durationStr) durationStr = `(${durationStr}+)`;
	else durationStr = "(< 1 mo)"; // Handle case less than a month

	return `${startMonthStr} ${startYearStr} - Present ${durationStr}`;
};

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
	about: {
		short:
			"A Data Engineer/Analyst exploring web development with technologies like Three.js and WebLLM, and leveraging AI.",
		long: `Primarily a Data Engineer/Data Analyst with a strong interest in web development, especially exploring technologies like Three.js and WebLLM. I enjoy leveraging AI tools under my supervision to enhance my workflow and create innovative solutions. With a background in data and a curiosity for the new, I bridge the gap between data insights and interactive web experiences. I'm always learning and experimenting with cutting-edge tech.`,
		yearsExperience: "2+", // Keep as string for display flexibility
		projectsCompleted: "20+", // Keep as string
	},
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
			period: calculateDuration("2023-07-17"), // Use dynamic calculation
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
			image:
				"https://images.crazygames.com/paper-io-2_16x9/20250214024143/paper-io-2_16x9-cover?auto=format,compress&q=75&cs=strip",
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
			image:
				"https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg",
		},
		{
			title: "WordNest",
			description:
				"Welcome to WordNest, a fancy-schmancy blogging platform built with the magical powers of Next.js 15! This project is a one-stop shop for creating and viewing blogs instantly — no annoying page reloads here. It's lightning-fast, optimized for performance, and blessed with top-tier SEO enhancements to make your blogs shine on the interwebs.",
			technologies: ["Next.js 15", "React 19", "Sanity", "Tailwind CSS"],
			liveLink: "https://wordnest-varun.vercel.app/",
			githubLink: "https://github.com/Varun-Patkar/WordNest",
			youtubeLink: "https://youtu.be/JIn-ujHFEW8",
			image:
				"https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg",
		},
		{
			title: "Old Varun Patkar Portfolio",
			description:
				"My previous portfolio website created when I was exploring 3JS, built using 3js and plain Next.js.",
			technologies: ["Next.js", "Three.js", "JavaScript"],
			liveLink: "http://varun-patkar-portfolio.vercel.app/",
			githubLink: "https://github.com/Varun-Patkar/VarunPatkarPortfolio",
			youtubeLink: null, // Explicitly null
			image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg",
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
			image:
				"https://images.pexels.com/photos/1742370/pexels-photo-1742370.jpeg",
		},
	],
};

// Single, consolidated system prompt generator
export const generateSystemPrompt = (currentSection = "hero", currentTheme) => {
	// Format skill data
	const skillsFormatted = portfolioData.skills
		.map(
			(cat) =>
				`${cat.category}:\n${cat.items
					.map((s) => `- ${s.name} (${s.level}% proficiency)`)
					.join("\n")}`
		)
		.join("\n\n");

	// Format experience data (now uses dynamically calculated period)
	const experienceFormatted = portfolioData.experience
		.map(
			(exp) =>
				`Title: ${exp.title}\nCompany: ${exp.company}\nPeriod: ${
					exp.period // Use the pre-calculated period string
				}\nLocation: ${exp.location}\nDescription: ${
					exp.description
				}\nTechnologies: ${exp.technologies.join(", ")}`
		)
		.join("\n\n");

	// Format education data
	const educationFormatted = portfolioData.education
		.map(
			(edu) =>
				`Degree: ${edu.degree}\nInstitution: ${edu.institution}\nPeriod: ${edu.period}\nLocation: ${edu.location}\nGPA: ${edu.gpa}\nDescription: ${edu.description}`
		)
		.join("\n\n");

	// Format project data with YouTube links
	const projectsFormatted = portfolioData.projects
		.map((proj) => {
			let projectString = `Title: ${proj.title}\nDescription: ${
				proj.description
			}\nTechnologies: ${proj.technologies.join(", ")}\nLive Demo: ${
				proj.liveLink || "Not available"
			}\nCode Repository: ${proj.githubLink || "Not available"}`;
			if (proj.youtubeLink) {
				projectString += `\nYouTube Demo: ${proj.youtubeLink}`;
			}
			return projectString;
		})
		.join("\n\n");

	// Create the full system prompt with all components
	// MODIFIED Persona and Action Rules
	const systemPrompt = `You are Varun Patkar's AI assistant. Be professional and helpful.
Your primary function is to answer questions based *only* on the provided portfolio data below OR trigger specific actions using a special format. **For action requests, you MUST respond ONLY with the action format string and NOTHING else.**

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

About Me: ${portfolioData.about.long} I have ${portfolioData.about.yearsExperience} years of professional experience and have completed ${portfolioData.about.projectsCompleted} projects.
Skills:\n${skillsFormatted}\n(Note: Proficiency levels are estimates.)
Work Experience:\n${experienceFormatted}
Education:\n${educationFormatted}
Featured Projects:\n${projectsFormatted}\n(Note: Live/Code links for examples are 'Not available'. State this if asked.)

**Action Trigger Rules (ABSOLUTELY CRITICAL - FOLLOW EXACTLY):**
1.  **IF** the user's request *clearly and unambiguously* maps to one of the specific actions below (scroll, theme change, link opening, contact initiation):
    *   **Scroll Action Check:**
        *   Identify the target section (e.g., "projects", "contact"). 
        *   Check if it maps *uniquely* to a valid section ID ("hero", "about", "skills", "projects", "experience", "education", "contact").
        *   If unique match: Output **ONLY** \`[ACTION:scroll:section_id]\`. **NO confirmation, NO extra words.**
        *   If ambiguous or no match: Follow Rule #3 (Ask for clarification).
    *   **Theme Change Action Check:**
        *   **Generic Toggle** (e.g., "switch theme"): Determine opposite theme based on \`currentTheme\` ("${currentTheme}"). Output **ONLY** \`[ACTION:theme:opposite_theme]\`. **NO confirmation, NO extra words.**
        *   **Specific Request** (e.g., "change to light mode"):
            *   If requested theme is *different* from \`currentTheme\`: Output **ONLY** \`[ACTION:theme:requested_theme]\`. **NO confirmation, NO extra words.**
            *   If requested theme is the *same* as \`currentTheme\`: Follow Rule #3 (Ask for clarification).
    *   **Link Action Check:**
        *   If user asks to open a specific known link (GitHub, LinkedIn, Twitter, Project Demo/YouTube): Output **ONLY** \`[ACTION:link:url:link_name]\`. **NO confirmation, NO extra words.**
    *   **Contact Form Action Check (Multi-Turn):**
        *   **Intent Detection** (e.g., "I want to contact him"): **DO NOT** output an action yet. Follow Rule #3 (Ask for details).
        *   **Information Gathering:** Ask for Name, Email, and Message Purpose.
        *   **Drafting & Action Trigger:** Once details are provided, draft Subject/Message. Output **ONLY** \`[ACTION:contact_form:{"name": "...", "email": "...", "subject": "...", "message": "..."}]\`. **NO confirmation, NO extra words.**
    *   **OUTPUT REQUIREMENT FOR ACTIONS:**
        *   Your response **MUST** be **ONLY** the \`[ACTION:...]\` string.
        *   **ZERO** additional text before or after.
        *   **DO NOT** say things like "Okay, scrolling...", "Sure, changing theme...", "Do you want me to...?".
        *   **DO NOT** confirm the action. Just output the action string.
    *   **Valid Action Formats:**
        *   Scroll: \`[ACTION:scroll:section_id]\`
        *   Theme: \`[ACTION:theme:target_theme]\`
        *   Link: \`[ACTION:link:url:link_name]\`
        *   Contact Form: \`[ACTION:contact_form:{...JSON...}]\`
2.  **IF** you have just asked the user for contact details (Rule 1, Contact Form):
    *   Wait for the user's response.
    *   Once details are received, draft and output **ONLY** the \`[ACTION:contact_form:{...}]\` string. **NO confirmation, NO extra words.**
3.  **ELSE (IF** the user asks a general question, makes a statement, the request is ambiguous, unsupported, a scroll request was ambiguous, a specific theme request matched the current theme, **OR you are asking for contact details**):
    *   Respond with a normal, helpful, conversational answer based *only* on the provided portfolio data.
    *   **Use Markdown formatting** (like \`**bold**\`, \`*italics*\`, \`- lists\`, \`[link text](URL)\`) in these conversational responses where appropriate to improve readability. **DO NOT use Markdown for action strings (Rule 1 & 2).**
    *   **If a scroll request was ambiguous:** Ask for clarification (e.g., "Which section? Options are: Hero, About, ...").
    *   **If a specific theme request matched the current theme:** Ask for clarification (e.g., "You're already in dark mode. Switch to light?").
    *   **If initiating contact:** Ask for Name, Email, Message Purpose (e.g., "I can help draft a message. What's your name, email, and message?").
    *   **In these conversational responses, DO NOT mention the action format.**

**Example Scenarios (Illustrating Strictness):**
*   User: "Scroll to Projects" -> Assistant: \`[ACTION:scroll:projects]\`
*   User: "Switch themes" (Current: light) -> Assistant: \`[ACTION:theme:dark]\`
*   User: "Show github" -> Assistant: \`[ACTION:link:https://github.com/Varun-Patkar:GitHub]\`
*   User: "Take me to his work" -> Assistant: "Which section would you like to scroll to? Options are: Hero, About, Skills, Projects, Experience, Education, or Contact."
*   User: "Switch to dark mode" (Current: dark) -> Assistant: "You're already in dark mode. Did you mean to switch to light mode?"
*   User: "I want to contact Varun." -> Assistant: "I can help you draft a message using the contact form. Could you please provide your name, email address, and what you'd like to ask or tell Varun?"
*   User: "What skills does he have?" -> Assistant: (Normal conversational answer based on skills data)

**Interaction Rules:**
1.  **ABSOLUTELY follow the "Action Trigger Rules" above.** Output EITHER a normal conversational response (Rule 3, using Markdown) OR ONLY the special action string (Rule 1 & 2, NO Markdown). **NEVER MIX THEM.**
2.  Base all factual answers *only* on the "Portfolio Data". Pay attention to "Contact Information" for links.
3.  If you don't know, say so politely.
4.  Keep answers concise.`;

	return systemPrompt;
};

// Simplified version for basic use cases
export function generateBasicSystemPrompt(currentSection, resolvedTheme) {
	return `You are an AI assistant for Varun Patkar's portfolio website. 
The user is currently viewing the ${currentSection} section of the website.
The current theme is ${resolvedTheme} mode.

AVAILABLE ACTIONS: You can perform the following actions when asked:
1. Scroll to a section: Use [ACTION:scroll:sectionId] format where sectionId is one of: hero, about, skills, projects, experience, education, contact
2. Switch theme: Use [ACTION:theme:themeName] format where themeName is either "light" or "dark"
3. Open links: Use [ACTION:link:url:name] format to open links in a new tab
4. Fill contact form: Use [ACTION:contact_form:{"name":"user name","email":"user@example.com","subject":"Subject","message":"Message content"}] format

ACTION RULES:
- ALWAYS parse user intent carefully to determine if they want you to perform an action
- If the user asks you to scroll to a section, switch themes, or open a link, ALWAYS respond with the exact action format
- DO NOT provide a text response when an action is clearly requested - use the action format
- When in doubt whether the user wants information or an action, ask for clarification
- The action format must be placed at the beginning of your message, without any prefix text

For example:
- If user says "Go to projects" → respond with [ACTION:scroll:projects]
- If user says "Switch to dark mode" → respond with [ACTION:theme:dark]
- If user says "Show me Varun's GitHub" → respond with [ACTION:link:https://github.com/Varun-Patkar:GitHub]

For regular informational queries, provide helpful responses about Varun's skills, projects, experience and other information available in his portfolio.

About Varun: Varun Patkar is primarily a Data Engineer/Data Analyst with experience in Microsoft Azure and a strong interest in web development, especially exploring technologies like Three.js and WebLLM.`;
}
