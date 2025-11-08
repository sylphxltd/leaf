import {
	createLeafPlugin,
	generateStaticSite,
	loadConfig,
	routesPlugin,
} from "@sylphx/leaf";
import { readFile, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { build as viteBuild } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function build(root: string = process.cwd()): Promise<void> {
	const config = await loadConfig(root);
	const docsDir = resolve(root, config.docsDir || "docs");
	const outDir = resolve(root, "dist");

	console.log("Building client bundle...");

	// Paths to built-in templates
	const builtInHtmlPath = resolve(
		__dirname,
		"../../../core/templates/index.html"
	);
	const builtInClientPath = resolve(
		__dirname,
		"../../../core/templates/client.tsx"
	);

	// Read built-in templates
	const builtInHtml = await readFile(builtInHtmlPath, "utf-8");
	const builtInClient = await readFile(builtInClientPath, "utf-8");

	// Write to temporary locations for Vite to process
	const tempHtmlPath = resolve(root, ".leaf-temp-index.html");
	const tempClientPath = resolve(root, ".leaf-client.tsx");
	await writeFile(tempHtmlPath, builtInHtml, "utf-8");
	await writeFile(tempClientPath, builtInClient, "utf-8");

	try {
		// Build the client-side bundle
		await viteBuild({
			root,
			plugins: [routesPlugin(docsDir), ...createLeafPlugin(config)],
			build: {
				outDir,
				emptyOutDir: true,
				rollupOptions: {
					input: {
						index: tempHtmlPath,
					},
					output: {
						entryFileNames: "assets/[name]-[hash].js",
						chunkFileNames: "assets/[name]-[hash].js",
						assetFileNames: "assets/[name]-[hash].[ext]",
					},
				},
			},
		});

		console.log("✓ Client bundle built");

		// Rename generated HTML from temp name to index.html
		const { rename: renameFile } = await import("node:fs/promises");
		const tempHtmlOutput = resolve(outDir, ".leaf-temp-index.html");
		const finalHtmlPath = resolve(outDir, "index.html");
		await renameFile(tempHtmlOutput, finalHtmlPath);

		// Read the generated HTML template
		const template = await readFile(finalHtmlPath, "utf-8");

		// Generate static HTML for all routes
		await generateStaticSite({
			root,
			outDir,
			template,
			clientBundle: "/assets/main.js",
		});

		console.log("\n✓ Build completed successfully!");
	} finally {
		// Clean up temporary files
		try {
			const { unlink } = await import("node:fs/promises");
			await unlink(tempHtmlPath);
			await unlink(tempClientPath);
		} catch {
			// Ignore errors
		}
	}
}
