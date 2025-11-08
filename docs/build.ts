import {
	createLeafPlugin,
	generateStaticSite,
	loadConfig,
	routesPlugin,
} from "@sylphx/leaf";
import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { build as viteBuild, type Plugin } from "vite";

const root = process.cwd();
const config = await loadConfig(root);
const outDir = resolve(root, "dist");

// FORCE production environment
process.env.NODE_ENV = "production";

console.log("Building Leaf documentation...");

// Find react-router production build
const bunDir = resolve(root, "../node_modules/.bun");
const dirs = await readdir(bunDir);
const reactRouterDir = dirs
	.filter((d) => d.startsWith("react-router@"))
	.map((d) => resolve(bunDir, d, "node_modules/react-router"))
	.find((p) => existsSync(resolve(p, "dist/production/index.mjs")));

if (!reactRouterDir) {
	throw new Error("Could not find react-router production build");
}

console.log(`Using react-router from: ${reactRouterDir}`);

// Custom plugin to force production builds
const forceProductionPlugin = (): Plugin => ({
	name: "force-production-react-router",
	enforce: "pre",
	resolveId(id) {
		if (id === "react-router" || id === "react-router/dom") {
			const file =
				id === "react-router"
					? "dist/production/index.mjs"
					: "dist/production/dom-export.mjs";
			return resolve(reactRouterDir, file);
		}
	},
});

// Build the client-side bundle
await viteBuild({
	root,
	mode: "production",
	plugins: [
		forceProductionPlugin(),
		routesPlugin(resolve(root, "docs")),
		...createLeafPlugin(config),
	],
	define: {
		"process.env.NODE_ENV": JSON.stringify("production"),
		__DEV__: false,
	},
	build: {
		outDir,
		emptyOutDir: true,
		minify: "esbuild",
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
console.log(`\nOutput: ${outDir}`);
