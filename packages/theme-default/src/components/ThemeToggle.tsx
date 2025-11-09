import { Icon } from "@iconify/react";
import { useStore } from "../hooks/useStore";
import { themeStore, toggleTheme } from "../store/theme";
import { Button } from "./Button";

export function ThemeToggle(): JSX.Element {
	const theme = useStore(themeStore);

	return (
		<Button
			variant="icon"
			onClick={toggleTheme}
			aria-label={`Toggle theme (current: ${theme})`}
			aria-pressed={theme === "dark"}
		>
			<Icon
				icon={theme === "light" ? "lucide:moon" : "lucide:sun"}
				className="h-5 w-5"
			/>
		</Button>
	);
}
