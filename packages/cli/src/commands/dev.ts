import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { createLeafPlugin, loadConfig, routesPlugin } from "@sylphx/leaf";
import { createServer } from "vite";
import { readFile, writeFile } from "node:fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function dev(root: string = process.cwd()): Promise<void> {
	const config = await loadConfig(root);
	const docsDir = resolve(root, config.docsDir || "docs");

	// Paths to built-in templates
	const builtInHtmlPath = resolve(
		__dirname,
		"../../../core/templates/index.html"
	);
	const builtInClientPath = resolve(
		__dirname,
		"../../../core/templates/client.tsx"
	);

	// Copy client template to project root so Vite can process it
	const tempClientPath = resolve(root, ".leaf-client.tsx");
	const clientTemplate = await readFile(builtInClientPath, "utf-8");
	await writeFile(tempClientPath, clientTemplate, "utf-8");

	const server = await createServer({
		root,
		plugins: [
			routesPlugin(docsDir),
			...createLeafPlugin(config),
			{
				name: "leaf:dev-html",
				configureServer(server) {
					return () => {
						server.middlewares.use(async (req, res, next) => {
							// Serve built-in HTML template for all requests
							if (req.url === "/" || req.url === "/index.html") {
								try {
									const html = await readFile(builtInHtmlPath, "utf-8");
									const transformed = await server.transformIndexHtml(
										req.url,
										html
									);
									res.setHeader("Content-Type", "text/html");
									res.end(transformed);
									return;
								} catch (e) {
									// Fall through to default handling
								}
							}
							next();
						});
					};
				},
			},
		],
		server: {
			port: 5173,
			open: true,
		},
	});

	await server.listen();

	server.printUrls();
	server.bindCLIShortcuts({ print: true });
}
