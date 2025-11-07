import { readFile } from "node:fs/promises";
import { relative, resolve } from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";
import type { PageData } from "../types.js";

export interface Route {
	path: string;
	component: string;
	data: PageData;
}

export async function generateRoutes(root: string): Promise<Route[]> {
	const docsDir = resolve(root, "docs");
	const files = await fg("**/*.{md,mdx}", {
		cwd: docsDir,
		ignore: ["node_modules", "**/node_modules"],
	});

	const routes: Route[] = [];

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

		const relativePath = relative(docsDir, fullPath);

		routes.push({
			path: urlPath,
			component: fullPath,
			data: {
				title: frontmatter.title,
				description: frontmatter.description,
				frontmatter,
				relativePath,
			},
		});
	}

	return routes;
}
