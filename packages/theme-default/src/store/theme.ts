import { type Zen } from "@sylphx/zen";

// TEMPORARY: Import Zen functions with type assertions
import * as ZenModule from "@sylphx/zen";
const zen = ZenModule.zen as <T>(initialValue: T) => Zen<T>;
const get = ZenModule.get as <T>(store: Zen<T>) => T;
const set = ZenModule.set as <T>(store: Zen<T>, value: T) => void;

type Theme = "light" | "dark";

export const themeStore = zen<Theme>("light");

export const toggleTheme = () => {
	const current = get(themeStore);
	const newTheme = current === "light" ? "dark" : "light";
	set(themeStore, newTheme);
	document.documentElement.setAttribute("data-theme", newTheme);
};

// Initialize theme
if (typeof window !== "undefined") {
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const initial = prefersDark ? "dark" : "light";
	set(themeStore, initial);
	document.documentElement.setAttribute("data-theme", initial);
}
