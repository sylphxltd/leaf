import { resolve } from "node:path";
import type { ReactPressConfig } from "../types.js";

export async function loadConfig(root: string): Promise<ReactPressConfig> {
	const configPath = resolve(root, "reactpress.config.ts");

	try {
		const config = await import(configPath);
		return config.default || config;
	} catch (error) {
		// Return default config if not found
		return {
			title: "ReactPress",
			description: "A React-based documentation framework",
			base: "/",
		};
	}
}

export function defineConfig(config: ReactPressConfig): ReactPressConfig {
	return config;
}
