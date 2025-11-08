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

// Find react-dom
const reactDomPath = resolve(root, "../node_modules/.bun");
const reactDomDirs = await readdir(reactDomPath);
const reactDomDir = reactDomDirs
	.filter((d) => d.startsWith("react-dom@"))
	.map((d) => resolve(reactDomPath, d, "node_modules/react-dom"))
	.find((p) => existsSync(resolve(p, "cjs/react-dom-client.production.js")));

if (!reactDomDir) {
	throw new Error("Could not find react-dom production build");
}

console.log(`Using react-dom from: ${reactDomDir}`);

// Find react
const reactPath = resolve(root, "../node_modules/.bun");
const reactDirs2 = await readdir(reactPath);
const reactDir = reactDirs2
	.filter((d) => d.startsWith("react@"))
	.map((d) => resolve(reactPath, d, "node_modules/react"))
	.find((p) => existsSync(resolve(p, "cjs/react-jsx-runtime.production.js")));

if (!reactDir) {
	throw new Error("Could not find react production build");
}

console.log(`Using react from: ${reactDir}`);

// Custom plugin to force production builds
const forceProductionPlugin = (): Plugin => ({
	name: "force-production-dependencies",
	enforce: "pre",
	resolveId(id) {
		// Force react-router production build
		if (id === "react-router" || id === "react-router/dom") {
			const file =
				id === "react-router"
					? "dist/production/index.mjs"
					: "dist/production/dom-export.mjs";
			return resolve(reactRouterDir, file);
		}
		// Force react-dom production build
		if (id === "react-dom/client") {
			return resolve(reactDomDir, "cjs/react-dom-client.production.js");
		}
		// Force react jsx-runtime production build
		if (id === "react/jsx-runtime") {
			return resolve(reactDir, "cjs/react-jsx-runtime.production.js");
		}
		if (id === "react/jsx-dev-runtime") {
			return resolve(reactDir, "cjs/react-jsx-runtime.production.js");
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
