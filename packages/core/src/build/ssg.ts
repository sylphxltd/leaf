import { readFile } from "node:fs/promises";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
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

	// Read and process the markdown file
	const markdownContent = await readFile(route.component, "utf-8");

	// Process markdown with unified (same pipeline as the Vite plugin)
	const processor = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeSlug)
		.use(rehypeHighlight)
		.use(rehypeStringify, { allowDangerousHtml: true });

	const vfile = await processor.process(markdownContent);
	const contentHtml = String(vfile);

	// Inject the rendered content into the template
	// Replace <div id="root"></div> with pre-rendered content
	const html = template.replace(
		'<div id="root"></div>',
		`<div id="root"><div class="markdown-content">${contentHtml}</div></div>`,
	);

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
