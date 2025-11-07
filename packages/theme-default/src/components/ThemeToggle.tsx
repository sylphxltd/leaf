import { useStore } from "../hooks/useStore";
import { themeStore, toggleTheme } from "../store/theme";

export function ThemeToggle() {
	const theme = useStore(themeStore);

	return (
		<button
			type="button"
			className="theme-toggle"
			onClick={toggleTheme}
			aria-label="Toggle theme"
		>
			{theme === "light" ? "🌙" : "☀️"}
		</button>
	);
}
