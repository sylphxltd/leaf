import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { type Route, generateRoutes } from "../utils/routes.js";

export interface SSGOptions {
	root: string;
	outDir: string;
	template: string;
	clientBundle: string;
}

export async function generateStaticSite(options: SSGOptions): Promise<void> {
	const { root, outDir, template } = options;

	// Get all routes
	const routes = await generateRoutes(root);

	console.log(`Generating static HTML for ${routes.length} routes...`);

	// Generate HTML for each route
	for (const route of routes) {
		await generatePageHTML(route, outDir, template);
	}

	console.log(`✓ Generated ${routes.length} static pages`);
}

async function generatePageHTML(
	route: Route,
	outDir: string,
	template: string,
): Promise<void> {
	// Convert route path to file path
	const htmlPath = routeToHtmlPath(route.path, outDir);

	// For now, use the template as-is
	// In the future, we can add server-side rendering here
	const html = template;

	// Ensure directory exists
	await mkdir(dirname(htmlPath), { recursive: true });

	// Write HTML file
	await writeFile(htmlPath, html, "utf-8");

	console.log(`  Generated: ${htmlPath}`);
}

function routeToHtmlPath(routePath: string, outDir: string): string {
	if (routePath === "/") {
		return join(outDir, "index.html");
	}

	// Remove leading slash
	const cleanPath = routePath.replace(/^\//, "");

	// Create /path/index.html for clean URLs
	return join(outDir, cleanPath, "index.html");
}
