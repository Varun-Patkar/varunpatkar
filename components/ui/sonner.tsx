"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className="toaster group"
			toastOptions={{
				classNames: {
					// Use card background, foreground, border, and shadow
					toast:
						"group toast group-[.toaster]:bg-card group-[.toaster]:text-card-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
					description: "group-[.toast]:text-muted-foreground",
					// Use primary colors
					actionButton:
						"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
					// Use muted colors
					cancelButton:
						"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
					// Style close button to match border/muted
					closeButton:
						"group-[.toast]:border-border group-[.toast]:bg-muted group-[.toast]:text-muted-foreground hover:group-[.toast]:bg-accent hover:group-[.toast]:text-accent-foreground",
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
