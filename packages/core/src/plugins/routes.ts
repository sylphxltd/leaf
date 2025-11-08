import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import type { Plugin } from "vite";
import fg from "fast-glob";
import matter from "gray-matter";

export interface RouteData {
	path: string;
	filePath: string;
	title?: string;
	description?: string;
	frontmatter: Record<string, unknown>;
}

export function routesPlugin(docsDir: string): Plugin {
	const VIRTUAL_MODULE_ID = "virtual:leaf/routes";
	const RESOLVED_VIRTUAL_MODULE_ID = `\0${VIRTUAL_MODULE_ID}`;

	// Track known markdown files for smart HMR
	let knownFiles = new Set<string>();

	async function generateRoutesModule(): Promise<string> {
		const files = await fg("**/*.{md,mdx}", {
			cwd: docsDir,
			ignore: ["node_modules", "**/node_modules"],
		});

		// Update known files for HMR detection
		knownFiles = new Set(files.map((f) => resolve(docsDir, f)));

		const routes: RouteData[] = [];

		for (const file of files) {
			const fullPath = resolve(docsDir, file);
			const content = await readFile(fullPath, "utf-8");
			const { data: frontmatter } = matter(content);

			// Convert file path to URL path
			let urlPath = `/${file.replace(/\.mdx?$/, "")}`;

			// Convert index.md to /
			if (urlPath.endsWith("/index")) {
				urlPath = urlPath.replace(/\/index$/, "") || "/";
			}

			routes.push({
				path: urlPath,
				filePath: fullPath,
				title: frontmatter.title as string | undefined,
				description: frontmatter.description as string | undefined,
				frontmatter,
			});
		}

		// Generate module code with dynamic imports
		// Import both default and named exports (toc, docFooter)
		const imports = routes
			.map(
				(route, index) =>
					`import Route${index}, { toc as toc${index}, docFooter as docFooter${index} } from "${route.filePath.replace(/\\/g, "/")}";`,
			)
			.join("\n");

		const routesList = routes
			.map(
				(route, index) => `  {
    path: "${route.path}",
    component: Route${index},
    toc: toc${index},
    docFooter: docFooter${index},
    data: ${JSON.stringify({
			title: route.title,
			description: route.description,
			frontmatter: route.frontmatter,
		})}
  }`,
			)
			.join(",\n");

		return `${imports}

export const routes = [
${routesList}
];
`;
	}

	return {
		name: "leaf:routes",
		resolveId(id) {
			if (id === VIRTUAL_MODULE_ID) {
				return RESOLVED_VIRTUAL_MODULE_ID;
			}
		},
		async load(id) {
			if (id === RESOLVED_VIRTUAL_MODULE_ID) {
				return await generateRoutesModule();
			}
		},
		async handleHotUpdate({ file, server }) {
			// Only handle markdown files in docs directory
			if (!file.startsWith(docsDir) || !/\.(md|mdx)$/.test(file)) {
				return;
			}

			// Check if this is a new or deleted file (route structure change)
			const wasKnown = knownFiles.has(file);
			const exists = existsSync(file);

			// New file added or existing file deleted → full reload
			if ((!wasKnown && exists) || (wasKnown && !exists)) {
				const module = server.moduleGraph.getModuleById(
					RESOLVED_VIRTUAL_MODULE_ID,
				);
				if (module) {
					server.moduleGraph.invalidateModule(module);
					server.ws.send({
						type: "full-reload",
					});
				}
				return;
			}

			// Content-only change → let Vite's default HMR handle it
			// The markdown module will be hot-updated automatically
			// No need for full reload or manual intervention
		},
	};
}
