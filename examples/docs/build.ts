import {
	createReactPressPlugin,
	generateStaticSite,
	loadConfig,
	routesPlugin,
} from "@sylphx/reactpress";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { build as viteBuild } from "vite";

const root = process.cwd();
const config = await loadConfig(root);
const outDir = resolve(root, "dist");

console.log("Building client bundle...");

// Build the client-side bundle
// NOTE: Using mode: 'development' as workaround for MDX v3 strict ESM validation
// See KNOWN_ISSUES.md for details
await viteBuild({
	root,
	mode: "development",
	plugins: [routesPlugin(resolve(root, "docs")), ...createReactPressPlugin(config)],
	build: {
		outDir,
		emptyOutDir: true,
		minify: false, // Disable minification in development mode
	},
});

console.log("✓ Client bundle built");

// Read the generated HTML template
const templatePath = resolve(outDir, "index.html");
const template = await readFile(templatePath, "utf-8");

// Generate static HTML for all routes
await generateStaticSite({
	root,
	outDir,
	template,
	clientBundle: "/assets/main.js",
});

console.log("\n✓ Build completed successfully!");

