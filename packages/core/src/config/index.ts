import { resolve } from "node:path";
import type { LeafConfig } from "../types.js";

function getDefaultHeadTags(): LeafConfig["head"] {
	return [
		// Default Open Graph meta tags
		["meta", { property: "og:type", content: "website" }],
		["meta", { property: "og:title", content: "Leaf - Modern Documentation Framework" }],
		["meta", { property: "og:description", content: "A fast, modern documentation framework built with Preact that achieves 100% feature parity with VitePress" }],
		["meta", { property: "og:image", content: "/og-image.svg" }],
		["meta", { property: "og:site_name", content: "Leaf" }],

		// Default Twitter Card meta tags
		["meta", { name: "twitter:card", content: "summary_large_image" }],
		["meta", { name: "twitter:title", content: "Leaf - Modern Documentation Framework" }],
		["meta", { name: "twitter:description", content: "A fast, modern documentation framework built with Preact that achieves 100% feature parity with VitePress" }],
		["meta", { name: "twitter:image", content: "/twitter-image.svg" }],
		["meta", { name: "twitter:site", content: "@sylphxltd" }],

		// Default SEO meta tags
		["meta", { name: "keywords", content: "documentation framework, preact, vite, markdown, docs, static site generator, vitepress alternative" }],
		["meta", { name: "author", content: "Sylphx" }],
		["meta", { name: "robots", content: "index, follow" }],
	];
}

export async function loadConfig(root: string): Promise<LeafConfig> {
	const configPath = resolve(root, "leaf.config.ts");

	try {
		const config = await import(configPath);
		const userConfig = config.default || config;

		// Merge user config with default head tags
		return {
			...userConfig,
			head: [
				...getDefaultHeadTags(),
				...(userConfig.head || [])
			]
		};
	} catch (error) {
		console.error("[loadConfig] Failed to load config:", error);
		// Return default config if not found
		return {
			title: "Leaf",
			description: "A modern Preact-based documentation framework with VitePress parity",
			base: "/",
			head: getDefaultHeadTags(),
		};
	}
}

export function defineConfig(config: LeafConfig): LeafConfig {
	return config;
}
