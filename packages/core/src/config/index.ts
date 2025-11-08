import { resolve } from "node:path";
import type { LeafConfig } from "../types.js";

export async function loadConfig(root: string): Promise<LeafConfig> {
	const configPath = resolve(root, "leaf.config.ts");

	try {
		const config = await import(configPath);
		return config.default || config;
	} catch (error) {
		console.error("[loadConfig] Failed to load config:", error);
		// Return default config if not found
		return {
			title: "Leaf",
			description: "A React-based documentation framework",
			base: "/",
		};
	}
}

export function defineConfig(config: LeafConfig): LeafConfig {
	return config;
}
